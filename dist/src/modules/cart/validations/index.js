"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartSchema = exports.clearCartSchema = exports.removeCartItemSchema = exports.updateCartItemSchema = exports.addCartItemSchema = void 0;
const zod_1 = require("zod");
const positiveInt = zod_1.z.number().int().positive();
const nonNegativeInt = zod_1.z.number().int().nonnegative();
exports.addCartItemSchema = zod_1.z.object({
    user_id: positiveInt,
    product_id: positiveInt,
    unit_id: positiveInt.optional(),
    quantity: nonNegativeInt.min(1).default(1),
});
exports.updateCartItemSchema = zod_1.z.object({
    user_id: positiveInt,
    cart_item_id: positiveInt,
    quantity: nonNegativeInt.min(1).optional(),
});
exports.removeCartItemSchema = zod_1.z.object({
    cart_item_id: positiveInt,
    user_id: positiveInt,
});
exports.clearCartSchema = zod_1.z.object({
    user_id: positiveInt,
});
exports.getCartSchema = zod_1.z.object({
    user_id: zod_1.z.number().int().positive(),
});
