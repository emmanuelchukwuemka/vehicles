import { z } from "zod";

export const createVendorSchema = z.object({
  user_id: z.number().int().positive("Valid user ID is required"),
});

// Schema for updating vendor status
export const updateVendorStatusSchema = z.object({
  vendorId: z.number().int().positive("Valid vendor ID is required"),
  status: z.union([z.literal(0), z.literal(1)]),
});

export type UpdateVendorStatusInput = z.infer<typeof updateVendorStatusSchema>;
export type CreateVendorInput = z.infer<typeof createVendorSchema>;
