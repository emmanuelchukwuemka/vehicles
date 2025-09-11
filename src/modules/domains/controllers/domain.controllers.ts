import { Request, Response } from "express";
import {
  createDomainSchema,
  updateDomainSchema,
} from "../validations/domain.validations";
import { DomainService } from "../services/domain.services";
import {
  errorResponse,
  successResponse,
} from "../../../globals/utility/apiResponse";

export class DomainController {
  static async createDomain(req: Request, res: Response) {
    try {
      const validatedData = createDomainSchema.parse(req.body);
      const result = await DomainService.createDomain(validatedData);

      if (!result.success) {
        return errorResponse(res, { statusCode: 400, message: result.message });
      }

      return successResponse(res, {
        message: result.message,
        data: result.data,
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  static async updateDomain(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const validatedData = updateDomainSchema.parse(req.body);
      const result = await DomainService.updateDomain(id, validatedData);

      if (!result.success) {
        return errorResponse(res, { statusCode: 404, message: result.message });
      }

      return successResponse(res, {
        data: result.data,
        message: result.message,
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  static async getAllDomain(req: Request, res: Response) {
    try {
      const result = await DomainService.getAllDomain();
      return successResponse(res, {
        data: result.data,
        message: result.message,
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  static async getDomainById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await DomainService.getDomainById(id);

      if (!result.success) {
        return errorResponse(res, { statusCode: 404, message: result.message });
      }

      return successResponse(res, {
        data: result.data,
        message: result.message,
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
}
