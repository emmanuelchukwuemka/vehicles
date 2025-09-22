"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitPinSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SubmitPinSchema = zod_1.default.object({
    reference: zod_1.default.string().min(1, "reference is required"),
    pin: zod_1.default.string().min(4, "PIN too short"),
    mode: zod_1.default.enum(["test", "live"]),
});
