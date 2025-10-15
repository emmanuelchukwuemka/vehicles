"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVariationSKU = void 0;
const uuid_1 = require("uuid");
const generateVariationSKU = (product, attributes) => {
    if (!product?.subcategory_id || !product?.name) {
        return `${(0, uuid_1.v4)().toUpperCase()}`;
    }
    const subCategoryId = product.subcategory_id;
    const productCode = product.name
        .replace(/\s+/g, "")
        .substring(0, 6)
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "");
    let attrCodes = "";
    if (attributes) {
        attrCodes = Object.entries(attributes)
            .map(([_, val]) => String(val)
            .replace(/\s+/g, "")
            .substring(0, 6)
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, ""))
            .join("-");
    }
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${subCategoryId}-${productCode}${attrCodes ? "-" + attrCodes : ""}-${randomSuffix}`;
};
exports.generateVariationSKU = generateVariationSKU;
