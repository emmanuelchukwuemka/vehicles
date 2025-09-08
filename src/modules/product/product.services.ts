import {
  CreateVariationInput,
  ProductInput,
  //VariationInput,
} from "./validations/product.validations";
// import { Media } from "./models/media.models";
import { Variation, VariationAttribute, Media } from "./models/associations";

import { Transaction, Op } from "sequelize";
import { v4 as uuid } from "uuid";
import { AddAttributesInput, CreateProductInput } from "./product.types";
import sequelize from "../../config/database/sequelize";
import {
  Product,
  ProductMoq,
  ProductSample,
  ProductSpecification,
} from "./models";
//import { VariationAttribute } from "./models/variationAttribute.models";
//import { Variation } from "./models/variation.models";
import { generateVariationSKU } from "./utils/sku";
import { Store } from "../store/models/store.models";
import { Subcategory } from "../categories/subcategory/subcategory.models";
import { Collection } from "./collection/collection.models";
import { UpdateProductVariationInput } from "./validations/updateProductVariation.validation";

//import { AddAttributesInput } from "./validations/variation.validations";

export const createProduct = async (
  data: CreateProductInput
): Promise<{
  success: boolean;
  message: string;
  data?: { product_id: number; product_code: string };
  error?: any;
}> => {
  const {
    store_id,
    subcategory_id,
    collection_id,
    name,
    desc,
    customizable,
    price,
    discount,
    weight,
    stock,
    sample,
    moq,
    specifications,
  } = data;

  // Validate required fields at service level (extra safety)
  if (!store_id || !subcategory_id || !name || !desc || price === undefined) {
    throw new Error("Missing required product information");
  }

  let transaction: Transaction | null = null;

  try {
    transaction = await sequelize.transaction();

    // Check if store exists
    const store = await Store.findByPk(store_id);
    if (!store) {
      return { success: false, message: "Store not found" };
    }

    // Check if subcategory exists
    const subcategory = await Subcategory.findByPk(subcategory_id);
    if (!subcategory) {
      return { success: false, message: "Product category not found" };
    }

    // If collection is provided, check it belongs to this store
    if (collection_id) {
      const collection = await Collection.findOne({
        where: { id: collection_id, store_id },
      });
      if (!collection) {
        return {
          success: false,
          message:
            "Collection not found or does not belong to the specified store",
        };
      }
    }

    const product_code = uuid();

    // Create base product
    const product = await Product.create(
      {
        store_id,
        subcategory_id,
        collection_id,
        product_code,
        name: name.trim(),
        description: desc.trim(),
        customizable: customizable || 0,
        price,
        discount: discount || 0,
        weight,
        stock,
        status: 1,
      },
      { transaction }
    );

    // Insert Sample (if available)
    if (sample && sample.ppu != null && sample.min_qty != null) {
      await ProductSample.upsert(
        {
          store_id,
          product_id: product.id,
          ppu: sample.ppu,
          min_qty: sample.min_qty,
        },
        { transaction }
      );
    }

    // Insert MOQ (if available)
    if (Array.isArray(moq) && moq.length > 0) {
      for (const { min_qty, ppu } of moq) {
        await ProductMoq.create(
          {
            product_id: product.id,
            min_qty,
            ppu,
          },
          { transaction }
        );
      }
    }

    // Insert Specifications (if available)
    if (Array.isArray(specifications) && specifications.length > 0) {
      for (const { name: specName, value: specValue } of specifications) {
        await ProductSpecification.create(
          {
            product_id: product.id,
            name: specName,
            value: specValue,
          },
          { transaction }
        );
      }
    }

    await transaction.commit();

    return {
      message: "Product initializes successfully",
      success: true,
      data: { product_id: product.id, product_code },
    };
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error("❌ Error creating product:", error);
    return { success: false, message: "Error creating basic product", error };
  }
};

interface CreateVariationRequest {
  product_id: number;
  product_code: string;
  variation: {
    price: number;
    stock: number;
    weight: number;
    attributes: {
      [label: string]: {
        layout_id: number;
        title: string;
        description: string;
        items: {
          value: string;
          price: number;
          stock?: number | null;
          weight: number;
          images?: string[];
        }[];
      };
    };
    media?: { url: string; type: string }[];
  };
}

