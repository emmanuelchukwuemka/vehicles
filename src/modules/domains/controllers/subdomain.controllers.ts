import { Request, Response } from "express";
import { SubdomainService } from "../services/subdomain.services";
import { updateSubdomainSchema } from "../validations/subdomian.validations";
import {
  errorResponse,
  successResponse,
} from "../../../globals/utility/apiResponse";

export class SubdomainController {
  static async create(req: Request, res: Response) {
    try {
      const result = await SubdomainService.createSubdomain(req.body);
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

  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const parsed = updateSubdomainSchema.parse(req.body);
      const result = await SubdomainService.updateSubdomain(id, parsed);
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

  // Get by ID
  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const submodule = await SubdomainService.getSubmoduleById(id);

      if (!submodule) {
        return res
          .status(404)
          .json({ success: false, message: "Submodule not found" });
      }

      return res.json({ success: true, data: submodule });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // Get all
  static async getAll(req: Request, res: Response) {
    try {
      const moduleId = req.query.module_id
        ? Number(req.query.module_id)
        : undefined;

      const submodules = await SubdomainService.getAllSubmodules(moduleId);

      return res.json({ success: true, data: submodules });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // Delete
  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const submodule = await SubdomainService.deleteSubmodule(id);

      if (!submodule) {
        return res
          .status(404)
          .json({ success: false, message: "Submodule not found" });
      }

      return res.json({
        success: true,
        message: "Submodule deleted successfully",
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
}
