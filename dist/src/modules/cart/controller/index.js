"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartController = void 0;
const apiResponse_1 = require("../../../globals/utility/apiResponse");
const services_1 = require("../services");
class cartController {
    static async addItem(req, res) {
        try {
            const validatedData = req.body;
            const result = await services_1.CartService.addItemToCart(validatedData);
            if (!result.success) {
                return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
            }
            return (0, apiResponse_1.successResponse)(res, {
                message: result.message,
                data: result.data,
            });
        }
        catch (error) {
            console.error("Error adding item:", error);
            return res.status(500).json({ success: false, details: error.message });
        }
    }
    static async updateItem(req, res) {
        try {
            const validatedData = req.body;
            const result = await services_1.CartService.updateCartItem(validatedData);
            if (!result.success) {
                return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
            }
            return (0, apiResponse_1.successResponse)(res, {
                message: result.message,
                data: result.data,
            });
        }
        catch (error) {
            console.error("Error updating cart:", error);
            return res.status(500).json({ success: false, details: error.message });
        }
    }
    static async removeItem(req, res) {
        try {
            const validatedData = req.body;
            const result = await services_1.CartService.removeCartItem(validatedData);
            if (!result.success) {
                return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
            }
            return (0, apiResponse_1.successResponse)(res, {
                message: result.message,
            });
        }
        catch (error) {
            console.error("Error removing item:", error);
            return res.status(500).json({ success: false, details: error.message });
        }
    }
    static async getCart(req, res) {
        try {
            const userId = Number(req.query.user_id);
            const result = await services_1.CartService.getCart(userId);
            if (!result.success) {
                return (0, apiResponse_1.errorResponse)(res, {
                    statusCode: 400,
                    message: result.message,
                });
            }
            return (0, apiResponse_1.successResponse)(res, {
                message: result.message,
                data: result.data,
            });
        }
        catch (error) {
            console.error("Error fetching cart:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to fetch cart",
                details: error.message,
            });
        }
    }
    static async clearCart(req, res) {
        try {
            const userId = Number(req.query.user_id);
            const result = await services_1.CartService.clearCart(userId);
            if (!result.success) {
                return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
            }
            return (0, apiResponse_1.successResponse)(res, {
                message: "Cart cleared successfully",
            });
        }
        catch (error) {
            console.error("Error clearing cart:", error);
            return res.status(500).json({ success: false, details: error.message });
        }
    }
}
exports.cartController = cartController;
