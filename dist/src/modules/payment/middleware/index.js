"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentSecure = void 0;
const paymentSecure = (req, res, next) => {
    try {
        console.log("Middleware executed for payment module");
        next();
    }
    catch (err) {
        next(err); // Here am just passing the error to global errorHandler
    }
};
exports.paymentSecure = paymentSecure;
