import { Request, Response } from "express";
import {
  errorResponse,
  successResponse,
} from "../../../globals/utility/apiResponse";
import { CartService } from "../services";

export class cartController {
  static async addItem(req: Request, res: Response) {
    try {
      const validatedData = req.body;

      const result = await CartService.addItemToCart(validatedData);

      if (!result.success) {
        return errorResponse(res, { statusCode: 400, message: result.message });
      }
      return successResponse(res, {
        message: result.message,
        data: result.data,
      });
    } catch (error: any) {
      console.error("Error adding item:", error);
      return res.status(500).json({ success: false, details: error.message });
    }
  }

  static async updateItem(req: Request, res: Response) {
    try {
      const validatedData = req.body;

      const result = await CartService.updateCartItem(validatedData);

      if (!result.success) {
        return errorResponse(res, { statusCode: 400, message: result.message });
      }
      return successResponse(res, {
        message: result.message,
        data: result.data,
      });
    } catch (error: any) {
      console.error("Error updating cart:", error);
      return res.status(500).json({ success: false, details: error.message });
    }
  }

  static async removeItem(req: Request, res: Response) {
    try {
      const validatedData = req.body;

      const result = await CartService.removeCartItem(validatedData);

      if (!result.success) {
        return errorResponse(res, { statusCode: 400, message: result.message });
      }
      return successResponse(res, {
        message: result.message,
      });
    } catch (error: any) {
      console.error("Error removing item:", error);
      return res.status(500).json({ success: false, details: error.message });
    }
  }

  static async getCart(req: Request, res: Response) {
    try {
      const userId = Number(req.query.user_id);

      const result = await CartService.getCart(userId);

      if (!result.success) {
        return errorResponse(res, {
          statusCode: 400,
          message: result.message,
        });
      }

      return successResponse(res, {
        message: result.message,
        data: result.data,
      });
    } catch (error: any) {
      console.error("Error fetching cart:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch cart",
        details: error.message,
      });
    }
  }

  static async clearCart(req: Request, res: Response) {
    try {
      const userId = Number(req.query.user_id);

      const result = await CartService.clearCart(userId);

      if (!result.success) {
        return errorResponse(res, { statusCode: 400, message: result.message });
      }
      return successResponse(res, {
        message: "Cart cleared successfully",
      });
    } catch (error: any) {
      console.error("Error clearing cart:", error);
      return res.status(500).json({ success: false, details: error.message });
    }
  }
}
