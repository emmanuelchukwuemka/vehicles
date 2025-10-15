"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.morelikeSecure = void 0;
const morelikeSecure = (req, res, next) => {
    try {
        console.log("Middleware executed for morelike module");
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.morelikeSecure = morelikeSecure;
