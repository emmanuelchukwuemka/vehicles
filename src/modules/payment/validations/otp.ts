import z from "zod";

export const SubmitOtpSchema = z.object({
  reference: z.string().min(1, "reference is required"),
  otp: z.string().min(3, "OTP too short"),
  mode: z.enum(["test", "live"]),
});

export type SubmitOtpInput = z.infer<typeof SubmitOtpSchema>;
