"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCookie = exports.attachCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const attachCookie = (req, res, next) => {
    if (req.user) {
        const token = jsonwebtoken_1.default.sign({ id: req.user.id, email: req.user.email }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }
    next();
};
exports.attachCookie = attachCookie;
const verifyCookie = (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
        return res.status(401).json({ message: "Unauthorized" });
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.verifyCookie = verifyCookie;
