import { z } from "zod";

// -----------------------------------------
// Media schema (shared for product + units)
// -----------------------------------------
const mediaSchema = z.object({
  url: z.string().url(),
  type: z.string(), // e.g. "image", "video"
  description: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

// -----------------------------------------
// Unit items (like SMALL, MEDIUM packages)
// -----------------------------------------
const unitItemSchema = z.object({
  unit_value: z.string().min(1), // identifier like SMALL_PKG
  price: z.number().nonnegative(),
  weight_limit: z.number().positive().optional(),
  medias: z.array(mediaSchema).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

// -----------------------------------------
// Units schema (tier, measurement type/unit)
// -----------------------------------------
const unitSchema = z.object({
  name: z.string().min(1),
  measurement_type: z.string().optional(),
  measurement_unit: z.string().optional(), // e.g. kg, km, litre
  items: z.array(unitItemSchema).min(1),
});

// -----------------------------------------
// Insurance schema
// -----------------------------------------
const insuranceSchema = z
  .object({
    enabled: z.union([z.literal(0), z.literal(1)]), // 0 = disabled, 1 = enabled
    price: z.number().positive().optional(),
    coverage_type: z.enum(["full", "partial"]).optional(),
  })
  .refine(
    (data) =>
      data.enabled === 0 ||
      (data.enabled === 1 && typeof data.price === "number"),
    {
      message: "If insurance is enabled, a price must be provided",
      path: ["price"],
    }
  );

// -----------------------------------------
// Tracking schema
// -----------------------------------------
const trackingSchema = z
  .object({
    enabled: z.union([z.literal(0), z.literal(1)]),
    price: z.number().nonnegative().optional(),
    method: z.enum(["GPS", "SMS", "email", "notification"]).optional(),
  })
  .refine(
    (data) =>
      data.enabled === 0 ||
      (data.enabled === 1 && typeof data.price === "number"),
    {
      message: "If tracking is enabled, a price must be provided",
      path: ["price"],
    }
  );

// -----------------------------------------
// Logistics Product Schema
// -----------------------------------------
export const logisticsProductSchema = z.object({
  identifiers: z.object({
    store_id: z.number().int().positive(),
    serviceType_id: z.number().int().positive(),
    collection_id: z.number().int().positive().optional(),
    currency_id: z.number().int().positive().default(238),
  }),

  basic_info: z.object({
    name: z.string().min(2, "Service name is too short"),
    description: z.string(),
  }),

  pricing: z
    .object({
      base_price: z.number().positive(),
      discount: z.number().min(0).default(0),
      discount_type: z.enum(["fixed", "percentage"]).optional(),
    })
    .refine((data) => data.discount === 0 || data.discount_type !== undefined, {
      message: "discount_type is required if discount is provided",
      path: ["discount_type"],
    }),

  medias: z.array(mediaSchema).optional(), // product-level medias

  units: z.array(unitSchema).min(1), // logistics tiers

  metadata: z
    .object({
      coverage: z.array(z.union([z.number()])).optional(), // [1, 2, 3] IDs
      insurance: insuranceSchema.optional(),
      tracking: trackingSchema.optional(),
      extras: z.record(z.string(), z.any()).optional(),
    })
    .optional(),
});

export type LogisticsProductInput = z.infer<typeof logisticsProductSchema>;
