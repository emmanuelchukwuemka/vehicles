"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetailerService = void 0;
const sequelize_1 = __importDefault(require("../../../../config/database/sequelize"));
const store_models_1 = require("../../../store/models/store.models");
const subcategory_models_1 = require("../../../categories/subcategory/subcategory.models");
const collection_models_1 = require("../../collection/collection.models");
const uuid_1 = require("uuid");
const sku_1 = require("../../utils/sku");
const subdomain_models_1 = require("../../../domains/model/subdomain.models");
const associations_1 = require("../../models/associations");
class RetailerService {
    static async createProduct(input) {
        const { identifiers, basic_info, pricing, metadata, units, medias } = input;
        let transaction;
        try {
            transaction = await sequelize_1.default.transaction();
            // Check store
            const store = await store_models_1.Store.findByPk(identifiers.store_id, { transaction });
            if (!store || (store.status ?? 0) < 1) {
                return { success: false, message: "Store not found or offline" };
            }
            // Check store domain
            const subdomain = await subdomain_models_1.Subdomain.findByPk(store.subdomain_id, {
                transaction,
            });
            if (!subdomain)
                return { success: false, message: "Store domain not found" };
            // Check subcategory
            if (identifiers.subcategory_id) {
                const subcategory = await subcategory_models_1.Subcategory.findByPk(identifiers.subcategory_id, { transaction });
                if (!subcategory)
                    return { success: false, message: "Product category not found" };
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
                if (!collection)
                    return { success: false, message: "Collection not found or invalid" };
            }
            // Create base product
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
                await associations_1.ProductMedia.bulkCreate(mediaPayloads, { transaction });
            }
            // Product units (with `unit_value` for value column)
            if (Array.isArray(units) && units.length > 0) {
                for (const u of units) {
                    if (!Array.isArray(u.items) || u.items.length === 0)
                        continue;
                    for (const item of u.items) {
                        // Store unit_value in value column for quick search/filter
                        const sku = (0, sku_1.generateVariationSKU)(newProduct, item.metadata);
                        const createdUnit = await associations_1.ProductUnit.create({
                            product_id: newProduct.id,
                            name: u.name,
                            value: sku,
                            price: item.price ?? 0,
                            stock: item.stock ?? 1,
                            metadata: {
                                ...(item.metadata ?? {}),
                                unit_value: sku,
                            },
                            status: 1,
                        }, { transaction });
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
                            await associations_1.ProductMedia.bulkCreate(unitMediaPayloads, { transaction });
                        }
                    }
                }
            }
            // Commit transaction
            await transaction.commit();
            return {
                success: true,
                message: "Retail product created successfully",
                data: newProduct,
            };
        }
        catch (error) {
            if (transaction)
                await transaction.rollback();
            console.error("Error creating retail product:", error);
            return { success: false, message: "Failed to create product", error };
        }
    }
    static async fetchProducts(subdomainName, options) {
        const { includeUnits = true, includeMedia = true, includeMetadata = true, includeSpecifications = true, includeProductMediaMetadata = true, includeUnitMediaMetadata = true, } = options || {};
        try {
            // 🔹 Step 1: Find subdomain
            const subdomain = await subdomain_models_1.Subdomain.findOne({
                where: { name: subdomainName },
            });
            if (!subdomain) {
                return { success: false, message: "Subdomain not found", data: [] };
            }
            // 🔹 Step 2: Fetch products
            let products = await associations_1.Product.findAll({
                where: { subdomain_id: subdomain.id },
                include: [
                    // 🔹 Include product units if requested
                    ...(includeUnits
                        ? [
                            {
                                model: associations_1.ProductUnit,
                                as: "units",
                                include: includeMedia
                                    ? [
                                        {
                                            model: associations_1.ProductMedia,
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
                                model: associations_1.ProductMedia,
                                as: "productMedia",
                                where: { unit_id: null },
                                required: false,
                            },
                        ]
                        : []),
                ],
            });
            // 🔹 Step 3: Strip metadata/specifications if not requested
            products = products.map((p) => {
                const plain = p.get({ plain: true });
                // --- Handle product metadata
                if (!includeMetadata) {
                    delete plain.metadata;
                }
                else if (!includeSpecifications && plain.metadata?.specifications) {
                    delete plain.metadata.specifications;
                }
                // --- Handle productMedia metadata
                if (plain.productMedia && Array.isArray(plain.productMedia)) {
                    plain.productMedia = plain.productMedia.map((m) => {
                        if (!includeProductMediaMetadata) {
                            const { metadata, ...rest } = m;
                            return rest;
                        }
                        return m;
                    });
                }
                // --- Handle unitMedia metadata
                if (includeUnits && plain.units) {
                    plain.units = plain.units.map((u) => {
                        if (u.unitMedia && Array.isArray(u.unitMedia)) {
                            u.unitMedia = u.unitMedia.map((m) => {
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
        }
        catch (error) {
            console.error("Error fetching products by domain name:", error);
            return { success: false, message: "Failed to fetch products", error };
        }
    }
}
exports.RetailerService = RetailerService;
