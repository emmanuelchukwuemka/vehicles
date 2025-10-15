"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSecure = void 0;
const auth_validations_1 = require("./auth.validations");
const authSecure = (req, res, next) => {
    try {
        console.log("Middleware executed for auth module");
        req.body = auth_validations_1.loginSchema.parse(req.body);
        return next();
    }
    catch (err) {
        console.log("Error in authSecure:", err);
        return res.status(400).json({
            success: false,
            message: "Validation error",
            details: err.errors ?? err.issues,
        });
    }
};
exports.authSecure = authSecure;
