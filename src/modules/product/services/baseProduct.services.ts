import sequelize from "../../../config/database/sequelize";
import { Product } from "../models/associations";
import { Store } from "../../store/models/store.models";
import { Subcategory } from "../../categories/subcategory/subcategory.models";
import { Collection } from "../collection/collection.models";
import { BaseProductInput } from "../validations/baseProduct.validations";
import { v4 as uuid } from "uuid";
import { Submodule } from "../../module/model/Submodule.models";
import { Media } from "../models/associations";
import { generateVariationSKU } from "../utils/sku";
import { Variation } from "../models/associations";

export class ProductService {
  static async createBaseProduct(input: BaseProductInput) {
    const { identifiers, basic_info, pricing, metadata, variations } = input;
    let transaction;

    try {
      transaction = await sequelize.transaction();

      //Check store
      const store = await Store.findByPk(identifiers.store_id, { transaction });
      if (!store || (store.status ?? 0) < 1) {
        return {
          success: false,
          message: "Store not found or currently offline",
        };
      }

      // Check store domain
      const subdomain = await Submodule.findByPk(store.subdomain_id, {
        transaction,
      });
      if (!subdomain) {
        return { success: false, message: "Store domain not found" };
      }

      console.log("subdomain==>", subdomain);

      // Check subcategory
      if (identifiers.subcategory_id) {
        const subcategory = await Subcategory.findByPk(
          identifiers.subcategory_id,
          { transaction }
        );
        if (!subcategory) {
          return { success: false, message: "Product category not found" };
        }
      }

      // Check collection
      if (identifiers.collection_id) {
        const collection = await Collection.findOne({
          where: {
            id: identifiers.collection_id,
            store_id: identifiers.store_id,
          },
          transaction,
        });
        if (!collection) {
          return {
            success: false,
            message: "Collection not found or does not belong to the store",
          };
        }
      }

      //Create base product
      const product_code = uuid();
      const newProduct = await Product.create(
        {
          store_id: identifiers.store_id,
          subcategory_id: identifiers.subcategory_id ?? null,
          collection_id: identifiers.collection_id ?? null,
          subdomain_id: store.subdomain_id,
          product_code,
          name: basic_info.name,
          description: basic_info.description,
          base_price: pricing.base_price,
          currency_id: identifiers.currency_id,
          metadata: metadata ?? {},
        },
        { transaction }
      );

      //Insert product-level medias
      const productMedias = metadata?.medias;
      if (Array.isArray(productMedias) && productMedias.length > 0) {
        const mediaPayloads = productMedias.map((media) => ({
          product_id: newProduct.id,
          variation_id: null,
          metadata: media.metadata ?? {},
          url: media.url,
          type: media.type,
          description: media.description ?? null,
          status: 1,
        }));
        await Media.bulkCreate(mediaPayloads, { transaction });
      }

      // Insert variations if provided
      if (Array.isArray(variations) && variations.length > 0) {
        const variationPayloads = variations.map((v) => ({
          product_id: newProduct.id,
          sku: generateVariationSKU(newProduct, v.attributes),
          price: v.price,
          stock: v.stock,
          metadata: v.attributes,
          status: 1,
        }));

        const createdVariations = await Variation.bulkCreate(
          variationPayloads,
          {
            transaction,
          }
        );

        // Insert medias for each variation
        for (const [index, v] of variations.entries()) {
          if (Array.isArray(v.medias) && v.medias.length > 0) {
            const variationMediaPayloads = v.medias.map((m) => ({
              product_id: newProduct.id,
              variation_id: createdVariations[index].id,
              metadata: m.metadata ?? {},
              url: m.url,
              type: m.type,
              description: m.description ?? null,
              status: 1,
            }));
            await Media.bulkCreate(variationMediaPayloads, { transaction });
          }
        }
      }

      await transaction.commit();
      return {
        success: true,
        message: "Product created successfully",
        data: newProduct,
      };
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error("Error creating base product:", error);
      return { success: false, message: "Failed to create product", error };
    }
  }

  static async fetchProductsByDomainName(
    subdomainName: string,
    options?: { includeVariations?: boolean; includeMedia?: boolean }
  ) {
    const { includeVariations = true, includeMedia = true } = options || {};

    console.log("req=>", subdomainName);

    try {
      // Step 1: Find subdomain
      const subdomain = await Submodule.findOne({
        where: { name: subdomainName },
      });

      if (!subdomain) {
        return { success: false, message: "Subdomain not found", data: [] };
      }

      // Step 2: Fetch products
      const products = await Product.findAll({
        where: { subdomain_id: subdomain.id },
        include: [
          ...(includeVariations
            ? [
                {
                  model: Variation,
                  as: "variations",
                  include: includeMedia
                    ? [
                        {
                          model: Media,
                          as: "variationMedia",
                        },
                      ]
                    : [],
                },
              ]
            : []),
          ...(includeMedia
            ? [
                {
                  model: Media,
                  as: "productMedia",
                },
              ]
            : []),
        ],
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

  static async fetchProductById(
    product_id: number,
    options?: { includeVariations?: boolean; includeMedia?: boolean }
  ) {
    const { includeVariations = true, includeMedia = true } = options || {};

    try {
      const product = await Product.findByPk(product_id, {
        include: [
          // Include variations
          ...(includeVariations
            ? [
                {
                  model: Variation,
                  as: "variations",
                  include: includeMedia
                    ? [
                        {
                          model: Media,
                          as: "variationMedia",
                        },
                      ]
                    : [],
                },
              ]
            : []),

          // Include product-level media
          ...(includeMedia
            ? [
                {
                  model: Media,
                  as: "productMedia",
                },
              ]
            : []),
        ],
      });

      if (!product) {
        return {
          success: false,
          message: "Product not found",
          statusCode: 404,
        };
      }

      return { success: true, message: "", data: product };
    } catch (error) {
      console.error("Error fetching product:", error);
      return { success: false, message: "Failed to fetch product", error };
    }
  }
}
