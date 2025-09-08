// validation/updateProductVariation.validation.ts
import { z } from "zod";

const variationItemSchema = z.object({
  value: z.string().min(1),
  price: z.number().nonnegative().optional(),
  stock: z.number().int().nullable().optional(),
  weight: z.number().nonnegative().optional(),
  images: z.array(z.string().url()).optional(),
});

const variationAttributeSchema = z.object({
  layout_id: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().optional(),
  items: z.array(variationItemSchema).min(1),
});

const mediaSchema = z.object({
  url: z.string().url(),
  type: z.enum(["image", "video"]),
});

export const updateProductVariationSchema = z.object({
  // required to confirm product -> variation mapping
  product_id: z.number().int().positive(),
  variation_id: z.number().int().positive(),
  sku: z.string().min(1),

  // Optional product fields to update
  product: z
    .object({
      name: z.string().min(2).optional(),
      description: z.string().min(1).optional(),
      collection_id: z.number().int().positive().optional(),
      price: z.number().nonnegative().optional(),
      discount: z.number().nonnegative().optional(),
      weight: z.number().nonnegative().optional(),
      stock: z.number().int().nonnegative().optional(),
      customizable: z.number().int().optional(),
      status: z.number().int().optional(),
    })
    .optional(),

  // Optional variation base fields to update
  variation: z
    .object({
      price: z.number().nonnegative().optional(),
      stock: z.number().int().optional(),
      weight: z.number().nonnegative().optional(),
      status: z.number().int().optional(),
    })
    .optional(),

  // attributes: object keyed by label (color, size, ...)
  attributes: z.record(z.string(), variationAttributeSchema).optional(),

  // gallery media for the variation (not tied to attributes)
  media: z.array(mediaSchema).optional(),

  // control flags:
  // if true, remove existing attributes & attribute-media for this variation before inserting new ones
  replaceAttributes: z.boolean().optional().default(false),
  // if true, remove existing gallery media (variation-level) before inserting new ones
  replaceMedia: z.boolean().optional().default(false),
});

export type UpdateProductVariationInput = z.infer<
  typeof updateProductVariationSchema
>;
