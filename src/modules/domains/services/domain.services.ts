import { v4 as uuid } from "uuid";
import Domain from "../model/domain.models";
import {
  CreateDomainInput,
  UpdateDomainInput,
} from "../validations/domain.validations";

export class DomainService {
  static async createDomain(data: CreateDomainInput) {
    const existing = await Domain.findOne({ where: { name: data.name } });
    if (existing) {
      return { success: false, message: "This domain already exists" };
    }
    const domainCode = uuid();
    const domain = await Domain.create({
      ...data,
      code: domainCode,
    });

    if (!domain) {
      return { success: false, message: "Unable to create domain" };
    }

    return { success: true, message: "Created successfully", data: domain };
  }

  static async updateDomain(id: number, data: UpdateDomainInput) {
    const domain = await Domain.findByPk(id);
    if (!domain) {
      return { success: false, message: "Domain not found" };
    }

    await domain.update(data);
    return { success: true, message: "Domain updated", data: domain };
  }

  static async getAllDomain() {
    const domain = await Domain.findAll();
    return {
      success: true,
      message: "Domains fetches successfully",
      data: domain,
    };
  }

  static async getDomainById(id: number) {
    const domain = await Domain.findByPk(id);
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
