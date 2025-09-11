import { z } from "zod";

// -----------------------------------------
// Location schema
// -----------------------------------------
const locationSchema = z.object({
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  coordinates: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }),
});

// -----------------------------------------
// Metadata schema (with enforced location)
// -----------------------------------------
const metadataSchema = z.object({
  property_type: z.string().min(1),
  listing_type: z.string().min(1),
  closure_type: z.string().min(1),
  amenities: z.array(z.string()).optional(),
  location: locationSchema,
  specifications: z
    .array(
      z.object({
        name: z.string().min(1),
        value: z.union([z.string(), z.number(), z.boolean()]),
      })
    )
    .optional(),
});

// -----------------------------------------
// Media schema (shared for product + units + items)
// -----------------------------------------
const mediaSchema = z.object({
  url: z.url(),
  type: z.string(),
  description: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

// -----------------------------------------
// Item schema for real estate units
// -----------------------------------------
const realEstateItemSchema = z.object({
  unit_value: z.string().min(1), // mandatory, used to populate `value` column
  dimensions: z.string().optional(),
  medias: z.array(mediaSchema).optional(),
  metadata: z.record(z.string(), z.any()).optional(), // optional extra fields
});

// -----------------------------------------
// Unit schema (real estate)
// -----------------------------------------
const realEstateUnitSchema = z.object({
  name: z.string().min(1),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative().default(1),
  medias: z.array(mediaSchema).optional(),
  items: z.array(realEstateItemSchema).nonempty(), // must have at least one item
});

// -----------------------------------------
// Pricing schema (with conditional discount_type)
// -----------------------------------------
const pricingSchema = z
  .object({
    base_price: z.number().positive(),
    discount: z.number().min(0).optional().default(0),
    discount_type: z.string().optional(),
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

// -----------------------------------------
// Real Estate Product schema
// -----------------------------------------
export const realEstateProductSchema = z.object({
  identifiers: z.object({
    store_id: z.number().int().positive(),
    subcategory_id: z.number().int().positive().optional(),
    collection_id: z.number().int().positive().optional(),
    currency_id: z.number().int().positive().default(238),
  }),
  basic_info: z.object({
    name: z.string().min(2),
    description: z.string(),
  }),
  pricing: pricingSchema,
  metadata: metadataSchema,
  medias: z.array(mediaSchema).optional(),
  units: z.array(realEstateUnitSchema).nonempty(),
});

// -----------------------------------------
// Type
// -----------------------------------------
export type RealEstateProductInput = z.infer<typeof realEstateProductSchema>;
