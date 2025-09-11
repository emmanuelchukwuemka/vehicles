import { Request, Response } from "express";
import { RetailerService } from "../../services/retailer";
import {
  errorResponse,
  successResponse,
} from "../../../../globals/utility/apiResponse";

export class retailerController {
  static async createProduct(req: Request, res: Response) {
    try {
      const validatedData = req.body;

      const result = await RetailerService.createProduct(validatedData);

      if (!result.success) {
        return errorResponse(res, { statusCode: 400, message: result.message });
      }
      return successResponse(res, {
        message: "Product created successfully",
        data: result.data,
      });
    } catch (error: any) {
      console.error("Error creating retailer product:", error);
      return res.status(500).json({ success: false, details: error.message });
    }
  }

  static async getProducts(req: Request, res: Response) {
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

      const result = await RetailerService.fetchProducts("retailer", options);

      if (!result.success) {
        return errorResponse(res, { statusCode: 400, message: result.message });
      }

      return successResponse(res, {
        message: "Product fetched successfully",
        data: result.data,
      });
    } catch (error: any) {
      console.error("Controller error (fetchProduct):", error);
      return res.status(500).json({ success: false, details: error.message });
    }
  }
}
