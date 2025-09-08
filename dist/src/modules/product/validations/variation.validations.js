"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVariationSchema = void 0;
const zod_1 = require("zod");
// A variation combo (what you put inside metadata.variations)
const variationComboSchema = zod_1.z.object({
    price: zod_1.z.number().nonnegative(),
    stock: zod_1.z.number().int().nonnegative(),
    attributes: zod_1.z.record(zod_1.z.string(), zod_1.z.union([zod_1.z.string(), zod_1.z.number()])),
    medias: zod_1.z
        .array(zod_1.z.object({
        description: zod_1.z.string().optional(),
        url: zod_1.z.url(),
        type: zod_1.z.string(),
        metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
    }))
        .optional(),
});
exports.createVariationSchema = zod_1.z.object({
    identifiers: zod_1.z.object({
        store_id: zod_1.z.number().positive(),
        product_id: zod_1.z.number().positive(),
        product_code: zod_1.z.string(),
    }),
    metadata: zod_1.z.object({
        variations: zod_1.z.array(variationComboSchema).min(1),
    }),
});
