"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_models_1 = __importDefault(require("../modules/user/user.models"));
const verifyCookie = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
            statusCode: 401,
        });
        return;
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await user_models_1.default.findByPk(payload.id);
        if (!user) {
            res.status(401).json({
                success: false,
                message: "User not found",
                statusCode: 401,
            });
            return;
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: "Invalid token",
            statusCode: 401,
        });
        return;
    }
};
exports.verifyCookie = verifyCookie;
