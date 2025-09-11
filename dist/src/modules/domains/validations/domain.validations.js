"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idSchema = exports.updateDomainSchema = exports.createDomainSchema = void 0;
const zod_1 = require("zod");
// Create module validation
exports.createDomainSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Module name is required"),
    label: zod_1.z.string().min(4, "Label the module for friedly display"),
    description: zod_1.z.string(),
    status: zod_1.z.number().int().optional().default(1),
    intake: zod_1.z.number().int().optional().default(1),
});
// Update module validation
exports.updateDomainSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    lable: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    status: zod_1.z.number().int().optional(),
    intake: zod_1.z.number().int().optional(),
});
exports.idSchema = zod_1.z.object({
    id: zod_1.z.number().positive().min(1, "ID must be a positive number"),
});
