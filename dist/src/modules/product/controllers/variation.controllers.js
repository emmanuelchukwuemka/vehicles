"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.variationController = void 0;
const variation_service_1 = require("../services/variation.service");
const variationController = async (req, res) => {
    try {
        // Call service to create variation
        const result = await (0, variation_service_1.createVariation)(req.body);
        if (!result.success) {
            return res.status(404).json({
                success: false,
                message: result.message,
                details: result.details,
            });
        }
        return res.status(200).json({
            success: true,
            message: "Variation created successfully",
            data: result.data,
        });
    }
    catch (error) {
        // Zod validation errors
        if (error?.issues) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                details: error.issues,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Unexpected error",
            details: error.message,
        });
    }
};
exports.variationController = variationController;
