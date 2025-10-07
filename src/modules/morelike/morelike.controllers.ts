// src/modules/product/product.controller.ts
import { Request, Response } from "express";
import MoreLikeProductService from "./morelike.services";
import { successResponse,errorResponse } from "../../globals/utility/apiResponse";

export const getProductsBySubcategory = async (req: Request, res: Response) => {
  try {
    const { subcategory_id } = req.params;

    if (!subcategory_id) {
      return res.status(400).json({ success: false, message: "subcategory_id is required" });
    }

    const result = await MoreLikeProductService.getProductsBySubcategory(parseInt(subcategory_id));

    if (!result.success)
    return errorResponse(res, {
      statusCode: 404,
      message: result.message,
    });
      return successResponse(res, {
     message: "Products fetched successfully",
     data: result, 
  });
  } catch (error) {
    console.error("Error fetching products:", error);
    return errorResponse(res, {
      statusCode: 404,
      message: "Failed to fetch products",
    });
  }
};
