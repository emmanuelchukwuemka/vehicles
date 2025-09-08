import { Request, Response } from "express";
import { createVariation } from "../services/variation.service";

export const variationController = async (req: Request, res: Response) => {
  try {
    // Call service to create variation
    const result = await createVariation(req.body);

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
  } catch (error: any) {
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
