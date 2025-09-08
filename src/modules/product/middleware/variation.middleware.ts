import { NextFunction, Request, Response } from "express";
import { createVariationSchema } from "../validations/variation.validations";
import { ZodError } from "zod";
import { errorResponse } from "../../../globals/utility/apiResponse";

export const validateProductVariation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = createVariationSchema.parse(req.body);

    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid ID parameter",
        details: err.issues,
      });
    }
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected validation error",
      details: process.env.NODE_ENV === "development" ? err : undefined,
    });
  }
};
