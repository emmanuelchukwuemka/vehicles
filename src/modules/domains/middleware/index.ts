import { Request, Response, NextFunction } from "express";
import {
  createDomainSchema,
  idSchema,
} from "../validations/domain.validations";
import { ZodError } from "zod";
import { errorResponse } from "../../../globals/utility/apiResponse";
import { createSubdomainSchema } from "../validations/subdomian.validations";

export const validateDomainCreate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return errorResponse(res, {
        statusCode: 400,
        message: "No fields provided",
      });
    }

    req.body = createDomainSchema.parse(req.body);
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

export const validatesubdomainCreate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return errorResponse(res, {
        statusCode: 400,
        message: "No fields provided",
      });
    }

    req.body = createSubdomainSchema.parse(req.body);
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

export const validateIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    idSchema.parse({ id: Number(req.params.id) });
    return next();
  } catch (err) {
    if (err instanceof ZodError) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid ID parameter",
      });
    }
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected validation error",
    });
  }
};
