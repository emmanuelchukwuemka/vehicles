"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../../config/database/db")); // Raw SQL pool
const apiResponse_1 = require("../../globals/utility/apiResponse");
const user_helper_1 = require("../users/user.helper");
const loginService = async (payload) => {
    const { email, password } = payload;
    if (!email || !password) {
        return (0, apiResponse_1.errorResponse)("Email and password are required", 422);
    }
    const [rows] = await db_1.default.query("SELECT * FROM auth_table WHERE email = ? LIMIT 1", [email]);
    const userAuth = rows.length ? rows[0] : null;
    if (!userAuth) {
        return (0, apiResponse_1.errorResponse)("User does not exist", 401);
    }
    const isMatch = await bcrypt_1.default.compare(password, userAuth.password);
    if (!isMatch) {
        return (0, apiResponse_1.errorResponse)("Incorrect email or password", 401);
    }
    // Fetch user info from users_table
    const userInfo = await (0, user_helper_1.getUserByAuthId)(userAuth.user_id);
    if (!userInfo) {
        return (0, apiResponse_1.errorResponse)("User profile not found", 404);
    }
    const token = jsonwebtoken_1.default.sign({ id: userAuth.user_id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return (0, apiResponse_1.successResponse)("Login successful", { token, user: userInfo });
};
exports.loginService = loginService;
