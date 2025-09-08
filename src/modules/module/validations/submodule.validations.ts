import { z } from "zod";

export const createSubmoduleSchema = z.object({
  domain_id: z.number().int().positive("Domain ID is required"),
  name: z.string().min(1).max(255),
  label: z.string().min(1).max(255),
  description: z.string().max(255).optional(),
  status: z.number().int().min(0).max(1).default(1),
});

export const updateSubmoduleSchema = createSubmoduleSchema.partial();

export type CreateSubmoduleInput = z.infer<typeof createSubmoduleSchema>;
export type UpdateSubmoduleInput = z.infer<typeof updateSubmoduleSchema>;
