"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackChargeAuthSchema = void 0;
const zod_1 = require("zod");
exports.PaystackChargeAuthSchema = zod_1.z.object({
    email: zod_1.z.string(),
    amount: zod_1.z.number().int().positive("Amount must be a positive integer"), // in kobo
    auth_code: zod_1.z.string().min(5, "Authorization code is required"),
    mode: zod_1.z.enum(["test", "live"]),
});
