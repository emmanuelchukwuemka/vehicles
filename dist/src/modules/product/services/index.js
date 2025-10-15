"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUnitService = exports.ProductService = void 0;
const currency_models_1 = __importDefault(require("../../currency/currency.models"));
const subdomain_models_1 = require("../../domains/model/subdomain.models");
const associations_1 = require("../models/associations");
class ProductService {
    static async getSingleProduct(id, options) {
        const { domain, includeUnits = true, includeMedia = true, includeMetadata = true, includeSpecifications = true, includeProductMediaMetadata = true, includeUnitMediaMetadata = true, } = options || {};
        try {
            let subdomainId;
            if (domain) {
                const subdomain = await subdomain_models_1.Subdomain.findOne({ where: { name: domain } });
                if (!subdomain) {
                    return { success: false, message: "Subdomain not found", data: null };
                }
                subdomainId = subdomain.id;
            }
            let product = await associations_1.Product.findOne({
                where: { id, ...(subdomainId ? { subdomain_id: subdomainId } : {}) },
                attributes: {
                    exclude: ["created_at", "updated_at", "createdAt", "updatedAt"],
                },
                include: [
                    ...(includeUnits
                        ? [
                            {
                                model: associations_1.ProductUnit,
                                as: "units",
                                attributes: {
                                    exclude: [
                                        "created_at",
                                        "updated_at",
                                        "createdAt",
                                        "updatedAt",
                                    ],
                                },
                                include: includeMedia
                                    ? [{ model: associations_1.ProductMedia, as: "unitMedia" }]
                                    : [],
                            },
                        ]
                        : []),
                    ...(includeMedia
                        ? [
                            {
                                model: associations_1.ProductMedia,
                                as: "productMedia",
                                attributes: {
                                    exclude: [
                                        "created_at",
                                        "updated_at",
                                        "createdAt",
                                        "updatedAt",
                                    ],
                                },
                                where: { unit_id: null },
                                required: false,
                            },
                        ]
                        : []),
                ],
            });
            if (!product) {
                return { success: false, message: "Product not found" };
            }
            const plain = product.get({ plain: true });
            if (plain.currency_id) {
                const currency = await currency_models_1.default.findByPk(plain.currency_id, {
                    attributes: ["id", "code", "symbol", "decimal_places"],
                });
                if (currency) {
                    plain.currency = {
                        id: currency.id,
                        code: currency.code,
                        symbol: currency.symbol,
                        decimal_places: currency.decimal_places,
                    };
                }
            }
            if (!includeMetadata) {
                delete plain.metadata;
            }
            else if (!includeSpecifications && plain.metadata?.specifications) {
                delete plain.metadata.specifications;
            }
            if (plain.productMedia && Array.isArray(plain.productMedia)) {
                plain.productMedia = plain.productMedia.map((m) => {
                    if (!includeProductMediaMetadata) {
                        const { metadata, ...rest } = m;
                        return rest;
                    }
                    return m;
                });
            }
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
            return {
                success: true,
                message: "Product fetched successfully",
                data: plain,
            };
        }
        catch (error) {
            console.error("Error fetching product:", error);
            return { success: false, message: "Failed to fetch product", error };
        }
    }
}
exports.ProductService = ProductService;
class ProductUnitService {
    static async getSingleUnit(unitId, options) {
        try {
            const unit = await associations_1.ProductUnit.findByPk(unitId, {
                attributes: {
                    exclude: ["createdAt", "updatedAt", "created_at", "updated_at"],
                },
                include: [
                    ...(options?.includeMedia
                        ? [
                            {
                                model: associations_1.ProductMedia,
                                as: "unitMedia",
                                attributes: {
                                    exclude: [
                                        "createdAt",
                                        "updatedAt",
                                        "created_at",
                                        "updated_at",
                                    ],
                                },
                            },
                        ]
                        : []),
                ],
            });
            if (!unit) {
                return { success: false, message: "Unit not found" };
            }
            const plain = unit.get({ plain: true });
            if (!options?.includeMetadata) {
                delete plain.metadata;
            }
            return {
                success: true,
                message: "Unit fetched successfully",
                data: plain,
            };
        }
        catch (error) {
            console.error("Error in getSingleUnit:", error);
            return { success: false, message: "Failed to fetch unit", error };
        }
    }
}
exports.ProductUnitService = ProductUnitService;
