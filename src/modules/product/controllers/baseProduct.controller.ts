import { Request, Response } from "express";
import { ProductService } from "../services/baseProduct.services";
import {
  errorResponse,
  successResponse,
} from "../../../globals/utility/apiResponse";
import { fetchProductByIdSchema } from "../validations/baseProduct.validations";

export class productController {
  static async createBaseProduct(req: Request, res: Response) {
    try {
      const result = await ProductService.createBaseProduct(req.body);

      if (!result.success) {
        return errorResponse(res, { statusCode: 400, message: result.message });
      }

      return successResponse(res, {
        message: "Product created successfully",
        data: result.data,
      });
    } catch (error: any) {
      console.error("Controller error (createProduct):", error);
      return res.status(500).json({ success: false, details: error.message });
    }
  }

  static async getProductByDomainName(req: Request, res: Response) {
    try {
      const domain = req.params.domain as string;

      const options = {
        includeVariations: req.query.includeVariations !== "false",
        includeMedia: req.query.includeMedia !== "false",
      };

      const result = await ProductService.fetchProductsByDomainName(
        domain,
        options
      );

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

  static async geteBaseProduct(req: Request, res: Response) {
    try {
      const product_id = Number(req.params.id);

      // Options can come from query params
      const options = {
        includeVariations: req.query.includeVariations !== "false",
        includeMedia: req.query.includeMedia !== "false",
      };

      const result = await ProductService.fetchProductById(product_id, options);

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
