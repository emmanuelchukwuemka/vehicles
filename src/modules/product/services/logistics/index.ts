import sequelize from "../../../../config/database/sequelize";
import { Subcategory } from "../../../categories/subcategory/subcategory.models";
import { Subdomain } from "../../../domains/model/subdomain.models";
import { Store } from "../../../store/models/store.models";
import { Collection } from "../../collection/collection.models";
import { v4 as uuid } from "uuid";
import { Product, ProductMedia, ProductUnit } from "../../models/associations";
import { LogisticsProductInput } from "../../validations/logistics";

export class LogisticsService {
  static async createProduct(input: LogisticsProductInput) {
    const { identifiers, basic_info, pricing, metadata, units, medias } = input;
    let transaction;

    try {
      transaction = await sequelize.transaction();

      // 1️⃣ Validate store
      const store = await Store.findByPk(identifiers.store_id, { transaction });
      if (!store || (store.status ?? 0) < 1) {
        return { success: false, message: "Store not found or offline" };
      }

      // 2️⃣ Validate subdomain (must be logistics)
      const subdomain = await Subdomain.findByPk(store.subdomain_id, {
        transaction,
      });
      if (!subdomain || subdomain.name !== "logistic") {
        return { success: false, message: "Logistics subdomain not found" };
      }

      // 3️⃣ Validate subcategory
      if (identifiers.serviceType_id) {
        const subcategory = await Subcategory.findByPk(
          identifiers.serviceType_id,
          { transaction }
        );
        if (!subcategory) {
          return { success: false, message: "Logistics category not found" };
        }
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
        if (!collection) {
          return { success: false, message: "Collection not found or invalid" };
        }
      }

      // 5️⃣ Create base product
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

      // 7️⃣ Units + Items
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
                stock: item.stock ?? 1,
                metadata: {
                  ...(item.metadata ?? {}),
                  unit_value: item.unit_value,
                },
                status: 1,
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

      // 8️⃣ Commit transaction
      await transaction.commit();
      return {
        success: true,
        message: "Logistics product created successfully",
        data: newProduct,
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
}
