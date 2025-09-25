"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paystactController = void 0;
const apiResponse_1 = require("../../../../globals/utility/apiResponse");
const paystack_1 = require("../../providers/paystack");
class paystactController {
    static async payment(req, res) {
        try {
            const validatedData = req.body;
            const result = await paystack_1.PaystackService.processPayment(validatedData);
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
}
exports.paystactController = paystactController;
