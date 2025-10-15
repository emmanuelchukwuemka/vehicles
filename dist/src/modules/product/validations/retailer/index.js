"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retailerProductSchema = void 0;
const zod_1 = require("zod");
const metadataSchema = zod_1.z.object({
    specifications: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string().min(1),
        value: zod_1.z.union([zod_1.z.string(), zod_1.z.number(), zod_1.z.boolean()]),
    })),
});
const mediaSchema = zod_1.z.object({
    url: zod_1.z.string().url(),
    type: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
});
const unitItemSchema = zod_1.z.object({
    price: zod_1.z.number().nonnegative(),
    stock: zod_1.z.number().int().nonnegative(),
    attributes: zod_1.z.record(zod_1.z.string(), zod_1.z.any()),
    medias: zod_1.z.array(mediaSchema).optional(),
});
const unitSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    items: zod_1.z.array(unitItemSchema).min(1),
});
const pricingSchema = zod_1.z
    .object({
    base_price: zod_1.z.number().positive(),
    discount: zod_1.z.number().min(0).optional().default(0),
    discount_type: zod_1.z.string().optional(),
})
    .superRefine((data, ctx) => {
    if (data.discount > 0 && !data.discount_type) {
        ctx.addIssue({
            code: "custom",
            path: ["discount_type"],
            message: "discount_type is required because discount is provided",
        });
    }
});
exports.retailerProductSchema = zod_1.z.object({
    identifiers: zod_1.z.object({
        store_id: zod_1.z.number().int().positive(),
        subcategory_id: zod_1.z.number().int().positive(),
        collection_id: zod_1.z.number().int().positive().optional(),
        currency_id: zod_1.z.number().int().positive().default(238),
    }),
    basic_info: zod_1.z.object({
        name: zod_1.z.string().min(2, "Product name is too short"),
        description: zod_1.z.string(),
        weight: zod_1.z.number().nonnegative().default(0.1),
    }),
    pricing: pricingSchema,
    metadata: metadataSchema,
    medias: zod_1.z.array(mediaSchema).optional(),
    units: zod_1.z.array(unitSchema),
});
