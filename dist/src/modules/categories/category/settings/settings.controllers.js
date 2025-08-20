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
exports.deleteCategory = exports.updateCategory = exports.addCategory = void 0;
const settingsServices = __importStar(require("./settings.services"));
const apiResponse_1 = require("../../../../globals/utility/apiResponse");
const category_validations_1 = require("../category.validations");
const addCategory = async (req, res) => {
    const validatedData = category_validations_1.categoryFlexibleSchema.parse(req.body);
    // Always convert to array for service
    const inputArray = Array.isArray(validatedData)
        ? validatedData
        : [validatedData];
    const result = await settingsServices.createCategory(inputArray);
    if (!result.success) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 400,
            message: result.message || "Failed to create category",
        });
    }
    return (0, apiResponse_1.successResponse)(res, {
        statusCode: 201,
        message: result.message,
        data: result.data,
    });
};
exports.addCategory = addCategory;
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const result = await settingsServices.updateCategory(Number(id), req.body);
    if (!result.success) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 400,
            message: result.message || "Failed to update category",
        });
    }
    return (0, apiResponse_1.successResponse)(res, {
        statusCode: 200,
        message: result.message,
        data: result.data,
    });
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    const result = await settingsServices.deleteCategory(Number(id));
    if (!result.success) {
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 404,
            message: result.message || "Failed to delete category",
        });
    }
    return (0, apiResponse_1.successResponse)(res, {
        statusCode: 200,
        message: result.message,
    });
};
exports.deleteCategory = deleteCategory;
