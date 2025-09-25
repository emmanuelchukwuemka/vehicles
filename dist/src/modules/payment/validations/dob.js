"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackSubmitBirthdaySchema = void 0;
const zod_1 = require("zod");
exports.PaystackSubmitBirthdaySchema = zod_1.z.object({
    reference: zod_1.z.string().min(5, "Transaction reference is required"),
    birthday: zod_1.z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Birthday must be in YYYY-MM-DD format"),
    mode: zod_1.z.enum(["test", "live"]).default("test"),
});
