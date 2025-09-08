import { Request, Response } from "express";
import * as storeServices from "./store.services";
import {
  successResponse,
  errorResponse,
} from "../../globals/utility/apiResponse";

export const createStore = async (req: Request, res: Response) => {
  try {
    const result = await storeServices.createStore(req.body);

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
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};

export const getStoreWithScopes = async (req: Request, res: Response) => {
  const storeId = Number(req.params.id);
  const result = await storeServices.getStoreWithScopes(storeId);

  if (!result.success) {
    return errorResponse(res, {
      statusCode: result.statusCode,
      message: result.message,
    });
  }
  return successResponse(res, {
    message: result.message,
    data: result.data,
  });
};
