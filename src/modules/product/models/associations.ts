import { Product } from "./product.models";
import { Variation } from "./variation.models";
import { Media } from "./media.models";

/**
 * Product → Variation
 * One product can have many variations
 */
Product.hasMany(Variation, {
  foreignKey: "product_id",
  as: "variations",
});
Variation.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});

/**
 * Variation → Media
 * One variation can have many gallery media
 */
Variation.hasMany(Media, {
  foreignKey: "variation_id",
  as: "media",
});
Media.belongsTo(Variation, {
  foreignKey: "variation_id",
  as: "variation",
});

/**
 * Product → Media
 * One product can also have many media (e.g. default product gallery)
 */
Product.hasMany(Media, {
  foreignKey: "product_id",
  as: "productMedia",
});
Media.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});

export { Product, Variation, Media };
