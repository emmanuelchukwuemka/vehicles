"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const auth_service_1 = require("./auth.service");
const loginController = async (req, res) => {
    const result = await (0, auth_service_1.loginService)(req.body);
    if (!result.success) {
        return res.status(result.statusCode || 400).json(result);
    }
    return res.status(200).json(result);
};
exports.loginController = loginController;