export const createProductVariation = async (req: CreateVariationRequest) => {
  const { product_id, product_code, variation } = req;

  // Basic validation
  if (!product_id || !product_code || !variation) {
    return { success: false, message: "Product ID and code are required" };
  }

  let transaction: Transaction | undefined;

  try {
    transaction = await sequelize.transaction();

    // Ensure product exists
    const product = await Product.findOne({
      where: { id: product_id, product_code },
      transaction,
    });

    if (!product) {
      return { success: false, message: "Product not found" };
    }

    // Generate unique SKU for variation
    const variationSku = generateVariationSKU(product, variation);

    // Create variation row
    const newVariation = await Variation.create(
      {
        product_id,
        sku: variationSku,
        price: variation.price,
        stock: variation.stock,
        weight: variation.weight,
      },
      { transaction }
    );

    if (!newVariation) {
      await transaction.rollback();
      return { success: false, message: "Variation insertion failed" };
    }

    // Insert variation attributes (object format)
    if (variation.attributes && Object.keys(variation.attributes).length > 0) {
      for (const [label, attrDef] of Object.entries(variation.attributes)) {
        const { layout_id, title, description, items } = attrDef;

        for (const item of items) {
          const { value, price, stock, weight, images } = item;

          // Create attribute row
          const attributeRow = await VariationAttribute.create(
            {
              variation_id: newVariation.id,
              layout_id,
              label, // e.g. "color"
              value, // e.g. "Green"
              price,
              stock,
              weight,
              title, // new
              description, // new
            },
            { transaction }
          );

          // If attribute has multiple images, insert into media_table
          if (images && images.length > 0) {
            for (const img of images) {
              await Media.create(
                {
                  product_id,
                  variation_id: newVariation.id,
                  attribute_id: attributeRow.id,
                  url: img,
                  type: "image",
                },
                { transaction }
              );
            }
          }
        }
      }
    }

    // Insert gallery media (variation-level)
    if (variation.media && variation.media.length > 0) {
      for (const { url, type } of variation.media) {
        await Media.create(
          {
            product_id,
            variation_id: newVariation.id,
            url,
            type,
          },
          { transaction }
        );
      }
    }

    // Commit transaction
    await transaction.commit();

    return {
      success: true,
      message: "Variation created successfully",
      data: { sku: variationSku, variation_id: newVariation.id },
    };
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error("Error creating product variation:", error);

    return { success: false, message: "Failed to create variation", error };
  }
};

export const addAttributesToVariation = async (input: AddAttributesInput) => {
  const { product_id, variation_id, sku, attributes } = input;
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const variation = await Variation.findOne({
      where: { id: variation_id, product_id, sku },
      transaction,
    });

    if (!variation) {
      return { success: false, message: "Variation not found" };
    }

    for (const [label, attr] of Object.entries(attributes) as [
      string,
      AddAttributesInput["attributes"][string],
    ][]) {
      const { layout_id, title, description, items } = attr;

      for (const item of items) {
        const attributeRow = await VariationAttribute.create(
          {
            variation_id,
            layout_id,
            title,
            description,
            label: label as string,
            value: item.value,
            price: item.price,
            stock: item.stock ?? null,
            weight: item.weight,
          },
          { transaction }
        );

        if (item.images?.length) {
          for (const url of item.images) {
            await Media.create(
              {
                product_id: variation.product_id,
                variation_id,
                attribute_id: attributeRow.id,
                url,
                type: "image",
              },
              { transaction }
            );
          }
        }
      }
    }

    await transaction.commit();
    return { success: true, message: "Attributes added successfully" };
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error(error);
    return { success: false, message: "Failed to add attributes", error };
  }
};

/** Helper: typed entries (keeps TS happy) */
function typedEntries<T extends object>(obj: T) {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}

