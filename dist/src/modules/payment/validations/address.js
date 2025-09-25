"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackSubmitAddressSchema = void 0;
const zod_1 = require("zod");
exports.PaystackSubmitAddressSchema = zod_1.z.object({
    reference: zod_1.z.string().min(5, "Transaction reference is required"),
    address: zod_1.z.string().min(5, "Address is required"),
    city: zod_1.z.string().min(2, "City is required"),
    state: zod_1.z.string().min(2, "State is required"),
    zipcode: zod_1.z.string().min(3, "Zip/Postal code is required"),
    mode: zod_1.z.enum(["test", "live"]).default("test"),
});
