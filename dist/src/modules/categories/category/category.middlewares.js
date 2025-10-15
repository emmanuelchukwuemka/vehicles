"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySecure = void 0;
const categorySecure = (req, res, next) => {
    try {
        console.log("Middleware executed for category module");
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.categorySecure = categorySecure;
