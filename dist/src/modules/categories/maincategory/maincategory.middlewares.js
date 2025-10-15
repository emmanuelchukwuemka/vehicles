"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maincategorySecure = void 0;
const maincategorySecure = (req, res, next) => {
    try {
        console.log("Middleware executed for maincategory module");
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.maincategorySecure = maincategorySecure;
