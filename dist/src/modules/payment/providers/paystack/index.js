"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaystackService = void 0;
const axios_1 = __importDefault(require("axios"));
class PaystackService {
    static async initialize(data) {
        const { email, amount, card_number, cvv, expiry_month, expiry_year, mode, cardholder_name, } = data;
        // Basic checks
        if (!email || !amount) {
            return {
                success: false,
                message: "Please provide both email and amount.",
            };
        }
        if (!card_number || !cvv || !expiry_month || !expiry_year) {
            return {
                success: false,
                message: "Please fill in all required card fields.",
            };
        }
        const secretkey = mode === "test"
            ? process.env.PAYSTACK_TEST_SECRET_KEY
            : process.env.PAYSTACK_SECRET_KEY;
        try {
            const response = await axios_1.default.post("https://api.paystack.co/charge", {
                card: {
                    number: card_number,
                    cvv,
                    expiry_month,
                    expiry_year,
                },
                email,
                currency: "NGN",
                channels: ["card"],
                amount: Number(amount) * 100,
                metadata: {
                    cardholder_name,
                },
            }, {
                headers: {
                    Authorization: `Bearer ${secretkey}`,
                },
                validateStatus: (status) => status >= 200 && status < 500,
            });
            const resData = response.data;
            const allowedStatuses = ["send_pin", "send_otp"];
            console.log(resData);
            if (!resData.status || !allowedStatuses.includes(resData.data?.status)) {
                let message = resData?.data?.message ||
                    resData?.message ||
                    "Payment attempt failed!";
                return {
                    success: false,
                    message,
                    data: resData,
                };
            }
            return {
                success: true,
                message: "Pending pin/otp validation",
                data: resData?.data,
            };
        }
        catch (error) {
            console.log(error);
            return {
                success: false,
                message: error?.response?.data?.data?.message ||
                    "Failed to initiate card payment",
                error: error.message,
            };
        }
    }
    static async validatePIN(data) {
        const { reference, pin, mode } = data;
        if (!reference || !pin) {
            return {
                success: false,
                message: "Reference and PIN are required.",
            };
        }
        const secretkey = mode === "test"
            ? process.env.PAYSTACK_TEST_SECRET_KEY
            : process.env.PAYSTACK_SECRET_KEY;
        try {
            const response = await axios_1.default.post("https://api.paystack.co/charge/submit_pin", { pin, reference }, {
                headers: {
                    Authorization: `Bearer ${secretkey}`,
                },
                validateStatus: (status) => status >= 200 && status < 500,
            });
            const resData = response.data;
            // Paystack may return `send_otp` after PIN
            if (resData.status && resData.data?.status === "send_otp") {
                const { display_text, ...cleanedData } = resData.data || {};
                return {
                    success: true,
                    message: resData.data.display_text || "OTP required to continue.",
                    data: cleanedData,
                };
            }
            if (!resData.status || resData.data?.status !== "success") {
                return {
                    success: false,
                    message: resData?.data?.message ||
                        resData?.message ||
                        "Failed to validate the PIN.",
                    data: resData,
                };
            }
            return {
                success: true,
                message: "PIN validated and payment successful!",
                data: resData.data,
            };
        }
        catch (error) {
            console.error("Paystack PIN Validation Error:", error?.response?.data || error.message);
            return {
                success: false,
                message: error?.response?.data?.message || "Server error while validating PIN",
                error: error.message,
            };
        }
    }
    static async validateOTP(data) {
        const { reference, otp, mode } = data;
        // -----------------------------
        // Input validation
        // -----------------------------
        if (!reference || !otp) {
            return {
                success: false,
                message: "Reference and OTP are required.",
            };
        }
        const secretkey = mode === "test"
            ? process.env.PAYSTACK_TEST_SECRET_KEY
            : process.env.PAYSTACK_SECRET_KEY;
        try {
            // -----------------------------
            // Request to Paystack
            // -----------------------------
            const response = await axios_1.default.post("https://api.paystack.co/charge/submit_otp", { otp, reference }, {
                headers: {
                    Authorization: `Bearer ${secretkey}`,
                },
                validateStatus: (status) => status >= 200 && status < 500, // allow 4xx but throw on 5xx
            });
            const resData = response.data;
            console.log("Paystack OTP Validation Response:", resData);
            // -----------------------------
            // Handle Paystack response
            // -----------------------------
            if (!resData.status || resData.data?.status !== "success") {
                const message = resData?.data?.message ||
                    resData?.message ||
                    "Failed to validate the OTP.";
                return { success: false, message, data: resData };
            }
            // -----------------------------
            // If successful, return structured response
            // -----------------------------
            return {
                success: true,
                message: "Payment successful 🎉",
            };
        }
        catch (error) {
            console.error("Paystack OTP Validation Error:", error?.response?.data || error.message);
            return {
                success: false,
                message: error?.response?.data?.message || "Server error while validating OTP",
                error: error.message,
            };
        }
    }
    static async chargeAuthorization(data) {
        const { email, amount, auth_code, mode } = data;
        try {
            const secretkey = mode === "test"
                ? process.env.PAYSTACK_TEST_SECRET_KEY
                : process.env.PAYSTACK_SECRET_KEY;
            const response = await axios_1.default.post("https://api.paystack.co/transaction/charge_authorization", {
                email,
                amount: Number(amount) * 100,
                authorization_code: auth_code,
            }, {
                headers: {
                    Authorization: `Bearer ${secretkey}`,
                    "Content-Type": "application/json",
                },
                validateStatus: (status) => status >= 200 && status < 500,
            });
            return {
                success: response.data.status ?? false,
                message: response.data.message || "No message from Paystack",
                data: response.data.data ?? null,
                statusCode: response.status,
            };
        }
        catch (error) {
            console.error("Paystack Charge Authorization Error:", error);
            return {
                success: false,
                message: error?.response?.data?.message ||
                    error?.message ||
                    "Charge authorization failed",
                data: error?.response?.data ?? null,
                statusCode: error?.response?.status ?? 500,
            };
        }
    }
}
exports.PaystackService = PaystackService;
