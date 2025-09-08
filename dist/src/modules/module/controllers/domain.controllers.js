"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModuleById = exports.getAllModulesController = exports.updateModule = exports.createModule = void 0;
const module_validations_1 = require("../validations/module.validations");
const moduleServices = __importStar(require("../services/module.services"));
const apiResponse_1 = require("../../../globals/utility/apiResponse");
const createModule = async (req, res) => {
    try {
        const validatedData = module_validations_1.createModuleSchema.parse(req.body);
        const result = await moduleServices.createModule(validatedData);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, {
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Failed to create module",
            details: err.message,
        });
    }
};
exports.createModule = createModule;
const updateModule = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const validatedData = module_validations_1.updateModuleSchema.parse(req.body);
        const result = await moduleServices.updateModule(id, validatedData);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 404, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, {
            statusCode: 200,
            message: result.message,
            data: result.data,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Failed to update module",
            details: err.message,
        });
    }
};
exports.updateModule = updateModule;
const getAllModulesController = async (req, res) => {
    try {
        const result = await moduleServices.getAllModules();
        return (0, apiResponse_1.successResponse)(res, {
            statusCode: 200,
            data: result.data,
            message: result.message,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Failed to fetch modules",
            details: err.message,
        });
    }
};
exports.getAllModulesController = getAllModulesController;
const getModuleById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const result = await moduleServices.getModuleById(id);
        if (!result.success) {
            return (0, apiResponse_1.errorResponse)(res, { statusCode: 404, message: result.message });
        }
        return (0, apiResponse_1.successResponse)(res, {
            statusCode: 200,
            data: result.data,
            message: result.message,
        });
    }
    catch (err) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Failed to fetch module",
            details: err.message,
        });
    }
};
exports.getModuleById = getModuleById;
