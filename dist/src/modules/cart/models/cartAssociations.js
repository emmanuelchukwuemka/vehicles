"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = exports.Cart = void 0;
const cart_models_1 = require("./cart.models");
Object.defineProperty(exports, "Cart", { enumerable: true, get: function () { return cart_models_1.Cart; } });
const cartItems_model_1 = require("./cartItems.model");
Object.defineProperty(exports, "CartItem", { enumerable: true, get: function () { return cartItems_model_1.CartItem; } });
cart_models_1.Cart.hasMany(cartItems_model_1.CartItem, {
    foreignKey: "cart_id",
    as: "items",
});
cartItems_model_1.CartItem.belongsTo(cart_models_1.Cart, {
    foreignKey: "cart_id",
    as: "cart",
});
