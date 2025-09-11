import { z } from "zod";

// -----------------------------------------
// Metadata schema (with enforced location)
// -----------------------------------------
const metadataSchema = z.object({
  specifications: z.array(
    z.object({
      name: z.string().min(1),
      value: z.union([z.string(), z.number(), z.boolean()]),
    })
  ),
});

// Media schema
const mediaSchema = z.object({
  url: z.string().url(),
  type: z.string(),
  description: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

// Unit Item schema (no unit_value here anymore)
const unitItemSchema = z.object({
  price: z.number().nonnegative(), // item price
  stock: z.number().int().nonnegative(), // item stock
  attributes: z.record(z.string(), z.any()), // REQUIRED → used to generate SKU
  medias: z.array(mediaSchema).optional(),
});

// Unit schema
const unitSchema = z.object({
  name: z.string().min(1), // e.g. "variation1"
  items: z.array(unitItemSchema).min(1), // must have at least one item
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
        message: "discount_type is required because discount is provided",
      });
    }
  });

// Retailer Product Schema
export const retailerProductSchema = z.object({
  identifiers: z.object({
    store_id: z.number().int().positive(),
    subcategory_id: z.number().int().positive().optional(),
    collection_id: z.number().int().positive().optional(),
    currency_id: z.number().int().positive().default(238),
  }),

  basic_info: z.object({
    name: z.string().min(2, "Product name is too short"),
    description: z.string(),
    weight: z.number().nonnegative().default(0.1),
  }),

  pricing: pricingSchema,

  metadata: metadataSchema,
  medias: z.array(mediaSchema).optional(),
  units: z.array(unitSchema),
});

export type RetailerProductInput = z.infer<typeof retailerProductSchema>;
