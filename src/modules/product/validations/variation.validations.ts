import { z } from "zod";

// A variation combo (what you put inside metadata.variations)
const variationComboSchema = z.object({
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  attributes: z.record(z.string(), z.union([z.string(), z.number()])),
  medias: z
    .array(
      z.object({
        description: z.string().optional(),
        url: z.url(),
        type: z.string(),
        metadata: z.record(z.string(), z.any()).optional(),
      })
    )
    .optional(),
});

export const createVariationSchema = z.object({
  identifiers: z.object({
    store_id: z.number().positive(),
    product_id: z.number().positive(),
    product_code: z.string(),
  }),
  metadata: z.object({
    variations: z.array(variationComboSchema).min(1),
  }),
});

export type CreateVariationInput = z.infer<typeof createVariationSchema>;
