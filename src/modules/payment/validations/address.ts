import { z } from "zod";

export const PaystackSubmitAddressSchema = z.object({
  reference: z.string().min(5, "Transaction reference is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipcode: z.string().min(3, "Zip/Postal code is required"),
  mode: z.enum(["test", "live"]).default("test"),
});

export type SubmitAddressInput = z.infer<typeof PaystackSubmitAddressSchema>;
