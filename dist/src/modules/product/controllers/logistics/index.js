"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logisticsController = void 0;
const apiResponse_1 = require("../../../../globals/utility/apiResponse");
const logistics_1 = require("../../services/logistics");
class logisticsController {
    static async createProduct(req, res) {
        try {
            const validatedData = req.body;
            const result = await logistics_1.LogisticsService.createProduct(validatedData);
            if (!result.success) {
                return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
            }
            return (0, apiResponse_1.successResponse)(res, {
                message: "Service created successfully",
                data: result.data,
            });
        }
        catch (error) {
            console.error("Error creating service product:", error);
            return res.status(500).json({ success: false, details: error.message });
        }
    }
}
exports.logisticsController = logisticsController;
