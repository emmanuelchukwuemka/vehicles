"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogisticsProduct = void 0;
const logistics_1 = require("../../validations/logistics");
const zod_1 = require("zod");
const apiResponse_1 = require("../../../../globals/utility/apiResponse");
const validateLogisticsProduct = (req, res, next) => {
    try {
        logistics_1.logisticsProductSchema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 400,
                message: "Validation error",
                details: error.issues,
            });
        }
        return res.status(400).json({
            success: false,
            errors: error.errors ?? error,
        });
    }
};
exports.validateLogisticsProduct = validateLogisticsProduct;
