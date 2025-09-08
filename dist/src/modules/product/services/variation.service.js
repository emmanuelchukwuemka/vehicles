"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVariation = void 0;
const variation_models_1 = require("../models/variation.models");
const sequelize_1 = __importDefault(require("../../../config/database/sequelize"));
const sku_1 = require("../utils/sku");
const store_models_1 = require("../../store/models/store.models");
const baseProduct_models_1 = require("../models/baseProduct.models");
const media_models_1 = require("../models/media.models");
const createVariation = async (data) => {
    const transaction = await sequelize_1.default.transaction();
    try {
        // -> Step 1: Check product exists
        const product = await baseProduct_models_1.Product.findOne({
            where: {
                id: data.identifiers.product_id,
                product_code: data.identifiers.product_code,
            },
        });
        if (!product) {
            return { success: false, message: "Product not found" };
        }
        const store = await store_models_1.Store.findByPk(product.store_id);
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
            const sku = (0, sku_1.generateVariationSKU)(product, variation.attributes);
            return {
                product_id: data.identifiers.product_id,
                sku,
                price: variation.price,
                stock: variation.stock,
                metadata: variation.attributes,
            };
        });
        //-> Step 4: Bulk insert variations
        const newVariations = await variation_models_1.Variation.bulkCreate(variationPayloads, {
            transaction,
            returning: true,
        });
        //-> Step 5: Insert medias for each variation
        const mediaPayloads = [];
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
            await media_models_1.Media.bulkCreate(mediaPayloads, { transaction });
        }
        await transaction.commit();
        return { success: true, data: newVariations };
    }
    catch (error) {
        await transaction.rollback();
        return { success: false, message: "Unexpected error", details: error };
    }
};
exports.createVariation = createVariation;
