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

  static async getServices(req: Request, res: Response) {
    try {
      const options = {
        includeUnits: req.query.includeUnits !== "false",
        includeMedia: req.query.includeMedia !== "false",
        includeMetadata: req.query.includeMetadata !== "false",
        includeSpecifications: req.query.includeSpecifications !== "false",
        includeProductMediaMetadata:
          req.query.includeProductMediaMetadata !== "false",
        includeUnitMediaMetadata:
          req.query.includeUnitMediaMetadata !== "false",
      };

      const result = await LogisticsService.fetchProducts("logistic", options);

      if (!result.success) {
        return errorResponse(res, { statusCode: 400, message: result.message });
      }

      return successResponse(res, {
        message: "Services fetched successfully",
        data: result.data,
      });
    } catch (error: any) {
      console.error("Controller error (fetchProduct):", error);
      return res.status(500).json({ success: false, details: error.message });
    }
  }
}
