"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpate = exports.createVendorValidation = void 0;
const vendor_validations_1 = require("./vendor.validations");
const createVendorValidation = (req, res, next) => {
    try {
        req.body = vendor_validations_1.createVendorSchema.parse(req.body);
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.createVendorValidation = createVendorValidation;
const validateUpate = (req, res, next) => {
    try {
        vendor_validations_1.updateVendorStatusSchema.parse(req.body);
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.validateUpate = validateUpate;
