"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainService = void 0;
const uuid_1 = require("uuid");
const domain_models_1 = __importDefault(require("../model/domain.models"));
class DomainService {
    static async createDomain(data) {
        const existing = await domain_models_1.default.findOne({ where: { name: data.name } });
        if (existing) {
            return { success: false, message: "This domain already exists" };
        }
        const domainCode = (0, uuid_1.v4)();
        const domain = await domain_models_1.default.create({
            ...data,
            code: domainCode,
        });
        if (!domain) {
            return { success: false, message: "Unable to create domain" };
        }
        return { success: true, message: "Created successfully", data: domain };
    }
    static async updateDomain(id, data) {
        const domain = await domain_models_1.default.findByPk(id);
        if (!domain) {
            return { success: false, message: "Domain not found" };
        }
        await domain.update(data);
        return { success: true, message: "Domain updated", data: domain };
    }
    static async getAllDomain() {
        const domain = await domain_models_1.default.findAll();
        return {
            success: true,
            message: "Domains fetches successfully",
            data: domain,
        };
    }
    static async getDomainById(id) {
        const domain = await domain_models_1.default.findByPk(id);
        if (!domain) {
            return { success: false, message: "Domain not found" };
        }
        return {
            success: true,
            data: domain,
            message: "Domain fetches successfully",
        };
    }
}
exports.DomainService = DomainService;
