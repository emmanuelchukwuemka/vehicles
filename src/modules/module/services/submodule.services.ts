import { Submodule } from "../model/Submodule.models";
import {
  CreateSubmoduleInput,
  UpdateSubmoduleInput,
} from "../validations/submodule.validations";
import { v4 as uuid } from "uuid";

export class SubmoduleService {
  static async createSubmodule(data: CreateSubmoduleInput) {
    return Submodule.create({
      ...data,
      code: uuid(),
    });
  }

  static async updateSubmodule(id: number, data: UpdateSubmoduleInput) {
    const submodule = await Submodule.findByPk(id);
    if (!submodule) return null;
    return submodule.update(data);
  }

  static async getSubmoduleById(id: number) {
    return Submodule.findByPk(id, { include: ["module"] });
  }

  static async getAllSubmodules(moduleId?: number) {
    const where = moduleId ? { module_id: moduleId } : undefined;
    return Submodule.findAll({ where, include: ["module"] });
  }

  static async deleteSubmodule(id: number) {
    const submodule = await Submodule.findByPk(id);
    if (!submodule) return null;
    await submodule.destroy();
    return submodule;
  }
}
