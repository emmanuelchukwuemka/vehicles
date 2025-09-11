"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retailerController = void 0;
const retailer_1 = require("../../services/retailer");
const apiResponse_1 = require("../../../../globals/utility/apiResponse");
class retailerController {
    static async createProduct(req, res) {
        try {
            const validatedData = req.body;
            const result = await retailer_1.RetailerService.createProduct(validatedData);
            if (!result.success) {
                return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
            }
            return (0, apiResponse_1.successResponse)(res, {
                message: "Product created successfully",
                data: result.data,
            });
        }
        catch (error) {
            console.error("Error creating retailer product:", error);
            return res.status(500).json({ success: false, details: error.message });
        }
    }
    static async getProducts(req, res) {
        try {
            const options = {
                includeUnits: req.query.includeUnits !== "false",
                includeMedia: req.query.includeMedia !== "false",
                includeMetadata: req.query.includeMetadata !== "false",
                includeSpecifications: req.query.includeSpecifications !== "false",
                includeProductMediaMetadata: req.query.includeProductMediaMetadata !== "false",
                includeUnitMediaMetadata: req.query.includeUnitMediaMetadata !== "false",
            };
            const result = await retailer_1.RetailerService.fetchProducts("retailer", options);
            if (!result.success) {
                return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
            }
            return (0, apiResponse_1.successResponse)(res, {
                message: "Product fetched successfully",
                data: result.data,
            });
        }
        catch (error) {
            console.error("Controller error (fetchProduct):", error);
            return res.status(500).json({ success: false, details: error.message });
        }
    }
}
exports.retailerController = retailerController;
