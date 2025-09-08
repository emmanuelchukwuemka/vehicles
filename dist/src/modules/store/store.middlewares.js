"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIdParam = exports.storeValidation = void 0;
const store_validations_1 = require("./store.validations");
const zod_1 = require("zod");
const apiResponse_1 = require("../../globals/utility/apiResponse");
const storeValidation = (req, res, next) => {
    try {
        req.body = store_validations_1.storeSchema.parse(req.body);
        next();
    }
    catch (err) {
        next(err); // Here am just passing the error to global errorHandler
    }
};
exports.storeValidation = storeValidation;
const validateIdParam = (req, res, next) => {
    try {
        store_validations_1.idSchema.parse({ id: Number(req.params.id) });
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
            details: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }
};
exports.validateIdParam = validateIdParam;
