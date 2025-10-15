import { Request, Response, NextFunction } from "express";
import { capabilitySchema } from "./capability.validations";
import { ZodError } from "zod";
import { errorResponse } from "../../globals/utility/apiResponse";

export const capabilityValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    capabilitySchema.parse(req.body);

    return next();
  } catch (err) {
    if (err instanceof ZodError) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Validation error",
        details: err.issues,
      });
    }
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected validation error",
    });
  }
};
