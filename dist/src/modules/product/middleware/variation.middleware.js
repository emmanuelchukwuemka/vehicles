"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProductVariation = void 0;
exports.validateFetchProductsByDomain = validateFetchProductsByDomain;
const variation_validations_1 = require("../validations/variation.validations");
const zod_1 = require("zod");
const apiResponse_1 = require("../../../globals/utility/apiResponse");
const baseProduct_validations_1 = require("../validations/baseProduct.validations");
const validateProductVariation = (req, res, next) => {
    try {
        req.body = variation_validations_1.createVariationSchema.parse(req.body);
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Invalid ID parameter",
                details: err.issues,
            });
        }
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 500,
            message: "Unexpected validation error",
            details: process.env.NODE_ENV === "development" ? err : undefined,
        });
    }
};
exports.validateProductVariation = validateProductVariation;
function validateFetchProductsByDomain(req, res, next) {
    try {
        const parsed = baseProduct_validations_1.fetchProductsByDomainSchema.parse(req.query);
        // Attaching the validated values to request for controller
        req.validatedQuery = parsed;
        next();
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid request",
            details: error.errors,
        });
    }
}
