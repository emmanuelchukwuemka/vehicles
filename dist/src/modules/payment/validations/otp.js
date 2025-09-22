"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitOtpSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SubmitOtpSchema = zod_1.default.object({
    reference: zod_1.default.string().min(1, "reference is required"),
    otp: zod_1.default.string().min(3, "OTP too short"),
    mode: zod_1.default.enum(["test", "live"]),
});
