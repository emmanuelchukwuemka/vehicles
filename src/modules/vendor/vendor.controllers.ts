import { Request, Response } from "express";
import * as vendorServices from "./vendor.services";
import {
  successResponse,
  errorResponse,
} from "../../globals/utility/apiResponse";

export const createVendor = async (req: Request, res: Response) => {
  try {
    const result = await vendorServices.createVendor(req.body);

    if (!result.success) {
      return errorResponse(res, {
        statusCode: result.statusCode,
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

export const suspendVendor = async (req: Request, res: Response) => {
  try {
    const result = await vendorServices.suspendVendor(req.body);

    if (!result.success) {
      return errorResponse(res, {
        message: result.message,
      });
    }

    return successResponse(res, {
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
