"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.morelikeSchema = void 0;
const zod_1 = require("zod");
exports.morelikeSchema = zod_1.z.object({
    productId: zod_1.z
        .string()
        .min(1, "Product ID is required")
        .regex(/^\d+$/, "Product ID must be numeric"),
});
