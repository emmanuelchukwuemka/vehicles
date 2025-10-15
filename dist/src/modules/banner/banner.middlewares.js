"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannerSecure = void 0;
const bannerSecure = (req, res, next) => {
    try {
        console.log("Middleware executed for banner module");
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.bannerSecure = bannerSecure;
