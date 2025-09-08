import { z } from "zod";

// Validation schema for Capability
export const capabilitySchema = z.object({
  name: z.string().min(2, "Name is required").max(100, "Name is too long"),
  description: z
    .string()
    .min(2, "Description is required")
    .max(255, "Description is too long"),
});

export type CapabilityInput = z.infer<typeof capabilitySchema>;
