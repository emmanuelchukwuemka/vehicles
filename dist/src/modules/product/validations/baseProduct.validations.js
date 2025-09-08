"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchProductsByDomainSchema = exports.fetchProductByIdSchema = exports.baseProductSchema = void 0;
const zod_1 = require("zod");
// Flexible JSON field (custom)
const customFieldSchema = zod_1.z.record(zod_1.z.string(), zod_1.z.union([
    zod_1.z.string(),
    zod_1.z.number(),
    zod_1.z.boolean(),
    zod_1.z.array(zod_1.z.any()),
    zod_1.z.record(zod_1.z.string(), zod_1.z.any()),
]));
// A single variation schema
const variationSchema = zod_1.z.object({
    price: zod_1.z.number().nonnegative(),
    stock: zod_1.z.number().int().nonnegative(),
    attributes: zod_1.z.record(zod_1.z.string(), zod_1.z.union([zod_1.z.string(), zod_1.z.number()])),
    medias: zod_1.z
        .array(zod_1.z.object({
        url: zod_1.z.string().url(),
        type: zod_1.z.string(),
        description: zod_1.z.string().optional(),
        metadata: zod_1.z.any().optional(),
    }))
        .optional(),
});
// Base Product Schema
exports.baseProductSchema = zod_1.z.object({
    identifiers: zod_1.z.object({
        store_id: zod_1.z.number().int().positive(),
        subcategory_id: zod_1.z.number().int().positive().optional(),
        collection_id: zod_1.z.number().int().positive().optional(),
        currency_id: zod_1.z.number().int().positive().default(238),
    }),
    basic_info: zod_1.z.object({
        name: zod_1.z.string().min(2, "Product name is too short"),
        description: zod_1.z.string(),
        weight: zod_1.z.number().nonnegative().nullable().optional(),
    }),
    pricing: zod_1.z.object({
        base_price: zod_1.z.number().positive(),
        discount: zod_1.z.number().min(0).default(0),
    }),
    metadata: customFieldSchema,
    variations: zod_1.z.array(variationSchema).optional(), // ✅ Add this
});
// -------------------------------
// Zod schema for product fetch by ID
// -------------------------------
exports.fetchProductByIdSchema = zod_1.z.object({
    product_id: zod_1.z.number().int().positive(),
});
exports.fetchProductsByDomainSchema = zod_1.z.object({
    params: zod_1.z.object({
        domain: zod_1.z.string().min(1, "Domain name is required"), // <- from path
    }),
    query: zod_1.z.object({
        includeVariations: zod_1.z
            .string()
            .optional()
            .transform((val) => val !== "false"), // convert to boolean
        includeMedia: zod_1.z
            .string()
            .optional()
            .transform((val) => val !== "false"), // convert to boolean
    }),
});
