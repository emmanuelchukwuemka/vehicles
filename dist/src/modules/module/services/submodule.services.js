"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmoduleService = void 0;
const Submodule_models_1 = require("../model/Submodule.models");
const uuid_1 = require("uuid");
class SubmoduleService {
    static async createSubmodule(data) {
        return Submodule_models_1.Submodule.create({
            ...data,
            code: (0, uuid_1.v4)(),
        });
    }
    static async updateSubmodule(id, data) {
        const submodule = await Submodule_models_1.Submodule.findByPk(id);
        if (!submodule)
            return null;
        return submodule.update(data);
    }
    static async getSubmoduleById(id) {
        return Submodule_models_1.Submodule.findByPk(id, { include: ["module"] });
    }
    static async getAllSubmodules(moduleId) {
        const where = moduleId ? { module_id: moduleId } : undefined;
        return Submodule_models_1.Submodule.findAll({ where, include: ["module"] });
    }
    static async deleteSubmodule(id) {
        const submodule = await Submodule_models_1.Submodule.findByPk(id);
        if (!submodule)
            return null;
        await submodule.destroy();
        return submodule;
    }
}
exports.SubmoduleService = SubmoduleService;