export const updateProductAndVariation = async (
  input: UpdateProductVariationInput
): Promise<{ success: boolean; message: string; data?: any; error?: any }> => {
  const {
    product_id,
    variation_id,
    sku,
    product: productPayload,
    variation: variationPayload,
    attributes,
    media,
    replaceAttributes = false,
    replaceMedia = false,
  } = input;

  let transaction: Transaction | null = null;

  try {
    transaction = await sequelize.transaction();

    // 1) Confirm product exists
    const product = await Product.findByPk(product_id, { transaction });
    if (!product) {
      await transaction.rollback();
      return { success: false, message: "Product not found" };
    }

    // 2) Confirm variation exists AND belongs to product AND sku matches
    const existingVariation = await Variation.findOne({
      where: { id: variation_id, product_id, sku },
      transaction,
    });
    if (!existingVariation) {
      await transaction.rollback();
      return {
        success: false,
        message: "Variation not found for the given product and sku",
      };
    }

    // 3) Optional: update product fields (if any)
    if (productPayload && Object.keys(productPayload).length > 0) {
      // example: if collection_id provided, ensure collection belongs to same store as product.store_id
      if (productPayload.collection_id) {
        const collection = await Collection.findOne({
          where: {
            id: productPayload.collection_id,
            store_id: product.store_id,
          },
          transaction,
        });
        if (!collection) {
          await transaction.rollback();
          return {
            success: false,
            message:
              "Collection not found or does not belong to the product's store",
          };
        }
      }

      // allow partial updates
      await product.update(productPayload, { transaction });
    }

    // 4) Update variation base fields if provided
    if (variationPayload && Object.keys(variationPayload).length > 0) {
      await existingVariation.update(variationPayload, { transaction });
    }

    // 5) Attributes handling
    if (attributes) {
      if (replaceAttributes) {
        // delete existing attribute rows & attribute-linked media for this variation
        // delete attribute media first to avoid FK issues
        await Media.destroy({
          where: { variation_id, attribute_id: { [Op.ne]: null } },
          transaction,
        });
        await VariationAttribute.destroy({
          where: { variation_id },
          transaction,
        });
      }

      // merge / upsert attributes
      for (const [labelKey, attrDef] of typedEntries(attributes)) {
        const label = String(labelKey);
        const { layout_id, title, description, items } = attrDef as any;

        for (const item of items) {
          const { value, price = 0, stock = null, weight = 0, images } = item;

          // try to find existing attribute row by variation_id + label + value
          const existingAttr = await VariationAttribute.findOne({
            where: { variation_id, label, value },
            transaction,
          });

          let attributeRow;
          if (existingAttr) {
            // update existing
            attributeRow = await existingAttr.update(
              {
                layout_id,
                title,
                description,
                price,
                stock,
                weight,
              },
              { transaction }
            );
          } else {
            // create new attribute row
            attributeRow = await VariationAttribute.create(
              {
                variation_id,
                layout_id,
                title,
                description,
                label,
                value,
                price,
                stock,
                weight,
              },
              { transaction }
            );
          }

          // images: if replaceAttributes we already deleted attribute media earlier,
          // so this just inserts; otherwise we insert new ones if missing
          if (images && images.length > 0) {
            for (const url of images) {
              // check existence
              const existingMedia = await Media.findOne({
                where: {
                  variation_id,
                  attribute_id: attributeRow.id,
                  url,
                },
                transaction,
              });

              if (!existingMedia) {
                await Media.create(
                  {
                    product_id,
                    variation_id,
                    attribute_id: attributeRow.id,
                    url,
                    type: "image",
                  },
                  { transaction }
                );
              }
            }
          }
        }
      }
    }

    // 6) Gallery media handling (variation-level)
    if (media) {
      if (replaceMedia) {
        // delete existing gallery media for this variation
        await Media.destroy({
          where: { variation_id, attribute_id: null },
          transaction,
        });
      }

      for (const m of media) {
        const { url, type } = m;
        const exists = await Media.findOne({
          where: { variation_id, attribute_id: null, url },
          transaction,
        });
        if (!exists) {
          await Media.create(
            { product_id, variation_id, url, type },
            { transaction }
          );
        }
      }
    }

    // 7) commit
    await transaction.commit();

    // optionally fetch the updated variation to return
    const updatedVariation = await Variation.findByPk(variation_id, {
      include: [
        {
          model: VariationAttribute,
          as: "attributes",
        },
        {
          model: Media,
          as: "media",
        },
      ],
    });

    return {
      success: true,
      message: "Product and variation updated successfully",
      data: {
        product: product.toJSON(),
        variation: updatedVariation?.toJSON(),
      },
    };
  } catch (err) {
    if (transaction && !(transaction as any).finished) {
      await transaction.rollback();
    }

    return {
      success: false,
      message: "Failed to update product & variation",
      error: err,
    };
  }
};
