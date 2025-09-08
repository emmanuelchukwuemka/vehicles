import { Request, Response, NextFunction } from "express";
import { idSchema, storeSchema } from "./store.validations";
import { ZodError } from "zod";
import { errorResponse } from "../../globals/utility/apiResponse";

export const storeValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = storeSchema.parse(req.body);
    next();
  } catch (err) {
    next(err); // Here am just passing the error to global errorHandler
  }
};

export const validateIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    idSchema.parse({ id: Number(req.params.id) });
    next();
  } catch (err: any) {
    if (err instanceof ZodError) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid ID parameter",
      });
    }
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected validation error",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};
