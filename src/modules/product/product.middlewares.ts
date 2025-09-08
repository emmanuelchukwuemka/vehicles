import { Request, Response, NextFunction } from "express";
import {
  productSchema,
  variationSchema,
} from "./validations/product.validations";

import { updateProductVariationSchema } from "./validations/updateProductVariation.validation";
import { baseProductSchema } from "./validations/baseProduct.validations";

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

export const validateProductVariation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = variationSchema.parse(req.body);

    next();
  } catch (err) {
    next(err);
  }
};

export const validateProductUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = updateProductVariationSchema.parse(req.body);

    next();
  } catch (err) {
    next(err);
  }
};
