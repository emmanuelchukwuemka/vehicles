"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRetailerProduct = void 0;
const retailer_1 = require("../../validations/retailer");
const validateRetailerProduct = (req, res, next) => {
    try {
        req.body = retailer_1.retailerProductSchema.parse(req.body);
        return next();
    }
    catch (err) {
        return res.status(400).json({
            success: false,
            message: "Invalid product data",
            errors: err.issues || err.message,
        });
    }
};
exports.validateRetailerProduct = validateRetailerProduct;
