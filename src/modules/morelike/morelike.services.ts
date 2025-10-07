// src/modules/product/product.service.ts
import {Product} from "../product/models/baseProduct.models"

const MoreLikeProductService = {
  async getProductsBySubcategory(subcategory_id: number) {

    try {
      const products = await Product.findAll({
        where: { subcategory_id },
        order: [["created_at", "DESC"]],
      });
  return {
      success: true,
      message: "Products fetched successfully",
      data: products,
    };
  } catch (error: any) {
    return { success: false, message: "Failed to fetch products", error };
  }
  },
};

export default MoreLikeProductService;
