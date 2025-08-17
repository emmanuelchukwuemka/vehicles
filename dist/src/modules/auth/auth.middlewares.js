"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSecure = void 0;
const authSecure = (req, res, next) => {
    try {
        console.log("Middleware executed for auth module");
        next();
    }
    catch (err) {
        next(err); // Here am just passing the error to global errorHandler
    }
};
exports.authSecure = authSecure;
