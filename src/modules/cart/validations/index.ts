import { z } from "zod";

// -----------------------------------------------------
// Base helpers
// -----------------------------------------------------
const positiveInt = z.number().int().positive();
const nonNegativeInt = z.number().int().nonnegative();

// -----------------------------------------------------
// Add Cart Item
// -----------------------------------------------------
// Only the bare minimum comes from the client
export const addCartItemSchema = z.object({
  user_id: positiveInt,
  product_id: positiveInt,
  unit_id: positiveInt.optional(),
  quantity: nonNegativeInt.min(1).default(1),
});
export type AddCartItemInput = z.infer<typeof addCartItemSchema>;

// -----------------------------------------------------
// Update Cart Item
// -----------------------------------------------------
// Client can only change quantity (price & metadata are server-managed now)
export const updateCartItemSchema = z.object({
  user_id: positiveInt,
  cart_item_id: positiveInt,
  quantity: nonNegativeInt.min(1).optional(),
});
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;

// -----------------------------------------------------
// Remove Cart Item
// -----------------------------------------------------
export const removeCartItemSchema = z.object({
  cart_item_id: positiveInt,
  user_id: positiveInt,
});
export type RemoveCartItemInput = z.infer<typeof removeCartItemSchema>;

// -----------------------------------------------------
// Clear Cart
// -----------------------------------------------------
export const clearCartSchema = z.object({
  user_id: positiveInt,
});
export type ClearCartInput = z.infer<typeof clearCartSchema>;

// -----------------------------------------------------
// Get Cart
// -----------------------------------------------------
export const getCartSchema = z.object({
  user_id: z.number().int().positive(),
});
export type GetCartInput = z.infer<typeof getCartSchema>;
