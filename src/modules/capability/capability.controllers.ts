import { Request, Response } from "express";
import * as capabilityServices from "./capability.services";
import { capabilitySchema } from "./capability.validations";
import { ZodError } from "zod";
import {
  successResponse,
  errorResponse,
} from "../../globals/utility/apiResponse";

export const createCapability = async (req: Request, res: Response) => {
  try {
    const result = await capabilityServices.createCapability(req.body);

    if (!result) {
      return errorResponse(res, {
        statusCode: 404,
        message: result || "Continent not found",
      });
    }

    return successResponse(res, {
      message: "Created successfully",
      data: result,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Unexpected error",
      details: err.stack,
    });
  }
};
