"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logisticsProductSchema = void 0;
const zod_1 = require("zod");
// -----------------------------------------
// Media schema (shared for product + units)
// -----------------------------------------
const mediaSchema = zod_1.z.object({
    url: zod_1.z.url(),
    type: zod_1.z.string().min(1), // "image", "video", etc.
    description: zod_1.z.string().optional(),
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
});
// -----------------------------------------
// Measurement schema
// -----------------------------------------
const measurementSchema = zod_1.z.object({
    type: zod_1.z.enum(["weight", "distance", "volume", "time"]), // ensures user specifies type
    unit: zod_1.z.string().min(1), // e.g., "kg", "km", "liters", "hours"
    limit: zod_1.z.number().positive(), // actual numeric limit (e.g., 2kg, 10km)
});
// -----------------------------------------
// Unit Item schema (inside units.items[])
// -----------------------------------------
const unitItemSchema = zod_1.z.object({
    unit_value: zod_1.z.string().min(1), // identifier, e.g., "SMALL_PKG", "ZONE_1"
    price: zod_1.z.number().nonnegative(),
    stock: zod_1.z.number().int().nonnegative().default(1), // optional, for logistics capacity
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
    // Optional per-item measurement (overrides unit-level defaults)
    measurement: measurementSchema.optional(),
    // Optional medias per item
    medias: zod_1.z.array(mediaSchema).optional(),
});
// -----------------------------------------
// Unit schema (groups items under same logic)
// -----------------------------------------
const unitSchema = zod_1.z.object({
    name: zod_1.z.string().min(1), // e.g., "Tier 1", "Weight-Based", etc.
    // Default measurement settings for all items (can be overridden at item-level)
    measurement_type: zod_1.z.enum(["weight", "distance", "volume", "time"]).optional(),
    measurement_unit: zod_1.z.string().min(1).optional(),
    // Items under this unit
    items: zod_1.z.array(unitItemSchema).min(1, "Unit must have at least one item"),
});
// -----------------------------------------
// Logistics Product Schema
// -----------------------------------------
exports.logisticsProductSchema = zod_1.z.object({
    identifiers: zod_1.z.object({
        store_id: zod_1.z.number().int().positive(),
        serviceType_id: zod_1.z.number().int().positive(), // same as subcategory_id
        collection_id: zod_1.z.number().int().positive().optional(),
        currency_id: zod_1.z.number().int().positive().default(238), // USD by default
    }),
    basic_info: zod_1.z.object({
        name: zod_1.z.string().min(2, "Product name is too short"),
        description: zod_1.z.string(),
    }),
    pricing: zod_1.z.object({
        base_price: zod_1.z.number().positive(),
        discount: zod_1.z.number().min(0).default(0),
        discount_type: zod_1.z.enum(["percentage", "fixed"]).optional(),
    }),
    // Flexible metadata: e.g., coverage areas, insurance, delivery type
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
    medias: zod_1.z.array(mediaSchema).optional(), // product-level medias
    units: zod_1.z.array(unitSchema).min(1, "At least one unit is required"),
});
