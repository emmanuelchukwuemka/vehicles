import { Request, Response, NextFunction } from "express";
import {
  baseProductSchema,
  fetchProductByIdSchema,
  fetchProductsByDomainSchema,
} from "./validations/baseProduct.validations";

export const validateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = baseProductSchema.parse(req.body);

    next();
  } catch (err) {
    next(err);
  }
};

export const validateProductId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = fetchProductByIdSchema.parse({
      product_id: Number(req.params.id),
    });

    next();
  } catch (err) {
    next(err);
  }
};

export function validateFetchProductsByDomain(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.params);
  console.log(req.query);
  try {
    const parsed = fetchProductsByDomainSchema.parse({
      params: req.params,
      query: req.query,
    });

    // Attach validated values
    (req as any).validatedParams = parsed.params;
    (req as any).validatedQuery = parsed.query;

    next();
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
      details: error.errors,
    });
  }
}
