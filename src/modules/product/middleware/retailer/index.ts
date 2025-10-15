// middlewares/validateRetailerProduct.ts
import { Request, Response, NextFunction } from "express";
import { retailerProductSchema } from "../../validations/retailer";

/**
 * Middleware for validating Retailer product creation request
 */
export const validateRetailerProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = retailerProductSchema.parse(req.body);
    return next();
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: "Invalid product data",
      errors: err.issues || err.message,
    });
  }
};
