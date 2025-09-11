import { RealEstateProductInput } from "../../validations/realestate";
import { Product, ProductMedia, ProductUnit } from "../../models/associations";
import { Subdomain } from "../../../domains/model/subdomain.models";
import sequelize from "../../../../config/database/sequelize";
import { v4 as uuid } from "uuid";
import { Store } from "../../../store/models/store.models";
import { Subcategory } from "../../../categories/subcategory/subcategory.models";
import { Collection } from "../../collection/collection.models";

export class RealEstateService {
  static async createProduct(input: RealEstateProductInput) {
    const { identifiers, basic_info, pricing, metadata, units, medias } = input;
    let transaction;

    try {
      transaction = await sequelize.transaction();

      // 1️⃣ Validate store
      const store = await Store.findByPk(identifiers.store_id, { transaction });
      if (!store || (store.status ?? 0) < 1)
        return { success: false, message: "Store not found or offline" };

      // 2️⃣ Validate subdomain
      const subdomain = await Subdomain.findByPk(store.subdomain_id, {
        transaction,
      });
      if (!subdomain || subdomain.name !== "realestate")
        return { success: false, message: "Real estate subdomain not found" };

      // 3️⃣ Validate subcategory
      if (identifiers.subcategory_id) {
        const subcategory = await Subcategory.findByPk(
          identifiers.subcategory_id,
          { transaction }
        );
        if (!subcategory)
          return { success: false, message: "Property category not found" };
      }

      // 4️⃣ Validate collection
      if (identifiers.collection_id) {
        const collection = await Collection.findOne({
          where: {
            id: identifiers.collection_id,
            store_id: identifiers.store_id,
          },
          transaction,
        });
        if (!collection)
          return { success: false, message: "Collection not found or invalid" };
      }

      // 5️⃣ Create base product
      const product_code = uuid();
      const newProduct = await Product.create(
        {
          store_id: identifiers.store_id,
          subdomain_id: store.subdomain_id,
          subcategory_id: identifiers.subcategory_id ?? null,
          collection_id: identifiers.collection_id ?? null,
          product_code,
          name: basic_info.name,
          description: basic_info.description,
          base_price: pricing.base_price,
          currency_id: identifiers.currency_id ?? 238,
          metadata: metadata ?? {},
        },
        { transaction }
      );

      // 6️⃣ Product-level medias
      if (Array.isArray(medias) && medias.length > 0) {
        const mediaPayloads = medias.map((m) => ({
          product_id: newProduct.id,
          unit_id: null,
          metadata: m.metadata ?? {},
          url: m.url,
          type: m.type,
          description: m.description ?? null,
          status: 1,
        }));
        await ProductMedia.bulkCreate(mediaPayloads, { transaction });
      }

      // 7️⃣ Units (each item creates its own product_unit row)
      if (Array.isArray(units) && units.length > 0) {
        for (const u of units) {
          if (Array.isArray(u.items) && u.items.length > 0) {
            for (const item of u.items) {
              const unitMetadata = { ...item };
              delete unitMetadata.medias; // medias handled separately

              // create unit directly from each item
              const createdUnit = await ProductUnit.create(
                {
                  product_id: newProduct.id,
                  name: u.name, // e.g. "Bedroom"
                  value: item.unit_value, // e.g. "masters"
                  price: u.price ?? 0,
                  stock: u.stock ?? 1,
                  metadata: unitMetadata,
                  status: 1,
                },
                { transaction }
              );

              // medias for this item/unit
              if (Array.isArray(item.medias) && item.medias.length > 0) {
                const itemMediaPayloads = item.medias.map((m) => ({
                  product_id: newProduct.id,
                  unit_id: createdUnit.id,
                  metadata: m.metadata ?? {},
                  url: m.url,
                  type: m.type,
                  description: m.description ?? null,
                  status: 1,
                }));
                await ProductMedia.bulkCreate(itemMediaPayloads, {
                  transaction,
                });
              }
            }
          }
        }
      }

      await transaction.commit();
      return {
        success: true,
        message: "Real estate product created successfully",
        data: newProduct.product_code,
      };
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error("Error creating real estate product:", error);
      return {
        success: false,
        message: "Failed to create real estate product",
        error,
      };
    }
  }

  static async fetchProducts(options?: {
    includeUnits?: boolean;
    includeMedia?: boolean;
    includeMetadata?: boolean;
  }) {
    const {
      includeUnits = true,
      includeMedia = true,
      includeMetadata = true,
    } = options || {};

    try {
      const subdomain = await Subdomain.findOne({
        where: { name: "realestate" },
      });
      if (!subdomain) {
        return { success: false, message: "Subdomain not found", data: [] };
      }

      let products = await Product.findAll({
        where: { subdomain_id: subdomain.id },
        include: [
          ...(includeUnits
            ? [
                {
                  model: ProductUnit,
                  as: "units",
                  include: includeMedia
                    ? [{ model: ProductMedia, as: "unitMedia" }]
                    : [],
                },
              ]
            : []),
          ...(includeMedia
            ? [
                {
                  model: ProductMedia,
                  as: "productMedia",
                  where: { unit_id: null },
                  required: false,
                },
              ]
            : []),
        ],
      });

      // remove metadata if not requested
      products = products.map((p: any) => {
        const plain = p.get({ plain: true });
        if (!includeMetadata) delete plain.metadata;
        return plain;
      });

      return { success: true, message: "Products fetched", data: products };
    } catch (error) {
      console.error("Error fetching real estate products:", error);
      return { success: false, message: "Failed to fetch products", error };
    }
  }
}
