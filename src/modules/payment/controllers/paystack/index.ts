import { Request, Response } from "express";

import {
  errorResponse,
  successResponse,
} from "../../../../globals/utility/apiResponse";
import { PaystackService } from "../../providers/paystack";

export class paystactController {
  static async initialize(req: Request, res: Response) {
    try {
      const validatedData = req.body;

      const result = await PaystackService.initialize(validatedData);

      if (!result.success) {
        return errorResponse(res, { statusCode: 400, message: result.message });
      }
      return successResponse(res, {
        message: result.message,
        data: result.data,
      });
    } catch (error: any) {
      console.error("Error creating retailer product:", error);
      return res.status(500).json({ success: false, details: error.message });
    }
  }

  static async validatePin(req: Request, res: Response) {
    try {
      const validatedData = req.body;

      const result = await PaystackService.validatePIN(validatedData);

      if (!result.success) {
        return errorResponse(res, { statusCode: 400, message: result.message });
      }
      return successResponse(res, {
        message: result.message,
        data: result.data,
      });
    } catch (error: any) {
      console.log("Error validating PIN:", error);
      return res.status(500).json({ success: false, details: error.message });
    }
  }

  static async validateOtp(req: Request, res: Response) {
    try {
      const validatedData = req.body;

      const result = await PaystackService.validateOTP(validatedData);

      if (!result.success) {
        return errorResponse(res, { statusCode: 400, message: result.message });
      }
      return successResponse(res, {
        message: result.message,
      });
    } catch (error: any) {
      console.log("Error validating OTP:", error);
      return res.status(500).json({ success: false, details: error.message });
    }
  }

  static async auth_charge(req: Request, res: Response) {
    try {
      const validatedData = req.body;

      const result = await PaystackService.chargeAuthorization(validatedData);

      if (!result.success) {
        return errorResponse(res, { statusCode: 400, message: result.message });
      }
      return successResponse(res, {
        message: result.message,
        data: result.data,
      });
    } catch (error: any) {
      console.log("Error charging_auth:", error);
      return res.status(500).json({ success: false, details: error.message });
    }
  }
}
