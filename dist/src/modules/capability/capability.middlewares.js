"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capabilityValidate = void 0;
const capability_validations_1 = require("./capability.validations");
const zod_1 = require("zod");
const apiResponse_1 = require("../../globals/utility/apiResponse");
const capabilityValidate = (req, res, next) => {
    try {
        capability_validations_1.capabilitySchema.parse(req.body);
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
exports.capabilityValidate = capabilityValidate;
