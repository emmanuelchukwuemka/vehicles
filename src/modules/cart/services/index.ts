import { Transaction } from "sequelize";
import sequelize from "../../../config/database/sequelize";
import { Product, ProductUnit } from "../../product/models/associations";
import { Store } from "../../store/models/store.models";
import { Cart, CartItem } from "../models/cartAssociations";
import {
  AddCartItemInput,
  ClearCartInput,
  GetCartInput,
  RemoveCartItemInput,
  UpdateCartItemInput,
} from "../validations";
import User from "../../user/user.models";
import { Subdomain } from "../../domains/model/subdomain.models";
import Currency from "../../currency/currency.models";

// --------- Helper functions ---------

function round2(n: number) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

interface GuestCartItem {
  subdomain_id: number;
  store_id: number;
  product_id: number;
  unit_id?: number;
  quantity: number;
  price?: number;
  currency_id?: number;
  metadata?: object;
}

// --------- Cart Service ---------

export class CartService {
  // Get or Create Cart
  static async getOrCreateCart(params: {
    userId: number;
    cartId?: number | null;
    createIfMissing?: boolean;
    transaction?: Transaction;
  }) {
    const { userId, cartId, createIfMissing = false, transaction } = params;

    let cart: Cart | null = null;

    if (cartId) {
      cart = await Cart.findByPk(cartId, { transaction });
    } else {
      cart = await Cart.findOne({ where: { user_id: userId }, transaction });
    }

    if (!cart && createIfMissing) {
      cart = await Cart.create({ user_id: userId }, { transaction });
    }

    return cart;
  }

  // Add Item to Cart
  static async addItemToCart(
    input: Omit<
      AddCartItemInput,
      "store_id" | "subdomain_id" | "price" | "currency_id" | "cart_id"
    >,
    opts?: { checkStock?: boolean }
  ) {
    if (!input.user_id) {
      // guests handled client-side
      return { success: true, message: "Guest cart updated locally" };
    }

    const { checkStock = true } = opts || {};
    const transaction = await sequelize.transaction();

    try {
      // 1) Validate user
      const user = await User.findByPk(input.user_id, { transaction });
      if (!user) {
        await transaction.rollback();
        return { success: false, message: "User not found" };
      }

      // 2) Get or create cart
      const cart = await this.getOrCreateCart({
        userId: input.user_id,
        createIfMissing: true,
        transaction,
      });
      if (!cart) {
        await transaction.rollback();
        return {
          success: false,
          message: "Cart not found or could not be created",
        };
      }

      // 3) Validate product
      const product = await Product.findByPk(input.product_id, { transaction });
      if (!product) {
        await transaction.rollback();
        return { success: false, message: "Product not found" };
      }

      // 4) Validate store (belongs to product)
      const store = await Store.findByPk(product.store_id, { transaction });
      if (!store) {
        await transaction.rollback();
        return { success: false, message: "Store not found for this product" };
      }
      const subdomainId = store.subdomain_id;

      // 5) Validate unit if provided
      let unitRow: ProductUnit | null = null;
      if (input.unit_id) {
        unitRow = await ProductUnit.findByPk(input.unit_id, { transaction });
        if (!unitRow) {
          await transaction.rollback();
          return { success: false, message: "Product unit not found" };
        }

        // Ensure unit belongs to product
        if (unitRow.product_id !== product.id) {
          await transaction.rollback();
          return {
            success: false,
            message: "Unit does not belong to the specified product",
          };
        }

        // Stock check
        if (checkStock && input.quantity > Number(unitRow.stock ?? 0)) {
          await transaction.rollback();
          return {
            success: false,
            message: "Insufficient stock for selected unit",
          };
        }
      }

      // 6) Currency is taken from product
      const currencyId = product.currency_id;

      // 7) Price calculation: base_price + (unit.price if any)
      const basePrice = Number(product.base_price) || 0;
      const unitPrice = unitRow ? Number(unitRow.price) || 0 : 0;
      const finalPrice = round2(basePrice + unitPrice);

      // 8) Ensure quantity is valid
      const quantity = Math.max(1, Math.floor(input.quantity ?? 1));

      // 9) Check if item already exists in cart
      const existing = await CartItem.findOne({
        where: {
          cart_id: cart.id,
          product_id: input.product_id,
          unit_id: input.unit_id ?? null,
        },
        transaction,
      });

      if (existing) {
        existing.quantity += quantity;
        existing.price = finalPrice; // always refresh to correct price
        existing.currency_id = currencyId;
        await existing.save({ transaction });
      } else {
        await CartItem.create(
          {
            cart_id: cart.id,
            store_id: store.id,
            subdomain_id: subdomainId,
            product_id: product.id,
            unit_id: input.unit_id ?? null,
            quantity,
            price: finalPrice,
            currency_id: currencyId,
          },
          { transaction }
        );
      }

      await transaction.commit();
      return {
        success: true,
        message: "Item added to cart",
        data: cart.items,
      };
    } catch (error) {
      await transaction.rollback();
      console.error("CartService.addItemToCart error:", error);
      return { success: false, message: "Failed to add item to cart", error };
    }
  }

