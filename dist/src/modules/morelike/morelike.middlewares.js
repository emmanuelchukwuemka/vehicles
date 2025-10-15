"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.morelikeSecure = void 0;
const morelikeSecure = (req, res, next) => {
    try {
        console.log("Middleware executed for morelike module");
        next();
    }
    catch (err) {
        next(err); // Here am just passing the error to global errorHandler
    }
};
exports.morelikeSecure = morelikeSecure;
