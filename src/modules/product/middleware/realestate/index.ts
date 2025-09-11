import { Request, Response, NextFunction } from "express";
import { realEstateProductSchema } from "../../validations/realestate";
import { ZodError } from "zod";
import { errorResponse } from "../../../../globals/utility/apiResponse";

export const validateCreate =
  () => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = realEstateProductSchema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        return errorResponse(res, {
          statusCode: 400,
          message: "Validation error",
          details: error.issues,
        });
      }
      return res.status(400).json({
        success: false,
        errors: error.errors ?? error,
      });
    }
  };
