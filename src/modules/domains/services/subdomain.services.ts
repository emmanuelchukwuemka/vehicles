import { v4 as uuid } from "uuid";
import {
  CreateSubdomainInput,
  UpdateSubdomainInput,
} from "../validations/subdomian.validations";
import { Subdomain } from "../model/subdomain.models";
import Domain from "../model/domain.models";

export class SubdomainService {
  static async createSubdomain(data: CreateSubdomainInput) {
    const domain = await Domain.findByPk(data.domain_id);
    if (!domain) {
      return { success: false, message: "Domain not found" };
    }
    const existing = await Subdomain.findOne({ where: { name: data.name } });
    if (existing) {
      return { success: false, message: "This sub-domain already exists" };
    }

    const subdomain = Subdomain.create({ ...data, code: uuid() });
    if (!subdomain) {
      return { success: false, message: "Unable to create sub-domain" };
    }
    return { success: true, message: "Created successfully", data: subdomain };
  }

  static async updateSubdomain(id: number, data: UpdateSubdomainInput) {
    const subdomain = await Subdomain.findByPk(id);
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

  static async getSubmoduleById(id: number) {
    return Subdomain.findByPk(id, { include: ["module"] });
  }

  static async getAllSubmodules(moduleId?: number) {
    const where = moduleId ? { module_id: moduleId } : undefined;
    return Subdomain.findAll({ where, include: ["module"] });
  }

  static async deleteSubmodule(id: number) {
    const subdomain = await Subdomain.findByPk(id);
    if (!subdomain) return null;
    await subdomain.destroy();
    return subdomain;
  }
}
