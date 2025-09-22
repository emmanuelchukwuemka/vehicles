"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSecure = void 0;
const orderSecure = (req, res, next) => {
    try {
        console.log("Middleware executed for order module");
        next();
    }
    catch (err) {
        next(err); // Here am just passing the error to global errorHandler
    }
};
exports.orderSecure = orderSecure;
