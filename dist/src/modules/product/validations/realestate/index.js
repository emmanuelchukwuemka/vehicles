"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.realEstateProductSchema = void 0;
const zod_1 = require("zod");
const locationSchema = zod_1.z.object({
    address: zod_1.z.string().min(1),
    city: zod_1.z.string().min(1),
    state: zod_1.z.string().min(1),
    country: zod_1.z.string().min(1),
    coordinates: zod_1.z.object({
        latitude: zod_1.z.number().min(-90).max(90),
        longitude: zod_1.z.number().min(-180).max(180),
    }),
});
const metadataSchema = zod_1.z.object({
    property_type: zod_1.z.string().min(1),
    listing_type: zod_1.z.string().min(1),
    closure_type: zod_1.z.string().min(1),
    amenities: zod_1.z.array(zod_1.z.string()).optional(),
    location: locationSchema,
    specifications: zod_1.z
        .array(zod_1.z.object({
        name: zod_1.z.string().min(1),
        value: zod_1.z.union([zod_1.z.string(), zod_1.z.number(), zod_1.z.boolean()]),
    }))
        .optional(),
});
const mediaSchema = zod_1.z.object({
    url: zod_1.z.url(),
    type: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
});
const realEstateItemSchema = zod_1.z.object({
    unit_value: zod_1.z.string().min(1),
    dimensions: zod_1.z.string().optional(),
    medias: zod_1.z.array(mediaSchema).optional(),
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.any()).optional(),
});
const realEstateUnitSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    price: zod_1.z.number().nonnegative(),
    stock: zod_1.z.number().int().nonnegative().default(1),
    medias: zod_1.z.array(mediaSchema).optional(),
    items: zod_1.z.array(realEstateItemSchema).nonempty(),
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
            message: "discount_type is required when discount is greater than 0",
        });
    }
});
exports.realEstateProductSchema = zod_1.z.object({
    identifiers: zod_1.z.object({
        store_id: zod_1.z.number().int().positive(),
        subcategory_id: zod_1.z.number().int().positive().optional(),
        collection_id: zod_1.z.number().int().positive().optional(),
        currency_id: zod_1.z.number().int().positive().default(238),
    }),
    basic_info: zod_1.z.object({
        name: zod_1.z.string().min(2),
        description: zod_1.z.string(),
    }),
    pricing: pricingSchema,
    metadata: metadataSchema,
    medias: zod_1.z.array(mediaSchema).optional(),
    units: zod_1.z.array(realEstateUnitSchema).nonempty(),
});
