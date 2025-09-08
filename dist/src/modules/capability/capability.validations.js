"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capabilitySchema = void 0;
const zod_1 = require("zod");
// Validation schema for Capability
exports.capabilitySchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name is required").max(100, "Name is too long"),
    description: zod_1.z
        .string()
        .min(2, "Description is required")
        .max(255, "Description is too long"),
});
