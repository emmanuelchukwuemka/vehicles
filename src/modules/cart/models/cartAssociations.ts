import { Cart } from "./cart.models";
import { CartItem } from "./cartItems.model";

Cart.hasMany(CartItem, {
  foreignKey: "cart_id",
  as: "items",
});

CartItem.belongsTo(Cart, {
  foreignKey: "cart_id",
  as: "cart",
});

export { Cart, CartItem };
