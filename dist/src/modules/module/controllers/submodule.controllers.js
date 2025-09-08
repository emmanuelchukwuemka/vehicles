"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmoduleController = void 0;
const submodule_services_1 = require("../services/submodule.services");
const submodule_validations_1 = require("../validations/submodule.validations");
class SubmoduleController {
    // Create
    static async create(req, res) {
        try {
            const submodule = await submodule_services_1.SubmoduleService.createSubmodule(req.body);
            return res.status(200).json({
                success: true,
                message: "Submodule created successfully",
                data: submodule,
            });
        }
        catch (err) {
            if (err.name === "ZodError") {
                return res.status(400).json({ success: false, errors: err.errors });
            }
            return res.status(500).json({ success: false, message: err.message });
        }
    }
    // Update
    static async update(req, res) {
        try {
            const id = Number(req.params.id);
            const parsed = submodule_validations_1.updateSubmoduleSchema.parse(req.body);
            const submodule = await submodule_services_1.SubmoduleService.updateSubmodule(id, parsed);
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
        }
        catch (err) {
            if (err.name === "ZodError") {
                return res.status(400).json({ success: false, errors: err.errors });
            }
            return res.status(500).json({ success: false, message: err.message });
        }
    }
    // Get by ID
    static async getById(req, res) {
        try {
            const id = Number(req.params.id);
            const submodule = await submodule_services_1.SubmoduleService.getSubmoduleById(id);
            if (!submodule) {
                return res
                    .status(404)
                    .json({ success: false, message: "Submodule not found" });
            }
            return res.json({ success: true, data: submodule });
        }
        catch (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
    }
    // Get all
    static async getAll(req, res) {
        try {
            const moduleId = req.query.module_id
                ? Number(req.query.module_id)
                : undefined;
            const submodules = await submodule_services_1.SubmoduleService.getAllSubmodules(moduleId);
            return res.json({ success: true, data: submodules });
        }
        catch (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
    }
    // Delete
    static async delete(req, res) {
        try {
            const id = Number(req.params.id);
            const submodule = await submodule_services_1.SubmoduleService.deleteSubmodule(id);
            if (!submodule) {
                return res
                    .status(404)
                    .json({ success: false, message: "Submodule not found" });
            }
            return res.json({
                success: true,
                message: "Submodule deleted successfully",
            });
        }
        catch (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
    }
}
exports.SubmoduleController = SubmoduleController;
