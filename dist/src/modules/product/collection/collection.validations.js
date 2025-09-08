"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionFlexibleSchema = exports.idSchema = exports.collectionSchema = void 0;
const zod_1 = require("zod");
exports.collectionSchema = zod_1.z.object({
    store_id: zod_1.z.number().min(1, "Store ID is required"),
    name: zod_1.z.string().min(2, "Collection name is required").max(255),
    label: zod_1.z.string().min(2, "Label is required").max(255),
    description: zod_1.z
        .string()
        .min(2, "Add some description for the collection")
        .max(255),
    status: zod_1.z.number().min(0).max(1).default(1).optional(),
});
exports.idSchema = zod_1.z.object({
    id: zod_1.z.number().min(1, "ID must be a positive number"),
});
// For flexible validation
exports.collectionFlexibleSchema = zod_1.z.union([
    exports.collectionSchema,
    zod_1.z.array(exports.collectionSchema),
]);
