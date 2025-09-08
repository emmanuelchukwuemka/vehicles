"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubmoduleSchema = exports.createSubmoduleSchema = void 0;
const zod_1 = require("zod");
exports.createSubmoduleSchema = zod_1.z.object({
    domain_id: zod_1.z.number().int().positive("Domain ID is required"),
    name: zod_1.z.string().min(1).max(255),
    label: zod_1.z.string().min(1).max(255),
    description: zod_1.z.string().max(255).optional(),
    status: zod_1.z.number().int().min(0).max(1).default(1),
});
exports.updateSubmoduleSchema = exports.createSubmoduleSchema.partial();
