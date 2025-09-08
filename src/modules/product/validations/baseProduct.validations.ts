import { z } from "zod";

// Flexible JSON field (custom)
const customFieldSchema = z.record(
  z.string(),
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.array(z.any()),
    z.record(z.string(), z.any()),
  ])
);

// A single variation schema
const variationSchema = z.object({
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  attributes: z.record(z.string(), z.union([z.string(), z.number()])),
  medias: z
    .array(
      z.object({
        url: z.string().url(),
        type: z.string(),
        description: z.string().optional(),
        metadata: z.any().optional(),
      })
    )
    .optional(),
});

// Base Product Schema
export const baseProductSchema = z.object({
  identifiers: z.object({
    store_id: z.number().int().positive(),
    subcategory_id: z.number().int().positive().optional(),
    collection_id: z.number().int().positive().optional(),
    currency_id: z.number().int().positive().default(238),
  }),

  basic_info: z.object({
    name: z.string().min(2, "Product name is too short"),
    description: z.string(),
    weight: z.number().nonnegative().nullable().optional(),
  }),

  pricing: z.object({
    base_price: z.number().positive(),
    discount: z.number().min(0).default(0),
  }),

  metadata: customFieldSchema,

  variations: z.array(variationSchema).optional(), // ✅ Add this
});

// -------------------------------
// Zod schema for product fetch by ID
// -------------------------------
export const fetchProductByIdSchema = z.object({
  product_id: z.number().int().positive(),
});

export const fetchProductsByDomainSchema = z.object({
  params: z.object({
    domain: z.string().min(1, "Domain name is required"), // <- from path
  }),
  query: z.object({
    includeVariations: z
      .string()
      .optional()
      .transform((val) => val !== "false"), // convert to boolean
    includeMedia: z
      .string()
      .optional()
      .transform((val) => val !== "false"), // convert to boolean
  }),
});

// Type inferred from the schema
export type FetchProductByIdInput = z.infer<typeof fetchProductByIdSchema>;

export type BaseProductInput = z.infer<typeof baseProductSchema>;
