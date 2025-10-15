import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";

// Simple validation middleware
export const validateCartInput =
  (schema: ZodType, source: "body" | "params" | "query" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[source]); // validate input
      req[source] = parsed; // replace with validated data
      return next(); // continue
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.issues,
        });
      }
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
