import { Request, Response } from "express";
import {
  createModuleSchema,
  updateModuleSchema,
} from "../validations/module.validations";
import * as moduleServices from "../services/module.services";
import {
  errorResponse,
  successResponse,
} from "../../../globals/utility/apiResponse";

export const createModule = async (req: Request, res: Response) => {
  try {
    const validatedData = createModuleSchema.parse(req.body);
    const result = await moduleServices.createModule(validatedData);

    if (!result.success) {
      return errorResponse(res, { statusCode: 400, message: result.message });
    }

    return successResponse(res, {
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Failed to create module",
      details: err.message,
    });
  }
};

export const updateModule = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const validatedData = updateModuleSchema.parse(req.body);
    const result = await moduleServices.updateModule(id, validatedData);

    if (!result.success) {
      return errorResponse(res, { statusCode: 404, message: result.message });
    }

    return successResponse(res, {
      statusCode: 200,
      message: result.message,
      data: result.data,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Failed to update module",
      details: err.message,
    });
  }
};

export const getAllModulesController = async (req: Request, res: Response) => {
  try {
    const result = await moduleServices.getAllModules();
    return successResponse(res, {
      statusCode: 200,
      data: result.data,
      message: result.message,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Failed to fetch modules",
      details: err.message,
    });
  }
};

export const getModuleById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await moduleServices.getModuleById(id);

    if (!result.success) {
      return errorResponse(res, { statusCode: 404, message: result.message });
    }

    return successResponse(res, {
      statusCode: 200,
      data: result.data,
      message: result.message,
    });
  } catch (err: any) {
    return errorResponse(res, {
      statusCode: 500,
      message: "Failed to fetch module",
      details: err.message,
    });
  }
};
