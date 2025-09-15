import { Request, Response } from "express";
import {
  errorResponse,
  successResponse,
} from "../../../../globals/utility/apiResponse";
import { LogisticsService } from "../../services/logistics";

export class logisticsController {
  static async createProduct(req: Request, res: Response) {
    try {
      const validatedData = req.body;

      const result = await LogisticsService.createProduct(validatedData);

      if (!result.success) {
        return errorResponse(res, { statusCode: 400, message: result.message });
      }
      return successResponse(res, {
        message: "Service created successfully",
        data: result.data,
      });
    } catch (error: any) {
      console.error("Error creating service product:", error);
      return res.status(500).json({ success: false, details: error.message });
    }
  }
}
