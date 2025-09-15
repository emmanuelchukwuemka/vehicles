import { z } from "zod";

export const storeSchema = z.object({
  vendor_id: z.number().int().positive(),
  subdomain_id: z.number().int().positive(),
  name: z.string().min(2).max(255),
  slogan: z.string().max(255),
  city_id: z.number().int().positive(),
  address: z.string().min(5).max(255),

  // top-level flags
  status: z.number().min(0).max(1).default(1),
  is_verified: z.number().min(0).max(1).default(0),

  // everything else grouped under metadata
  metadata: z.object({
    banner: z.url(),
    picture: z.url(),
    logo: z.url().optional(),
    net_worth: z.number().nonnegative(),
    staff_count: z.number().int().nonnegative(),
    floor_space: z.number().positive(),
    capabilities: z.array(z.number().int().nonnegative()).optional(),
    verified_date: z.date().optional().nullable(),
  }),
});

// update schema → all fields optional (including metadata’s internals)
export const updateStoreSchema = storeSchema.partial();

export const idSchema = z.object({
  id: z.number().int().positive(),
});

export type StoreInput = z.infer<typeof storeSchema>;
export type UpdateStoreInput = z.infer<typeof updateStoreSchema>;
