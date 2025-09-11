import { z } from "zod";

// Create module validation
export const createDomainSchema = z.object({
  name: z.string().min(1, "Module name is required"),
  label: z.string().min(4, "Label the module for friedly display"),
  description: z.string(),
  status: z.number().int().optional().default(1),
  intake: z.number().int().optional().default(1),
});

export type CreateDomainInput = z.infer<typeof createDomainSchema>;

// Update module validation
export const updateDomainSchema = z.object({
  name: z.string().optional(),
  lable: z.string().optional(),
  description: z.string().optional(),
  status: z.number().int().optional(),
  intake: z.number().int().optional(),
});

export type UpdateDomainInput = z.infer<typeof updateDomainSchema>;

export const idSchema = z.object({
  id: z.number().positive().min(1, "ID must be a positive number"),
});
