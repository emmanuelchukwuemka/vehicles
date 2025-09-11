// controllers/realEstate.controller.ts
import { Request, Response } from "express";
import { RealEstateService } from "../../services/realestate";

import {
  errorResponse,
  successResponse,
} from "../../../../globals/utility/apiResponse";

export class RealEstateController {
  static async createProduct(req: Request, res: Response) {
    try {
      const result = await RealEstateService.createProduct(req.body);

      if (!result.success) {
        return errorResponse(res, { statusCode: 400, message: result.message });
      }

      return successResponse(res, {
        message: result.message,
        data: result.data,
      });
    } catch (error: any) {
      console.error(
        "Validation or service error (createRealEstateProduct):",
        error
      );
      return res
        .status(400)
        .json({ success: false, error: error.errors || error.message });
    }
  }

  static async getProducts(req: Request, res: Response) {
    try {
      const options = {
        includeUnits: req.query.includeUnits !== "false",
        includeMedia: req.query.includeMedia !== "false",
        includeMetadata: req.query.includeMetadata !== "false",
      };

      const result = await RealEstateService.fetchProducts(options);

      if (!result.success) {
        return errorResponse(res, { statusCode: 400, message: result.message });
      }

      return successResponse(res, {
        message: result.message,
        data: result.data,
      });
    } catch (error: any) {
      console.error("Controller error (getRealEstateProducts):", error);
      return res.status(500).json({ success: false, details: error.message });
    }
  }
}
