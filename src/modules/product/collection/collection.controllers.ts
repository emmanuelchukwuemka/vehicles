import { NextFunction, Request, Response } from "express";
import * as collectionServices from "./collection.services";
import { collectionSchema } from "./collection.validations";
import { ZodError } from "zod";
import {
  successResponse,
  errorResponse,
} from "../../../globals/utility/apiResponse";

export const createCollection = async (req: Request, res: Response) => {
  try {
    const result = await collectionServices.createCollection(req.body);

    if (result) {
      return successResponse(res, {
        message: result.message,
        data: result.data,
      });
    }
  } catch (err: any) {
    if (err instanceof ZodError) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Validation error",
        details: err.issues,
      });
    }

    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected error",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
  return errorResponse(res, {
    statusCode: 500,
    message: "Unexpected error",
  });
};

export const getCollectionsByStore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const storeId = parseInt(req.params.id, 10);
    const result = await collectionServices.getCollectionsByStore(storeId);
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};

export const getCollectionsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10);
    const result = await collectionServices.getCollectionById(id);
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};
