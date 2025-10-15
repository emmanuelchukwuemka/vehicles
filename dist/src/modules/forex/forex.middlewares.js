"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forexSecure = void 0;
const forexSecure = (req, res, next) => {
    try {
        console.log("Middleware executed for forex module");
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.forexSecure = forexSecure;
