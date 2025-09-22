"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackChargeSchema = void 0;
const zod_1 = require("zod");
/**
 * Helpers / refinements
 */
const digitsOnly = (s) => /^\d+$/.test(s);
const cardNumberSchema = zod_1.z
    .string()
    .min(12, "Card number too short")
    .max(19, "Card number too long")
    .refine(digitsOnly, "Card number must contain only digits");
const cvvSchema = zod_1.z
    .string()
    .min(3, "CVV must be at least 3 digits")
    .max(4, "CVV must be at most 4 digits")
    .refine(digitsOnly, "CVV must contain only digits");
const expiryMonthSchema = zod_1.z
    .union([zod_1.z.string(), zod_1.z.number()])
    .transform((v) => String(v).padStart(2, "0"))
    .refine((s) => {
    const n = Number(s);
    return n >= 1 && n <= 12;
}, "expiry_month must be between 1 and 12");
const expiryYearSchema = zod_1.z
    .union([zod_1.z.string(), zod_1.z.number()])
    .transform((v) => String(v))
    .refine((s) => {
    return (/^\d{2}$/.test(s) || /^\d{4}$/.test(s)) && digitsOnly(s);
}, "expiry_year must be 2 or 4 digits");
/**
 * Main charge schema (matches your payload)
 */
exports.PaystackChargeSchema = zod_1.z.object({
    card_number: cardNumberSchema,
    cvv: cvvSchema,
    expiry_month: expiryMonthSchema,
    expiry_year: expiryYearSchema,
    email: zod_1.z.string().email("Invalid email address"),
    amount: zod_1.z.number().int().positive(),
    mode: zod_1.z.enum(["test", "live"]),
    cardholder_name: zod_1.z.string().min(1).optional(), // ✅ now at root level
    reference: zod_1.z.string().optional(),
});