  //* Merge guest cart (from frontend) into logged-in user's DB cart.
  static async mergeGuestCartToUser(
    userId: number,
    guestItems: GuestCartItem[]
  ) {
    const transaction: Transaction = await sequelize.transaction();
    try {
      let cart = await Cart.findOne({
        where: { user_id: userId },
        transaction,
      });
      if (!cart) {
        cart = await Cart.create({ user_id: userId }, { transaction });
      }

      for (const item of guestItems) {
        const product = await Product.findByPk(item.product_id, {
          transaction,
        });
        if (!product) continue;

        const store = await Store.findByPk(item.store_id, { transaction });
        if (!store) continue;

        let unitRow: any = null;
        if (item.unit_id) {
          unitRow = await ProductUnit.findByPk(item.unit_id, { transaction });
          if (!unitRow) continue;
          if (item.quantity > Number(unitRow.stock ?? 0)) continue;
        }

        const finalPrice = unitRow
          ? Number(unitRow.price ?? 0)
          : Number(product.base_price ?? 0);

        const existing = await CartItem.findOne({
          where: {
            cart_id: cart.id,
            product_id: item.product_id,
            unit_id: item.unit_id ?? null,
          },
          transaction,
        });

        if (existing) {
          existing.quantity += item.quantity;
          await existing.save({ transaction });
        } else {
          await CartItem.create(
            {
              cart_id: cart.id,
              store_id: item.store_id,
              subdomain_id: item.subdomain_id,
              product_id: item.product_id,
              unit_id: item.unit_id ?? null,
              quantity: item.quantity,
              price: round2(item.price ?? finalPrice),
              currency_id: item.currency_id ?? product.currency_id,
              metadata: item.metadata ?? null,
            },
            { transaction }
          );
        }
      }

      await transaction.commit();
      return {
        success: true,
        message: "Guest cart merged",
        data: { cart_id: cart.id },
      };
    } catch (error) {
      await transaction.rollback();
      console.error("CartService.mergeGuestCartToUser error:", error);
      return { success: false, message: "Failed to merge guest cart", error };
    }
  }

