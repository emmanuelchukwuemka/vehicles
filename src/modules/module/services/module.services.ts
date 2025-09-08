import { v4 as uuid } from "uuid";
import Module from "../model/module.models";
import {
  CreateModuleInput,
  UpdateModuleInput,
} from "../validations/module.validations";

export const createModule = async (data: CreateModuleInput) => {
  const existing = await Module.findOne({ where: { name: data.name } });
  if (existing) {
    return { success: false, message: "This module already exists" };
  }
  const moduleCode = uuid();
  const module = await Module.create({
    ...data,
    code: moduleCode,
  });

  if (!module) {
    return { success: false, message: "Unable to create module" };
  }
  return { success: true, message: "Created successfully", data: module };
};

export const updateModule = async (id: number, data: UpdateModuleInput) => {
  const module = await Module.findByPk(id);
  if (!module) {
    return { success: false, message: "Module not found" };
  }

  await module.update(data);
  return { success: true, message: "Module updated", data: module };
};

export const getAllModules = async () => {
  const modules = await Module.findAll();
  return {
    success: true,
    message: "Modules fetches successfully",
    data: modules,
  };
};

export const getModuleById = async (id: number) => {
  const module = await Module.findByPk(id);
  if (!module) {
    return { success: false, message: "Module not found" };
  }
  return {
    success: true,
    data: module,
    message: "Module fetches successfully",
  };
};
