"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUnitController = exports.ProductController = void 0;
const services_1 = require("../services");
class ProductController {
    static async getSingleProduct(req, res) {
        try {
            // Extract product id
            const productId = Number(req.params.id);
            if (isNaN(productId)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid product ID",
                });
            }
            // Extract options from query
            const options = {
                includeUnits: req.query.includeUnits === "true",
                includeMedia: req.query.includeMedia === "true",
                includeMetadata: req.query.includeMetadata === "true",
                includeSpecifications: req.query.includeSpecifications === "true",
                includeProductMediaMetadata: req.query.includeProductMediaMetadata === "true",
                includeUnitMediaMetadata: req.query.includeUnitMediaMetadata === "true",
                domain: req.query.domain,
                //retailer: req.query.retailer === "true",
            };
            // Call service with productId + options
            const result = await services_1.ProductService.getSingleProduct(productId, options);
            // Handle not found
            if (!result.success) {
                return res.status(404).json(result);
            }
            // Success
            return res.status(200).json(result);
        }
        catch (err) {
            console.error("Error in getSingleProduct controller:", err);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
                error: err.message,
            });
        }
    }
}
exports.ProductController = ProductController;
class ProductUnitController {
    static async getSingleUnit(req, res) {
        try {
            const unitId = Number(req.params.id);
            if (isNaN(unitId)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid unit ID",
                });
            }
            // parse query options
            const options = {
                includeMedia: req.query.includeMedia === "true",
                includeMetadata: req.query.includeMetadata === "true",
            };
            const result = await services_1.ProductUnitService.getSingleUnit(unitId, options);
            if (!result.success) {
                return res.status(404).json(result);
            }
            return res.json(result);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                error: err.message || "Internal server error",
            });
        }
    }
}
exports.ProductUnitController = ProductUnitController;