  //   Update cart item
  static async updateCartItem(
    input: UpdateCartItemInput & { user_id: number }
  ) {
    const transaction = await sequelize.transaction();
    try {
      // Find the cart item
      const item = await CartItem.findByPk(input.cart_item_id, {
        transaction,
        attributes: { exclude: ["created_at", "updated_at"] },
      });
      if (!item) {
        await transaction.rollback();
        return { success: false, message: "Cart item not found" };
      }

      // Validate ownership via cart → user
      const cart = await Cart.findByPk(item.cart_id, { transaction });
      if (!cart || cart.user_id !== input.user_id) {
        await transaction.rollback();
        return {
          success: false,
          message: "You are not allowed to update this cart item",
        };
      }

      // Fetch product to recalc price + validate store linkage
      const product = await Product.findByPk(item.product_id, { transaction });
      if (!product) {
        await transaction.rollback();
        return { success: false, message: "Product not found" };
      }

      // If item has a unit, validate + stock check
      let unitRow: ProductUnit | null = null;
      if (item.unit_id) {
        unitRow = await ProductUnit.findByPk(item.unit_id, { transaction });
        if (!unitRow) {
          await transaction.rollback();
          return { success: false, message: "Product unit not found" };
        }

        if (
          typeof input.quantity === "number" &&
          input.quantity > Number(unitRow.stock ?? 0)
        ) {
          await transaction.rollback();
          return { success: false, message: "Insufficient stock for unit" };
        }
      }

      // 5) Update quantity if provided
      if (typeof input.quantity === "number") {
        // Should quantity=0 remove item instead of forcing to 1?
        if (input.quantity <= 0) {
          await item.destroy({ transaction });
          await transaction.commit();
          return { success: true, message: "Cart item removed" };
        }

        item.quantity = Math.floor(input.quantity);
      }

      // 6) Always refresh price & currency
      const basePrice = Number(product.base_price) || 0;
      const unitPrice = unitRow ? Number(unitRow.price) || 0 : 0;
      item.price = round2(basePrice + unitPrice);
      item.currency_id = product.currency_id;

      await item.save({ transaction });
      await transaction.commit();

      return { success: true, message: "Cart item updated", data: item };
    } catch (error) {
      await transaction.rollback();
      console.error("CartService.updateCartItem error:", error);
      return { success: false, message: "Failed to update cart item", error };
    }
  }

  //   Remove item
  static async removeCartItem(input: RemoveCartItemInput) {
    const { user_id, cart_item_id } = input;
    const transaction = await sequelize.transaction();

    try {
      // 1) Find cart item
      const item = await CartItem.findByPk(cart_item_id, { transaction });
      if (!item) {
        await transaction.rollback();
        return { success: false, message: "Cart item not found" };
      }

      // 2) Validate ownership (cart → user)
      const cart = await Cart.findByPk(item.cart_id, { transaction });
      if (!cart || cart.user_id !== user_id) {
        await transaction.rollback();
        return {
          success: false,
          message: "You are not allowed to remove this item",
        };
      }

      // 3) Remove item
      await item.destroy({ transaction });

      // 4) Check if cart is now empty
      const remainingItems = await CartItem.count({
        where: { cart_id: cart.id },
        transaction,
      });

      if (remainingItems === 0) {
        await cart.destroy({ transaction });
      }

      await transaction.commit();

      return { success: true, message: "Cart item removed" };
    } catch (error) {
      await transaction.rollback();
      console.error("CartService.removeCartItem error:", error);
      return { success: false, message: "Failed to remove cart item", error };
    }
  }

  // * Clear all items from a cart
  static async clearCart(user_id: number) {
    const transaction = await sequelize.transaction();

    try {
      // 1) Find the user's cart
      const cart = await Cart.findOne({ where: { user_id }, transaction });
      if (!cart) {
        await transaction.rollback();
        return { success: false, message: "Cart not found" };
      }

      // 2) Delete all items inside the cart
      await CartItem.destroy({ where: { cart_id: cart.id }, transaction });

      // 3) Delete the cart itself
      await cart.destroy({ transaction });

      await transaction.commit();
      return { success: true, message: "Cart cleared and deleted" };
    } catch (error) {
      await transaction.rollback();
      console.error("CartService.clearCart error:", error);
      return { success: false, message: "Failed to clear cart", error };
    }
  }

  //* Get cart with items
  static async getCart(user_id: number) {
    try {
      // 1) Find the cart by user_id
      const cart = await Cart.findOne({
        where: { user_id },
        attributes: { exclude: ["created_at", "updated_at"] },
        include: [
          {
            model: CartItem,
            as: "items",
            attributes: { exclude: ["created_at", "updated_at"] },
          },
        ],
      });

      if (!cart) {
        return { success: false, message: "Cart not found" };
      }

      return {
        success: true,
        message: "Cart retrieved successfully",
        data: cart.get({ plain: true }),
      };
    } catch (error) {
      console.error("CartService.getCart error:", error);
      return { success: false, message: "Failed to fetch cart", error };
    }
  }
}
