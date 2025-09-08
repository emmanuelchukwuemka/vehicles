import { z } from "zod";

// Create module validation
export const createModuleSchema = z.object({
  name: z.string().min(1, "Module name is required"),
  label: z.string().min(4, "Label the module for friedly display"),
  description: z.string(),
  status: z.number().int().optional().default(1),
  intake: z.number().int().optional().default(1),
});

export type CreateModuleInput = z.infer<typeof createModuleSchema>;

// Update module validation
export const updateModuleSchema = z.object({
  name: z.string().optional(),
  lable: z.string().optional(),
  description: z.string().optional(),
  status: z.number().int().optional(),
  intake: z.number().int().optional(),
});

export type UpdateModuleInput = z.infer<typeof updateModuleSchema>;

export const idSchema = z.object({
  id: z.number().positive().min(1, "ID must be a positive number"),
});
