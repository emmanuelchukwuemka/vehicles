import { z } from "zod";

// -----------------------------------------
// Media schema (shared for product + units)
// -----------------------------------------
const mediaSchema = z.object({
  url: z.url(),
  type: z.string().min(1), // "image", "video", etc.
  description: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

// -----------------------------------------
// Measurement schema
// -----------------------------------------
const measurementSchema = z.object({
  type: z.enum(["weight", "distance", "volume", "time"]), // ensures user specifies type
  unit: z.string().min(1), // e.g., "kg", "km", "liters", "hours"
  limit: z.number().positive(), // actual numeric limit (e.g., 2kg, 10km)
});

// -----------------------------------------
// Unit Item schema (inside units.items[])
// -----------------------------------------
const unitItemSchema = z.object({
  unit_value: z.string().min(1), // identifier, e.g., "SMALL_PKG", "ZONE_1"
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative().default(1), // optional, for logistics capacity
  metadata: z.record(z.string(), z.unknown()).optional(),

  // Optional per-item measurement (overrides unit-level defaults)
  measurement: measurementSchema.optional(),

  // Optional medias per item
  medias: z.array(mediaSchema).optional(),
});

// -----------------------------------------
// Unit schema (groups items under same logic)
// -----------------------------------------
const unitSchema = z.object({
  name: z.string().min(1), // e.g., "Tier 1", "Weight-Based", etc.

  // Default measurement settings for all items (can be overridden at item-level)
  measurement_type: z.enum(["weight", "distance", "volume", "time"]).optional(),
  measurement_unit: z.string().min(1).optional(),

  // Items under this unit
  items: z.array(unitItemSchema).min(1, "Unit must have at least one item"),
});

// -----------------------------------------
// Logistics Product Schema
// -----------------------------------------
export const logisticsProductSchema = z.object({
  identifiers: z.object({
    store_id: z.number().int().positive(),
    serviceType_id: z.number().int().positive(), // same as subcategory_id
    collection_id: z.number().int().positive().optional(),
    currency_id: z.number().int().positive().default(238), // USD by default
  }),

  basic_info: z.object({
    name: z.string().min(2, "Product name is too short"),
    description: z.string(),
  }),

  pricing: z.object({
    base_price: z.number().positive(),
    discount: z.number().min(0).default(0),
    discount_type: z.enum(["percentage", "fixed"]).optional(),
  }),

  // Flexible metadata: e.g., coverage areas, insurance, delivery type
  metadata: z.record(z.string(), z.unknown()).optional(),

  medias: z.array(mediaSchema).optional(), // product-level medias

  units: z.array(unitSchema).min(1, "At least one unit is required"),
});

// -----------------------------------------
// Types
// -----------------------------------------
export type LogisticsProductInput = z.infer<typeof logisticsProductSchema>;
