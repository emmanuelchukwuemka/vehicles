import { Variation } from "../models/variation.models";
import sequelize from "../../../config/database/sequelize";
import { generateVariationSKU } from "../utils/sku";
import { Store } from "../../store/models/store.models";
import { Product } from "../models/baseProduct.models";
import { CreateVariationInput } from "../validations/variation.validations";
import { Media } from "../models/media.models";

export const createVariation = async (data: CreateVariationInput) => {
  const transaction = await sequelize.transaction();
  try {
    // -> Step 1: Check product exists
    const product = await Product.findOne({
      where: {
        id: data.identifiers.product_id,
        product_code: data.identifiers.product_code,
      },
    });
    if (!product) {
      return { success: false, message: "Product not found" };
    }

    const store = await Store.findByPk(product.store_id);
    if (!store) {
      return { success: false, message: "Store not found" };
    }

    // -> Check if store is active
    if (store.status < 1) {
      return { success: false, message: "Store is currently offline" };
    }

    //->> Step 2: Check product belongs to the store
    if (store.id !== data.identifiers.store_id) {
      return {
        success: false,
        message: "Product does not belong to this store",
      };
    }

    //-> Step 3: Loop through variations
    const variationPayloads = data.metadata.variations.map((variation) => {
      const sku = generateVariationSKU(product, variation.attributes);

      return {
        product_id: data.identifiers.product_id,
        sku,
        price: variation.price,
        stock: variation.stock,
        metadata: variation.attributes,
      };
    });

    //-> Step 4: Bulk insert variations
    const newVariations = await Variation.bulkCreate(variationPayloads, {
      transaction,
      returning: true,
    });

    //-> Step 5: Insert medias for each variation
    const mediaPayloads: any[] = [];
    newVariations.forEach((createdVariation, index) => {
      const originalVariation = data.metadata.variations[index];
      if (originalVariation.medias && originalVariation.medias.length > 0) {
        originalVariation.medias.forEach((media) => {
          mediaPayloads.push({
            product_id: data.identifiers.product_id,
            variation_id: createdVariation.id,
            url: media.url,
            type: media.type,
            metadata: media.metadata || null,
          });
        });
      }
    });

    if (mediaPayloads.length > 0) {
      await Media.bulkCreate(mediaPayloads, { transaction });
    }

    await transaction.commit();
    return { success: true, data: newVariations };
  } catch (error) {
    await transaction.rollback();
    return { success: false, message: "Unexpected error", details: error };
  }
};
