"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubdomainService = void 0;
const uuid_1 = require("uuid");
const subdomain_models_1 = require("../model/subdomain.models");
const domain_models_1 = __importDefault(require("../model/domain.models"));
class SubdomainService {
    static async createSubdomain(data) {
        const domain = await domain_models_1.default.findByPk(data.domain_id);
        if (!domain) {
            return { success: false, message: "Domain not found" };
        }
        const existing = await subdomain_models_1.Subdomain.findOne({ where: { name: data.name } });
        if (existing) {
            return { success: false, message: "This sub-domain already exists" };
        }
        const subdomain = subdomain_models_1.Subdomain.create({ ...data, code: (0, uuid_1.v4)() });
        if (!subdomain) {
            return { success: false, message: "Unable to create sub-domain" };
        }
        return { success: true, message: "Created successfully", data: subdomain };
    }
    static async updateSubdomain(id, data) {
        const subdomain = await subdomain_models_1.Subdomain.findByPk(id);
        if (!subdomain) {
            return { success: false, message: "sub-domain not found" };
        }
        const updateSubdomain = subdomain.update(data);
        if (!updateSubdomain) {
            return { success: false, message: "Unable to update sub-domain" };
        }
        return {
            success: true,
            message: "Updated successfully",
            data: updateSubdomain,
        };
    }
    static async getSubmoduleById(id) {
        return subdomain_models_1.Subdomain.findByPk(id, { include: ["module"] });
    }
    static async getAllSubmodules(moduleId) {
        const where = moduleId ? { module_id: moduleId } : undefined;
        return subdomain_models_1.Subdomain.findAll({ where, include: ["module"] });
    }
    static async deleteSubmodule(id) {
        const subdomain = await subdomain_models_1.Subdomain.findByPk(id);
        if (!subdomain)
            return null;
        await subdomain.destroy();
        return subdomain;
    }
}
exports.SubdomainService = SubdomainService;
