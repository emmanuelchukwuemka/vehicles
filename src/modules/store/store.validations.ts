import { z } from "zod";

export const storeSchema = z.object({
  vendor_id: z.number().min(1),
  subdomain_id: z.number().min(1).positive(),
  name: z.string().min(2).max(255),
  slogan: z.string().max(255),
  city_id: z.number().min(1),
  banner: z.url(),
  picture: z.url(),
  logo: z.url().optional(),
  net_worth: z.number().nonnegative(),
  staff_count: z.number().int().nonnegative(),
  address: z.string().min(5).max(255),
  floor_space: z.number().positive(),
  capabilities: z.array(z.number().int().nonnegative()).optional(),
  scope: z.string().min(4),
  is_verified: z.number().min(0).max(1).optional(),
  verified_date: z.date().optional().nullable(),
  status: z.number().positive().max(1).optional(),
});

// update schema → all fields optional
export const updateStoreSchema = storeSchema.partial();

export const idSchema = z.object({
  id: z.number().int().positive().min(1),
});

export type StoreInput = z.infer<typeof storeSchema>;
export type UpdateStoreInput = z.infer<typeof updateStoreSchema>;
