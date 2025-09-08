"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVendorStatusSchema = exports.createVendorSchema = void 0;
const zod_1 = require("zod");
exports.createVendorSchema = zod_1.z.object({
    user_id: zod_1.z.number().int().positive("Valid user ID is required"),
});
// Schema for updating vendor status
exports.updateVendorStatusSchema = zod_1.z.object({
    vendorId: zod_1.z.number().int().positive("Valid vendor ID is required"),
    status: zod_1.z.union([zod_1.z.literal(0), zod_1.z.literal(1)]),
});
