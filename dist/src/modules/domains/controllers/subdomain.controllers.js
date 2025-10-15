"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubdomainController = void 0;
const subdomain_services_1 = require("../services/subdomain.services");
const subdomian_validations_1 = require("../validations/subdomian.validations");
const apiResponse_1 = require("../../../globals/utility/apiResponse");
class SubdomainController {
    static async create(req, res) {
        try {
            const result = await subdomain_services_1.SubdomainService.createSubdomain(req.body);
            if (!result.success) {
                return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
            }
            return (0, apiResponse_1.successResponse)(res, {
                message: result.message,
                data: result.data,
            });
        }
        catch (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
    }
    static async update(req, res) {
        try {
            const id = Number(req.params.id);
            const parsed = subdomian_validations_1.updateSubdomainSchema.parse(req.body);
            const result = await subdomain_services_1.SubdomainService.updateSubdomain(id, parsed);
            if (!result.success) {
                return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
            }
            return (0, apiResponse_1.successResponse)(res, {
                message: result.message,
                data: result.data,
            });
        }
        catch (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
    }
    static async getById(req, res) {
        try {
            const id = Number(req.params.id);
            const submodule = await subdomain_services_1.SubdomainService.getSubmoduleById(id);
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
    static async getAll(req, res) {
        try {
            const moduleId = req.query.module_id
                ? Number(req.query.module_id)
                : undefined;
            const submodules = await subdomain_services_1.SubdomainService.getAllSubmodules(moduleId);
            return res.json({ success: true, data: submodules });
        }
        catch (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
    }
    static async delete(req, res) {
        try {
            const id = Number(req.params.id);
            const submodule = await subdomain_services_1.SubdomainService.deleteSubmodule(id);
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
exports.SubdomainController = SubdomainController;
