import { Product } from "./baseProduct.models";
import { ProductMedia } from "./ProductMedia";
import { ProductUnit } from "./ProductUnit";

// Product → Units
Product.hasMany(ProductUnit, { foreignKey: "product_id", as: "units" });
ProductUnit.belongsTo(Product, {
  foreignKey: "product_id",
  as: "productParent",
});

// Unit → Media
ProductUnit.hasMany(ProductMedia, { foreignKey: "unit_id", as: "unitMedia" });
ProductMedia.belongsTo(ProductUnit, {
  foreignKey: "unit_id",
  as: "unitParent",
});

// Product → Media
Product.hasMany(ProductMedia, { foreignKey: "product_id", as: "productMedia" });
ProductMedia.belongsTo(Product, {
  foreignKey: "product_id",
  as: "productParent",
});

export { Product, ProductUnit, ProductMedia };
