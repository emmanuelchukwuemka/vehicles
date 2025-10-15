"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsBySubcategory = void 0;
const morelike_services_1 = __importDefault(require("./morelike.services"));
const apiResponse_1 = require("../../globals/utility/apiResponse");
const getProductsBySubcategory = async (req, res) => {
    try {
        const { subcategory_id } = req.params;
        if (!subcategory_id) {
            return res.status(400).json({ success: false, message: "subcategory_id is required" });
        }
        const result = await morelike_services_1.default.getProductsBySubcategory(parseInt(subcategory_id));
        if (!result.success)
            return (0, apiResponse_1.errorResponse)(res, {
                statusCode: 404,
                message: result.message,
            });
        return (0, apiResponse_1.successResponse)(res, {
            message: "Products fetched successfully",
            data: result,
        });
    }
    catch (error) {
        console.error("Error fetching products:", error);
        return (0, apiResponse_1.errorResponse)(res, {
            statusCode: 404,
            message: "Failed to fetch products",
        });
    }
};
exports.getProductsBySubcategory = getProductsBySubcategory;
