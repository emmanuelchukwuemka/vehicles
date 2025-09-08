"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = exports.Variation = exports.Product = void 0;
const baseProduct_models_1 = require("./baseProduct.models");
Object.defineProperty(exports, "Product", { enumerable: true, get: function () { return baseProduct_models_1.Product; } });
const variation_models_1 = require("./variation.models");
Object.defineProperty(exports, "Variation", { enumerable: true, get: function () { return variation_models_1.Variation; } });
const media_models_1 = require("./media.models");
Object.defineProperty(exports, "Media", { enumerable: true, get: function () { return media_models_1.Media; } });
// Product → Variation
baseProduct_models_1.Product.hasMany(variation_models_1.Variation, { foreignKey: "product_id", as: "variations" });
variation_models_1.Variation.belongsTo(baseProduct_models_1.Product, { foreignKey: "product_id", as: "product" });
// Variation → Media (gallery for the variation)
variation_models_1.Variation.hasMany(media_models_1.Media, { foreignKey: "variation_id", as: "variationMedia" });
media_models_1.Media.belongsTo(variation_models_1.Variation, {
    foreignKey: "variation_id",
    as: "variationParent",
});
// Product → Media (default gallery for product)
baseProduct_models_1.Product.hasMany(media_models_1.Media, { foreignKey: "product_id", as: "productMedia" });
media_models_1.Media.belongsTo(baseProduct_models_1.Product, { foreignKey: "product_id", as: "productParent" });
