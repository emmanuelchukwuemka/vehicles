import { z } from "zod";

export const PaystackSubmitPhoneSchema = z.object({
  reference: z.string().min(5, "Transaction reference is required"),
  phone: z
    .string()
    .regex(/^\+?\d{7,15}$/, "Phone must be valid with 7–15 digits"),
  mode: z.enum(["test", "live"]).default("test"),
});

export type SubmitPhoneInput = z.infer<typeof PaystackSubmitPhoneSchema>;
