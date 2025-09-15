"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVariationSKU = void 0;
const generateVariationSKU = (product, attributes) => {
    if (!product?.subcategory_id || !product?.name) {
        throw new Error("Missing required fields for SKU");
    }
    const subCategoryId = product.subcategory_id;
    const productCode = product.name
        .replace(/\s+/g, "")
        .substring(0, 6)
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "");
    // build attribute code string like: BLUE-128-4GB
    let attrCodes = "";
    if (attributes) {
        attrCodes = Object.entries(attributes)
            .map(([key, val]) => String(val)
            .replace(/\s+/g, "") // remove spaces
            .substring(0, 6) // up to 6 chars for readability
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "") // keep only alphanumeric
        )
            .join("-");
    }
    // short random suffix for uniqueness
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${subCategoryId}-${productCode}${attrCodes ? "-" + attrCodes : ""}-${randomSuffix}`;
};
exports.generateVariationSKU = generateVariationSKU;
