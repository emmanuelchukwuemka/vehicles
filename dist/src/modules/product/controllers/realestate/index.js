"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealEstateController = void 0;
const realestate_1 = require("../../services/realestate");
const apiResponse_1 = require("../../../../globals/utility/apiResponse");
class RealEstateController {
    static async createProduct(req, res) {
        try {
            const result = await realestate_1.RealEstateService.createProduct(req.body);
            if (!result.success) {
                return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
            }
            return (0, apiResponse_1.successResponse)(res, {
                message: result.message,
                data: result.data,
            });
        }
        catch (error) {
            console.error("Validation or service error (createRealEstateProduct):", error);
            return res
                .status(400)
                .json({ success: false, error: error.errors || error.message });
        }
    }
    static async getProducts(req, res) {
        try {
            const options = {
                includeUnits: req.query.includeUnits !== "false",
                includeMedia: req.query.includeMedia !== "false",
                includeMetadata: req.query.includeMetadata !== "false",
            };
            const result = await realestate_1.RealEstateService.fetchProducts(options);
            if (!result.success) {
                return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
            }
            return (0, apiResponse_1.successResponse)(res, {
                message: result.message,
                data: result.data,
            });
        }
        catch (error) {
            console.error("Controller error (getRealEstateProducts):", error);
            return res.status(500).json({ success: false, details: error.message });
        }
    }
}
exports.RealEstateController = RealEstateController;
