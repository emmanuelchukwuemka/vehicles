import { z } from "zod";

export const PaystackChargeAuthSchema = z.object({
  email: z.string(),
  amount: z.number().int().positive("Amount must be a positive integer"), // in kobo
  auth_code: z.string().min(5, "Authorization code is required"),
  mode: z.enum(["test", "live"]),
});

export type ChargeAuthInput = z.infer<typeof PaystackChargeAuthSchema>;
