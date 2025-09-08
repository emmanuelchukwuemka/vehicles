import { Request, Response, NextFunction } from "express";
import { createModuleSchema, idSchema } from "./validations/module.validations";
import { ZodError } from "zod";
import { errorResponse } from "../../globals/utility/apiResponse";
import { createSubmoduleSchema } from "./validations/submodule.validations";

export const moduleSecure = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Middleware executed for module module");

    next();
  } catch (err) {
    next(err); // Here am just passing the error to global errorHandler
  }
};

export const validateModuleCreate = (
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

    req.body = createModuleSchema.parse(req.body);
    next();
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

    req.body = createSubmoduleSchema.parse(req.body);
    next();
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
    next();
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
