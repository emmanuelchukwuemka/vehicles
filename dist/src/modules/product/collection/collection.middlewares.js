"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIdParam = exports.validateCollection = void 0;
const collection_validations_1 = require("./collection.validations");
const zod_1 = require("zod");
const apiResponse_1 = require("../../../globals/utility/apiResponse");
const validateCollection = (req, res, next) => {
    try {
        req.body = collection_validations_1.collectionSchema.parse(req.body);
        return next();
    }
    catch (err) {
        next(err);
    }
};
exports.validateCollection = validateCollection;
const validateIdParam = (req, res, next) => {
    try {
        collection_validations_1.idSchema.parse({ id: Number(req.params.id) });
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
