"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logisticsProductSchema = void 0;
const zod_1 = require("zod");
const mediaSchema = zod_1.z.object({
    url: zod_1.z.string().url(),
    type: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
});
const unitItemSchema = zod_1.z.object({
    unit_value: zod_1.z.string().min(1),
    price: zod_1.z.number().nonnegative(),
    weight_limit: zod_1.z.number().positive().optional(),
    medias: zod_1.z.array(mediaSchema).optional(),
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
});
const unitSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    measurement_type: zod_1.z.string().optional(),
    measurement_unit: zod_1.z.string().optional(),
    items: zod_1.z.array(unitItemSchema).min(1),
});
const insuranceSchema = zod_1.z
    .object({
    enabled: zod_1.z.union([zod_1.z.literal(0), zod_1.z.literal(1)]),
    price: zod_1.z.number().positive().optional(),
    coverage_type: zod_1.z.enum(["full", "partial"]).optional(),
})
    .refine((data) => data.enabled === 0 ||
    (data.enabled === 1 && typeof data.price === "number"), {
    message: "If insurance is enabled, a price must be provided",
    path: ["price"],
});
const trackingSchema = zod_1.z
    .object({
    enabled: zod_1.z.union([zod_1.z.literal(0), zod_1.z.literal(1)]),
    price: zod_1.z.number().nonnegative().optional(),
    method: zod_1.z.enum(["GPS", "SMS", "email", "notification"]).optional(),
})
    .refine((data) => data.enabled === 0 ||
    (data.enabled === 1 && typeof data.price === "number"), {
    message: "If tracking is enabled, a price must be provided",
    path: ["price"],
});
exports.logisticsProductSchema = zod_1.z.object({
    identifiers: zod_1.z.object({
        store_id: zod_1.z.number().int().positive(),
        serviceType_id: zod_1.z.number().int().positive(),
        collection_id: zod_1.z.number().int().positive().optional(),
        currency_id: zod_1.z.number().int().positive().default(238),
    }),
    basic_info: zod_1.z.object({
        name: zod_1.z.string().min(2, "Service name is too short"),
        description: zod_1.z.string(),
    }),
    pricing: zod_1.z
        .object({
        base_price: zod_1.z.number().positive(),
        discount: zod_1.z.number().min(0).default(0),
        discount_type: zod_1.z.enum(["fixed", "percentage"]).optional(),
    })
        .refine((data) => data.discount === 0 || data.discount_type !== undefined, {
        message: "discount_type is required if discount is provided",
        path: ["discount_type"],
    }),
    medias: zod_1.z.array(mediaSchema).optional(),
    units: zod_1.z.array(unitSchema).min(1),
    metadata: zod_1.z
        .object({
        coverage: zod_1.z.array(zod_1.z.union([zod_1.z.number()])).optional(),
        insurance: insuranceSchema.optional(),
        tracking: trackingSchema.optional(),
        extras: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
    })
        .optional(),
});
