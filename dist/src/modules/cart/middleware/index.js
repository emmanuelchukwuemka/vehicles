"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCartInput = void 0;
const zod_1 = require("zod");
// Simple validation middleware
const validateCartInput = (schema, source = "body") => (req, res, next) => {
    try {
        const parsed = schema.parse(req[source]); // validate input
        req[source] = parsed; // replace with validated data
        next(); // continue
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
