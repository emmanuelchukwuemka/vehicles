"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProductId = exports.validateProduct = void 0;
exports.validateFetchProductsByDomain = validateFetchProductsByDomain;
const baseProduct_validations_1 = require("./validations/baseProduct.validations");
const validateProduct = (req, res, next) => {
    try {
        req.body = baseProduct_validations_1.baseProductSchema.parse(req.body);
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.validateProduct = validateProduct;
const validateProductId = (req, res, next) => {
    try {
        req.body = baseProduct_validations_1.fetchProductByIdSchema.parse({
            product_id: Number(req.params.id),
        });
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.validateProductId = validateProductId;
function validateFetchProductsByDomain(req, res, next) {
    console.log(req.params);
    console.log(req.query);
    try {
        const parsed = baseProduct_validations_1.fetchProductsByDomainSchema.parse({
            params: req.params,
            query: req.query,
        });
        // Attach validated values
        req.validatedParams = parsed.params;
        req.validatedQuery = parsed.query;
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
