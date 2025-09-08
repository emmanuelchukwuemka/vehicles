"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIdParam = exports.validatesubdomainCreate = exports.validateModuleCreate = exports.moduleSecure = void 0;
const module_validations_1 = require("./validations/module.validations");
const zod_1 = require("zod");
const apiResponse_1 = require("../../globals/utility/apiResponse");
const submodule_validations_1 = require("./validations/submodule.validations");
const moduleSecure = (req, res, next) => {
    try {
        console.log("Middleware executed for module module");
        next();
    }
    catch (err) {
        next(err); // Here am just passing the error to global errorHandler
    }
};
exports.moduleSecure = moduleSecure;
const validateModuleCreate = (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "No fields provided",
            });
        }
        req.body = module_validations_1.createModuleSchema.parse(req.body);
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error",
                details: err.issues,
            });
        }
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected validation error",
        });
    }
};
exports.validateModuleCreate = validateModuleCreate;
const validatesubdomainCreate = (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "No fields provided",
            });
        }
        req.body = submodule_validations_1.createSubmoduleSchema.parse(req.body);
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error",
                details: err.issues,
            });
        }
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected validation error",
        });
    }
};
exports.validatesubdomainCreate = validatesubdomainCreate;
const validateIdParam = (req, res, next) => {
    try {
        module_validations_1.idSchema.parse({ id: Number(req.params.id) });
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Invalid ID parameter",
            });
        }
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected validation error",
        });
    }
};
exports.validateIdParam = validateIdParam;
