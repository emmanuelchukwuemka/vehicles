import z from "zod";

export const SubmitPinSchema = z.object({
  reference: z.string().min(1, "reference is required"),
  pin: z.string().min(4, "PIN too short"),
  mode: z.enum(["test", "live"]),
});

export type SubmitPinInput = z.infer<typeof SubmitPinSchema>;
