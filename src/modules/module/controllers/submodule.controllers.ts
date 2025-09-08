import { Request, Response } from "express";
import { SubmoduleService } from "../services/submodule.services";
import {
  createSubmoduleSchema,
  updateSubmoduleSchema,
} from "../validations/submodule.validations";

export class SubmoduleController {
  // Create
  static async create(req: Request, res: Response) {
    try {
      const submodule = await SubmoduleService.createSubmodule(req.body);

      return res.status(200).json({
        success: true,
        message: "Submodule created successfully",
        data: submodule,
      });
    } catch (err: any) {
      if (err.name === "ZodError") {
        return res.status(400).json({ success: false, errors: err.errors });
      }
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // Update
  static async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const parsed = updateSubmoduleSchema.parse(req.body);

      const submodule = await SubmoduleService.updateSubmodule(id, parsed);
      if (!submodule) {
        return res
          .status(404)
          .json({ success: false, message: "Submodule not found" });
      }

      return res.json({
        success: true,
        message: "Submodule updated successfully",
        data: submodule,
      });
    } catch (err: any) {
      if (err.name === "ZodError") {
        return res.status(400).json({ success: false, errors: err.errors });
      }
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // Get by ID
  static async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const submodule = await SubmoduleService.getSubmoduleById(id);

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

      const submodules = await SubmoduleService.getAllSubmodules(moduleId);

      return res.json({ success: true, data: submodules });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  // Delete
  static async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const submodule = await SubmoduleService.deleteSubmodule(id);

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
