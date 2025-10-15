"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductMedia = exports.ProductUnit = exports.Product = void 0;
const baseProduct_models_1 = require("./baseProduct.models");
Object.defineProperty(exports, "Product", { enumerable: true, get: function () { return baseProduct_models_1.Product; } });
const ProductMedia_1 = require("./ProductMedia");
Object.defineProperty(exports, "ProductMedia", { enumerable: true, get: function () { return ProductMedia_1.ProductMedia; } });
const ProductUnit_1 = require("./ProductUnit");
Object.defineProperty(exports, "ProductUnit", { enumerable: true, get: function () { return ProductUnit_1.ProductUnit; } });
baseProduct_models_1.Product.hasMany(ProductUnit_1.ProductUnit, { foreignKey: "product_id", as: "units" });
ProductUnit_1.ProductUnit.belongsTo(baseProduct_models_1.Product, {
    foreignKey: "product_id",
    as: "productParent",
});
ProductUnit_1.ProductUnit.hasMany(ProductMedia_1.ProductMedia, { foreignKey: "unit_id", as: "unitMedia" });
ProductMedia_1.ProductMedia.belongsTo(ProductUnit_1.ProductUnit, {
    foreignKey: "unit_id",
    as: "unitParent",
});
baseProduct_models_1.Product.hasMany(ProductMedia_1.ProductMedia, { foreignKey: "product_id", as: "productMedia" });
ProductMedia_1.ProductMedia.belongsTo(baseProduct_models_1.Product, {
    foreignKey: "product_id",
    as: "productParent",
});
