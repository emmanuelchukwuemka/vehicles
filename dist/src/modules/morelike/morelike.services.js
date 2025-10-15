"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseProduct_models_1 = require("../product/models/baseProduct.models");
const MoreLikeProductService = {
    async getProductsBySubcategory(subcategory_id) {
        try {
            const products = await baseProduct_models_1.Product.findAll({
                where: { subcategory_id },
                order: [["created_at", "DESC"]],
            });
            return {
                success: true,
                message: "Products fetched successfully",
                data: products,
            };
        }
        catch (error) {
            return { success: false, message: "Failed to fetch products", error };
        }
    },
};
exports.default = MoreLikeProductService;
