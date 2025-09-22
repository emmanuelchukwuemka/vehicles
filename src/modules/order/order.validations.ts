import { z } from "zod";

// Am creating validation schema for Order here
export const orderSchema = z.object({
  // Example
  //name: z.string().min(2, "Name is required").max(50, "Name is too long"),
});

// Inferred TypeScript type from schema
export type OrderInput = z.infer<typeof orderSchema>;
