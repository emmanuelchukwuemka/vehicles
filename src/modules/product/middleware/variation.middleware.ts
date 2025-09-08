import { NextFunction, Request, Response } from "express";
import { createVariationSchema } from "../validations/variation.validations";
import { ZodError } from "zod";
import { errorResponse } from "../../../globals/utility/apiResponse";
import { fetchProductsByDomainSchema } from "../validations/baseProduct.validations";

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

export function validateFetchProductsByDomain(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const parsed = fetchProductsByDomainSchema.parse(req.query);
    // Attaching the validated values to request for controller
    (req as any).validatedQuery = parsed;
    next();
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
      details: error.errors,
    });
  }
}
