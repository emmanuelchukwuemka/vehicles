import { z } from "zod";


export const morelikeSchema = z.object({
  productId: z
    .string()
    .min(1, "Product ID is required")
    .regex(/^\d+$/, "Product ID must be numeric"),
});
