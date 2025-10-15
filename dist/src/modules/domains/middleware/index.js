"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIdParam = exports.validatesubdomainCreate = exports.validateDomainCreate = void 0;
const domain_validations_1 = require("../validations/domain.validations");
const zod_1 = require("zod");
const apiResponse_1 = require("../../../globals/utility/apiResponse");
const subdomian_validations_1 = require("../validations/subdomian.validations");
const validateDomainCreate = (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "No fields provided",
            });
        }
        req.body = domain_validations_1.createDomainSchema.parse(req.body);
        return next();
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
exports.validateDomainCreate = validateDomainCreate;
const validatesubdomainCreate = (req, res, next) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "No fields provided",
            });
        }
        req.body = subdomian_validations_1.createSubdomainSchema.parse(req.body);
        return next();
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
        domain_validations_1.idSchema.parse({ id: Number(req.params.id) });
        return next();
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
