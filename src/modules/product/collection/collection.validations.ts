import { z } from "zod";

export const collectionSchema = z.object({
  store_id: z.number().min(1, "Store ID is required"),
  name: z.string().min(2, "Collection name is required").max(255),
  label: z.string().min(2, "Label is required").max(255),
  description: z
    .string()
    .min(2, "Add some description for the collection")
    .max(255),
  status: z.number().min(0).max(1).default(1).optional(),
});

export const idSchema = z.object({
  id: z.number().min(1, "ID must be a positive number"),
});

// For flexible validation
export const collectionFlexibleSchema = z.union([
  collectionSchema,
  z.array(collectionSchema),
]);

export type CollectionInput = z.infer<typeof collectionSchema>;
export type CollectionFlexibleInput = z.infer<typeof collectionFlexibleSchema>;
