"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const baseProduct_services_1 = require("../services/baseProduct.services");
const apiResponse_1 = require("../../../globals/utility/apiResponse");
class productController {
    static async createBaseProduct(req, res) {
        try {
            const result = await baseProduct_services_1.ProductService.createBaseProduct(req.body);
            if (!result.success) {
                return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
            }
            return (0, apiResponse_1.successResponse)(res, {
                message: "Product created successfully",
                data: result.data,
            });
        }
        catch (error) {
            console.error("Controller error (createProduct):", error);
            return res.status(500).json({ success: false, details: error.message });
        }
    }
    static async getProductByDomainName(req, res) {
        try {
            const domain = req.params.domain;
            const options = {
                includeVariations: req.query.includeVariations !== "false",
                includeMedia: req.query.includeMedia !== "false",
            };
            const result = await baseProduct_services_1.ProductService.fetchProductsByDomainName(domain, options);
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
    static async geteBaseProduct(req, res) {
        try {
            const product_id = Number(req.params.id);
            // Options can come from query params
            const options = {
                includeVariations: req.query.includeVariations !== "false",
                includeMedia: req.query.includeMedia !== "false",
            };
            const result = await baseProduct_services_1.ProductService.fetchProductById(product_id, options);
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
exports.productController = productController;
