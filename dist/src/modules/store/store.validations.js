"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idSchema = exports.updateStoreSchema = exports.storeSchema = void 0;
const zod_1 = require("zod");
exports.storeSchema = zod_1.z.object({
    vendor_id: zod_1.z.number().min(1),
    subdomain_id: zod_1.z.number().min(1).positive(),
    name: zod_1.z.string().min(2).max(255),
    slogan: zod_1.z.string().max(255),
    city_id: zod_1.z.number().min(1),
    banner: zod_1.z.url(),
    picture: zod_1.z.url(),
    logo: zod_1.z.url().optional(),
    net_worth: zod_1.z.number().nonnegative(),
    staff_count: zod_1.z.number().int().nonnegative(),
    address: zod_1.z.string().min(5).max(255),
    floor_space: zod_1.z.number().positive(),
    capabilities: zod_1.z.array(zod_1.z.number().int().nonnegative()).optional(),
    scope: zod_1.z.string().min(4),
    is_verified: zod_1.z.number().min(0).max(1).optional(),
    verified_date: zod_1.z.date().optional().nullable(),
    status: zod_1.z.number().positive().max(1).optional(),
});
// update schema → all fields optional
exports.updateStoreSchema = exports.storeSchema.partial();
exports.idSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive().min(1),
});
