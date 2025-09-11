"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainController = void 0;
const domain_validations_1 = require("../validations/domain.validations");
const domain_services_1 = require("../services/domain.services");
const apiResponse_1 = require("../../../globals/utility/apiResponse");
class DomainController {
    static async createDomain(req, res) {
        try {
            const validatedData = domain_validations_1.createDomainSchema.parse(req.body);
            const result = await domain_services_1.DomainService.createDomain(validatedData);
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
    static async updateDomain(req, res) {
        try {
            const id = Number(req.params.id);
            const validatedData = domain_validations_1.updateDomainSchema.parse(req.body);
            const result = await domain_services_1.DomainService.updateDomain(id, validatedData);
            if (!result.success) {
                return (0, apiResponse_1.errorResponse)(res, { statusCode: 404, message: result.message });
            }
            return (0, apiResponse_1.successResponse)(res, {
                data: result.data,
                message: result.message,
            });
        }
        catch (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
    }
    static async getAllDomain(req, res) {
        try {
            const result = await domain_services_1.DomainService.getAllDomain();
            return (0, apiResponse_1.successResponse)(res, {
                data: result.data,
                message: result.message,
            });
        }
        catch (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
    }
    static async getDomainById(req, res) {
        try {
            const id = Number(req.params.id);
            const result = await domain_services_1.DomainService.getDomainById(id);
            if (!result.success) {
                return (0, apiResponse_1.errorResponse)(res, { statusCode: 404, message: result.message });
            }
            return (0, apiResponse_1.successResponse)(res, {
                data: result.data,
                message: result.message,
            });
        }
        catch (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
    }
}
exports.DomainController = DomainController;
