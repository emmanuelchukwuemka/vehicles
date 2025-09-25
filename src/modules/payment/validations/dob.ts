import { z } from "zod";

export const PaystackSubmitBirthdaySchema = z.object({
  reference: z.string().min(5, "Transaction reference is required"),
  birthday: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Birthday must be in YYYY-MM-DD format"),
  mode: z.enum(["test", "live"]).default("test"),
});

export type SubmitBirthdayInput = z.infer<typeof PaystackSubmitBirthdaySchema>;
