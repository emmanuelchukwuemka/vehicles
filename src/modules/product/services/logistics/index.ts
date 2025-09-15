import sequelize from "../../../../config/database/sequelize";
import { Subcategory } from "../../../categories/subcategory/subcategory.models";
import { Subdomain } from "../../../domains/model/subdomain.models";
import { Store } from "../../../store/models/store.models";
import { Collection } from "../../collection/collection.models";
import { v4 as uuid } from "uuid";
import { Product, ProductMedia, ProductUnit } from "../../models/associations";
import { LogisticsProductInput } from "../../validations/logistics";
import Category from "../../../categories/category/category.models";
import MainCategory from "../../../categories/maincategory/maincategory.models";

export class LogisticsService {
  static async createProduct(input: LogisticsProductInput) {
    const { identifiers, basic_info, pricing, metadata, units, medias } = input;
    let transaction;

    try {
      transaction = await sequelize.transaction();

      // Validate store
      const store = await Store.findByPk(identifiers.store_id, { transaction });
      if (!store || (store.status ?? 0) < 1) {
        return { success: false, message: "Store not found or offline" };
      }

      // Validate subdomain (must be logistics)
      const subdomain = await Subdomain.findByPk(store.subdomain_id, {
        transaction,
      });
      if (!subdomain || subdomain.name !== "logistic") {
        return { success: false, message: "Logistics subdomain not found" };
      }

      // Validate subcategory
      if (identifiers.serviceType_id) {
        const subcategory = await Subcategory.findByPk(
          identifiers.serviceType_id,
          { transaction }
        );
        if (!subcategory) {
          return { success: false, message: "Service type not found" };
        }

        const category = await Category.findByPk(subcategory.category_id, {
          transaction,
        });

        if (!category) {
          return { success: false, message: "Service category not found" };
        }

        const maincategory = await MainCategory.findByPk(
          category.maincategory_id,
          {
            transaction,
          }
        );

        if (!maincategory || maincategory.name !== "_logistic") {
          return { success: false, message: "Service category mismatched" };
        }
      }

      //  Validate collection
      if (identifiers.collection_id) {
        const collection = await Collection.findOne({
          where: {
            id: identifiers.collection_id,
            store_id: identifiers.store_id,
          },
          transaction,
        });
        if (!collection) {
          return { success: false, message: "Collection not found or invalid" };
        }
      }

      // Create base product
      const product_code = uuid();
      const newProduct = await Product.create(
        {
          store_id: identifiers.store_id,
          subdomain_id: store.subdomain_id,
          subcategory_id: identifiers.serviceType_id ?? null,
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

      // Product-level medias
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

      // Units + Items
      if (Array.isArray(units) && units.length > 0) {
        for (const u of units) {
          if (!Array.isArray(u.items) || u.items.length === 0) continue;

          for (const item of u.items) {
            // Create ProductUnit per item for flexibility
            const createdUnit = await ProductUnit.create(
              {
                product_id: newProduct.id,
                name: u.name, // e.g. "Europe Zone"
                value: item.unit_value, // searchable
                price: item.price ?? 0,
                stock: 1,
                metadata: {
                  ...(item.metadata ?? {}),
                  unit_value: item.unit_value,
                },
              },
              { transaction }
            );

            // Unit-level medias
            if (Array.isArray(item.medias) && item.medias.length > 0) {
              const unitMediaPayloads = item.medias.map((m) => ({
                product_id: newProduct.id,
                unit_id: createdUnit.id,
                metadata: m.metadata ?? {},
                url: m.url,
                type: m.type,
                description: m.description ?? null,
                status: 1,
              }));
              await ProductMedia.bulkCreate(unitMediaPayloads, { transaction });
            }
          }
        }
      }

      // Commit transaction
      await transaction.commit();
      return {
        success: true,
        message: "Logistics service created successfully",
        data: newProduct.product_code,
      };
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error("Error creating logistics product:", error);
      return {
        success: false,
        message: "Failed to create logistics product",
        error,
      };
    }
  }

  static async fetchProducts(
    subdomainName: string,
    options?: {
      includeUnits?: boolean;
      includeMedia?: boolean;
      includeMetadata?: boolean; // product metadata
      includeSpecifications?: boolean; // product metadata.specifications
      includeProductMediaMetadata?: boolean; // productMedia metadata
      includeUnitMediaMetadata?: boolean; // unitMedia metadata
    }
  ) {
    const {
      includeUnits = true,
      includeMedia = true,
      includeMetadata = true,
      includeSpecifications = true,
      includeProductMediaMetadata = true,
      includeUnitMediaMetadata = true,
    } = options || {};

    try {
      // 🔹 Step 1: Find subdomain
      const subdomain = await Subdomain.findOne({
        where: { name: subdomainName },
      });

      if (!subdomain) {
        return { success: false, message: "Subdomain not found", data: [] };
      }

      // 🔹 Step 2: Fetch products
      let products = await Product.findAll({
        where: { subdomain_id: subdomain.id },
        include: [
          // 🔹 Include product units if requested
          ...(includeUnits
            ? [
                {
                  model: ProductUnit,
                  as: "units",
                  include: includeMedia
                    ? [
                        {
                          model: ProductMedia,
                          as: "unitMedia",
                        },
                      ]
                    : [],
                },
              ]
            : []),

          // 🔹 Include product-level media if requested
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

      // 🔹 Step 3: Strip metadata/specifications if not requested
      products = products.map((p: any) => {
        const plain = p.get({ plain: true });

        // --- Handle product metadata
        if (!includeMetadata) {
          delete plain.metadata;
        } else if (!includeSpecifications && plain.metadata?.specifications) {
          delete plain.metadata.specifications;
        }

        // --- Handle productMedia metadata
        if (plain.productMedia && Array.isArray(plain.productMedia)) {
          plain.productMedia = plain.productMedia.map((m: any) => {
            if (!includeProductMediaMetadata) {
              const { metadata, ...rest } = m;
              return rest;
            }
            return m;
          });
        }

        // --- Handle unitMedia metadata
        if (includeUnits && plain.units) {
          plain.units = plain.units.map((u: any) => {
            if (u.unitMedia && Array.isArray(u.unitMedia)) {
              u.unitMedia = u.unitMedia.map((m: any) => {
                if (!includeUnitMediaMetadata) {
                  const { metadata, ...rest } = m;
                  return rest;
                }
                return m;
              });
            }
            return u;
          });
        }

        return plain;
      });

      if (!products || products.length === 0) {
        return { success: false, message: "No products found", data: [] };
      }

      return {
        success: true,
        message: "Products fetched successfully",
        data: products,
      };
    } catch (error) {
      console.error("Error fetching products by domain name:", error);
      return { success: false, message: "Failed to fetch products", error };
    }
  }
}
