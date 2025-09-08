import { Request, Response } from "express";
import * as productServices from "./product.services";
import { ZodError } from "zod";
import {
  successResponse,
  errorResponse,
} from "../../globals/utility/apiResponse";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const result = await productServices.createProduct(req.body);

    if (!result.success) {
      return errorResponse(res, {
        statusCode: 400,
        message: result.message,
      });
    }
    return successResponse(res, {
      message: "Product created successfully",
      data: result.data,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected error",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

export const createVariation = async (req: Request, res: Response) => {
  try {
    const result = await productServices.createProductVariation(req.body);

    if (!result.success) {
      return errorResponse(res, {
        statusCode: 404,
        message: result.message,
      });
    }

    return successResponse(res, {
      statusCode: 201,
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected error",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

export const addAttributes = async (req: Request, res: Response) => {
  try {
    const result = await productServices.addAttributesToVariation(req.body);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (err: any) {
    if (err?.issues) {
      // Zod validation errors
      return res.status(400).json({ success: false, errors: err.issues });
    }
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProductVariation = async (req: Request, res: Response) => {
  try {
    const result = await productServices.updateProductAndVariation(req.body);

    if (!result.success) {
      return errorResponse(res, {
        statusCode: 400,
        message: result.message || "Update failed",
        details: result.error,
      });
    }

    return successResponse(res, {
      statusCode: 200,
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Validation error",
        details: err.issues,
      });
    }
    console.error(err);
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected error",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};
