"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retailerProductSchema = void 0;
const zod_1 = require("zod");
// Media schema
const mediaSchema = zod_1.z.object({
    url: zod_1.z.string().url(),
    type: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
});
// Unit Item schema (no unit_value here anymore)
const unitItemSchema = zod_1.z.object({
    price: zod_1.z.number().nonnegative(), // item price
    stock: zod_1.z.number().int().nonnegative(), // item stock
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.any()), // REQUIRED → used to generate SKU
    medias: zod_1.z.array(mediaSchema).optional(),
});
// Unit schema
const unitSchema = zod_1.z.object({
    name: zod_1.z.string().min(1), // e.g. "variation1"
    items: zod_1.z.array(unitItemSchema).min(1), // must have at least one item
});
// Retailer Product Schema
exports.retailerProductSchema = zod_1.z.object({
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
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
    medias: zod_1.z.array(mediaSchema).optional(),
    units: zod_1.z.array(unitSchema),
});
