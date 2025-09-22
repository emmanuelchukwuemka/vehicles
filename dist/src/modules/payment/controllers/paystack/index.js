"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paystactController = void 0;
const apiResponse_1 = require("../../../../globals/utility/apiResponse");
const paystack_1 = require("../../providers/paystack");
class paystactController {
    static async initialize(req, res) {
        try {
            const validatedData = req.body;
            const result = await paystack_1.PaystackService.initialize(validatedData);
            if (!result.success) {
                return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
            }
            return (0, apiResponse_1.successResponse)(res, {
                message: result.message,
                data: result.data,
            });
        }
        catch (error) {
            console.error("Error creating retailer product:", error);
            return res.status(500).json({ success: false, details: error.message });
        }
    }
    static async validatePin(req, res) {
        try {
            const validatedData = req.body;
            const result = await paystack_1.PaystackService.validatePIN(validatedData);
            if (!result.success) {
                return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
            }
            return (0, apiResponse_1.successResponse)(res, {
                message: result.message,
                data: result.data,
            });
        }
        catch (error) {
            console.log("Error validating PIN:", error);
            return res.status(500).json({ success: false, details: error.message });
        }
    }
    static async validateOtp(req, res) {
        try {
            const validatedData = req.body;
            const result = await paystack_1.PaystackService.validateOTP(validatedData);
            if (!result.success) {
                return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
            }
            return (0, apiResponse_1.successResponse)(res, {
                message: result.message,
            });
        }
        catch (error) {
            console.log("Error validating OTP:", error);
            return res.status(500).json({ success: false, details: error.message });
        }
    }
    static async auth_charge(req, res) {
        try {
            const validatedData = req.body;
            const result = await paystack_1.PaystackService.chargeAuthorization(validatedData);
            if (!result.success) {
                return (0, apiResponse_1.errorResponse)(res, { statusCode: 400, message: result.message });
            }
            return (0, apiResponse_1.successResponse)(res, {
                message: result.message,
                data: result.data,
            });
        }
        catch (error) {
            console.log("Error charging_auth:", error);
            return res.status(500).json({ success: false, details: error.message });
        }
    }
}
exports.paystactController = paystactController;
