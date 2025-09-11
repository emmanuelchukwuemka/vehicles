"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreate = void 0;
const realestate_1 = require("../../validations/realestate");
const zod_1 = require("zod");
const apiResponse_1 = require("../../../../globals/utility/apiResponse");
const validateCreate = () => (req, res, next) => {
    try {
        req.body = realestate_1.realEstateProductSchema.parse(req.body);
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
exports.validateCreate = validateCreate;
