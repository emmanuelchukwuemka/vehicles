"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCartInput = void 0;
const zod_1 = require("zod");
const validateCartInput = (schema, source = "body") => (req, res, next) => {
    try {
        const parsed = schema.parse(req[source]);
        req[source] = parsed;
        return next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: error.issues,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
exports.validateCartInput = validateCartInput;
