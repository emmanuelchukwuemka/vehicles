import { Request, Response } from "express";
import * as productServices from "../services/baseProduct.services";
import { createProduct } from "../product.services";
import {
  errorResponse,
  successResponse,
} from "../../../globals/utility/apiResponse";

export const createBaseProduct = async (req: Request, res: Response) => {
  try {
    const result = await productServices.createBaseProduct(req.body);

    if (!result.success) {
      return errorResponse(res, { statusCode: 400, message: result.message });
    }

    return successResponse(res, {
      message: "Product created successfully",
      data: result.data,
    });
  } catch (error: any) {
    console.error("Controller error (createProduct):", error);
    return res.status(500).json({
      success: false,
      message: "Unexpected error in controller",
      details: error.message,
    });
  }
};
