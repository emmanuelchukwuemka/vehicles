import { Product } from "./baseProduct.models";
import { Variation } from "./variation.models";
import { Media } from "./media.models";

// Product → Variation
Product.hasMany(Variation, { foreignKey: "product_id", as: "variations" });
Variation.belongsTo(Product, { foreignKey: "product_id", as: "product" });

// Variation → Media (gallery for the variation)
Variation.hasMany(Media, { foreignKey: "variation_id", as: "variationMedia" });
Media.belongsTo(Variation, {
  foreignKey: "variation_id",
  as: "variationParent",
});

// Product → Media (default gallery for product)
Product.hasMany(Media, { foreignKey: "product_id", as: "productMedia" });
Media.belongsTo(Product, { foreignKey: "product_id", as: "productParent" });

export { Product, Variation, Media };
