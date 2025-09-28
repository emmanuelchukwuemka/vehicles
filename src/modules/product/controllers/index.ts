import { Request, Response } from "express";
import { ProductService, ProductUnitService } from "../services";

export class ProductController {
  static async getSingleProduct(req: Request, res: Response) {
    try {
      // Extract product id
      const productId = Number(req.params.id);
      if (isNaN(productId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID",
        });
      }

      // Extract options from query
      const options = {
        includeUnits: req.query.includeUnits === "true",
        includeMedia: req.query.includeMedia === "true",
        includeMetadata: req.query.includeMetadata === "true",
        includeSpecifications: req.query.includeSpecifications === "true",
        includeProductMediaMetadata:
          req.query.includeProductMediaMetadata === "true",
        includeUnitMediaMetadata: req.query.includeUnitMediaMetadata === "true",
        domain: req.query.domain as string | undefined,
        //retailer: req.query.retailer === "true",
      };

      // Call service with productId + options
      const result = await ProductService.getSingleProduct(productId, options);

      // Handle not found
      if (!result.success) {
        return res.status(404).json(result);
      }

      // Success
      return res.status(200).json(result);
    } catch (err: any) {
      console.error("Error in getSingleProduct controller:", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message,
      });
    }
  }
}

export class ProductUnitController {
  static async getSingleUnit(req: Request, res: Response) {
    try {
      const unitId = Number(req.params.id);
      if (isNaN(unitId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid unit ID",
        });
      }

      // parse query options
      const options = {
        includeMedia: req.query.includeMedia === "true",
        includeMetadata: req.query.includeMetadata === "true",
      };

      const result = await ProductUnitService.getSingleUnit(unitId, options);

      if (!result.success) {
        return res.status(404).json(result);
      }

      return res.json(result);
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        error: err.message || "Internal server error",
      });
    }
  }
}
