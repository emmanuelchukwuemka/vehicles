"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackSubmitPhoneSchema = void 0;
const zod_1 = require("zod");
exports.PaystackSubmitPhoneSchema = zod_1.z.object({
    reference: zod_1.z.string().min(5, "Transaction reference is required"),
    phone: zod_1.z
        .string()
        .regex(/^\+?\d{7,15}$/, "Phone must be valid with 7–15 digits"),
    mode: zod_1.z.enum(["test", "live"]).default("test"),
});
