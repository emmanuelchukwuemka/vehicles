import { Request, Response, NextFunction } from "express";
import { collectionSchema, idSchema } from "./collection.validations";
import { ZodError } from "zod";
import { errorResponse } from "../../../globals/utility/apiResponse";

export const validateCollection = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = collectionSchema.parse(req.body);
    return next();
  } catch (err) {
    next(err);
  }
};

export const validateIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    idSchema.parse({ id: Number(req.params.id) });
    return next();
  } catch (err) {
    if (err instanceof ZodError) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid ID parameter",
      });
    }
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected validation error",
    });
  }
};
