import { Request, Response, NextFunction } from "express";
import {
  createVendorSchema,
  updateVendorStatusSchema,
} from "./vendor.validations";
import { ZodError } from "zod";
import { errorResponse } from "../../globals/utility/apiResponse";

export const createVendorValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = createVendorSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

export const validateUpate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    updateVendorStatusSchema.parse(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
