"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const sequelize_1 = __importDefault(require("../../../config/database/sequelize"));
const associations_1 = require("../models/associations");
const store_models_1 = require("../../store/models/store.models");
const subcategory_models_1 = require("../../categories/subcategory/subcategory.models");
const collection_models_1 = require("../collection/collection.models");
const uuid_1 = require("uuid");
const Submodule_models_1 = require("../../module/model/Submodule.models");
const associations_2 = require("../models/associations");
const sku_1 = require("../utils/sku");
const associations_3 = require("../models/associations");
class ProductService {
    static async createBaseProduct(input) {
        const { identifiers, basic_info, pricing, metadata, variations } = input;
        let transaction;
        try {
            transaction = await sequelize_1.default.transaction();
            //Check store
            const store = await store_models_1.Store.findByPk(identifiers.store_id, { transaction });
            if (!store || (store.status ?? 0) < 1) {
                return {
                    success: false,
                    message: "Store not found or currently offline",
                };
            }
            // Check store domain
            const subdomain = await Submodule_models_1.Submodule.findByPk(store.subdomain_id, {
                transaction,
            });
            if (!subdomain) {
                return { success: false, message: "Store domain not found" };
            }
            console.log("subdomain==>", subdomain);
            // Check subcategory
            if (identifiers.subcategory_id) {
                const subcategory = await subcategory_models_1.Subcategory.findByPk(identifiers.subcategory_id, { transaction });
                if (!subcategory) {
                    return { success: false, message: "Product category not found" };
                }
            }
            // Check collection
            if (identifiers.collection_id) {
                const collection = await collection_models_1.Collection.findOne({
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
            const product_code = (0, uuid_1.v4)();
            const newProduct = await associations_1.Product.create({
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
            }, { transaction });
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
                await associations_2.Media.bulkCreate(mediaPayloads, { transaction });
            }
            // Insert variations if provided
            if (Array.isArray(variations) && variations.length > 0) {
                const variationPayloads = variations.map((v) => ({
                    product_id: newProduct.id,
                    sku: (0, sku_1.generateVariationSKU)(newProduct, v.attributes),
                    price: v.price,
                    stock: v.stock,
                    metadata: v.attributes,
                    status: 1,
                }));
                const createdVariations = await associations_3.Variation.bulkCreate(variationPayloads, {
                    transaction,
                });
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
                        await associations_2.Media.bulkCreate(variationMediaPayloads, { transaction });
                    }
                }
            }
            await transaction.commit();
            return {
                success: true,
                message: "Product created successfully",
                data: newProduct,
            };
        }
        catch (error) {
            if (transaction)
                await transaction.rollback();
            console.error("Error creating base product:", error);
            return { success: false, message: "Failed to create product", error };
        }
    }
    static async fetchProductsByDomainName(subdomainName, options) {
        const { includeVariations = true, includeMedia = true } = options || {};
        console.log("req=>", subdomainName);
        try {
            // Step 1: Find subdomain
            const subdomain = await Submodule_models_1.Submodule.findOne({
                where: { name: subdomainName },
            });
            if (!subdomain) {
                return { success: false, message: "Subdomain not found", data: [] };
            }
            // Step 2: Fetch products
            const products = await associations_1.Product.findAll({
                where: { subdomain_id: subdomain.id },
                include: [
                    ...(includeVariations
                        ? [
                            {
                                model: associations_3.Variation,
                                as: "variations",
                                include: includeMedia
                                    ? [
                                        {
                                            model: associations_2.Media,
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
                                model: associations_2.Media,
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
        }
        catch (error) {
            console.error("Error fetching products by domain name:", error);
            return { success: false, message: "Failed to fetch products", error };
        }
    }
    static async fetchProductById(product_id, options) {
        const { includeVariations = true, includeMedia = true } = options || {};
        try {
            const product = await associations_1.Product.findByPk(product_id, {
                include: [
                    // Include variations
                    ...(includeVariations
                        ? [
                            {
                                model: associations_3.Variation,
                                as: "variations",
                                include: includeMedia
                                    ? [
                                        {
                                            model: associations_2.Media,
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
                                model: associations_2.Media,
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
        }
        catch (error) {
            console.error("Error fetching product:", error);
            return { success: false, message: "Failed to fetch product", error };
        }
    }
}
exports.ProductService = ProductService;
