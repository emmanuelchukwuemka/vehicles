"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModuleById = exports.getAllModules = exports.updateModule = exports.createModule = void 0;
const uuid_1 = require("uuid");
const module_models_1 = __importDefault(require("../model/module.models"));
const createModule = async (data) => {
    const existing = await module_models_1.default.findOne({ where: { name: data.name } });
    if (existing) {
        return { success: false, message: "This module already exists" };
    }
    const moduleCode = (0, uuid_1.v4)();
    const module = await module_models_1.default.create({
        ...data,
        code: moduleCode,
    });
    if (!module) {
        return { success: false, message: "Unable to create module" };
    }
    return { success: true, message: "Created successfully", data: module };
};
exports.createModule = createModule;
const updateModule = async (id, data) => {
    const module = await module_models_1.default.findByPk(id);
    if (!module) {
        return { success: false, message: "Module not found" };
    }
    await module.update(data);
    return { success: true, message: "Module updated", data: module };
};
exports.updateModule = updateModule;
const getAllModules = async () => {
    const modules = await module_models_1.default.findAll();
    return {
        success: true,
        message: "Modules fetches successfully",
        data: modules,
    };
};
exports.getAllModules = getAllModules;
const getModuleById = async (id) => {
    const module = await module_models_1.default.findByPk(id);
    if (!module) {
        return { success: false, message: "Module not found" };
    }
    return {
        success: true,
        data: module,
        message: "Module fetches successfully",
    };
};
exports.getModuleById = getModuleById;
