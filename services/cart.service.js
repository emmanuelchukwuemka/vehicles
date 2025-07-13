const { pool } = require("../connection/db");
require("dotenv").config();
const { v4: uuid } = require("uuid");
const axios = require("axios");

exports.addToCart = async (req, res) => {
  const {
    user_id,
    store_id,
    product_id,
    variation_id,
    sku,
    key: attribute_key,
    quantity,
    price,
    weight,
    selectedAttributes = {},
  } = req.body;

  if (
    !user_id ||
    !store_id ||
    !product_id ||
    !variation_id ||
    !sku ||
    !attribute_key ||
    !quantity ||
    //!price ||
    !weight
  ) {
    return {
      success: false,
      error: "Missing required fields.",
    };
  }

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // 1. Ensure only ONE cart per user
    let [existingCart] = await conn.query(
      "SELECT id FROM carts_table WHERE user_id = ? LIMIT 1",
      [user_id]
    );

    let cart_id;
    if (existingCart.length > 0) {
      cart_id = existingCart[0].id;
    } else {
      try {
        const [cartResult] = await conn.query(
          "INSERT INTO carts_table (user_id) VALUES (?)",
          [user_id]
        );
        cart_id = cartResult.insertId;
      } catch (insertErr) {
        // Fallback in case of race condition duplicate insert
        if (insertErr.code === "ER_DUP_ENTRY") {
          const [retryCart] = await conn.query(
            "SELECT id FROM carts_table WHERE user_id = ? LIMIT 1",
            [user_id]
          );
          cart_id = retryCart[0].id;
        } else {
          throw insertErr;
        }
      }
    }

    // 2. Check if this specific item already exists
    const [existingItem] = await conn.query(
      `SELECT id, quantity FROM cart_items 
             WHERE cart_id = ? AND sku = ? AND attribute_key = ?`,
      [cart_id, sku.trim(), attribute_key.trim()]
    );

    if (existingItem.length > 0) {
      // 3. Update quantity
      await conn.query(
        `UPDATE cart_items 
                 SET quantity = quantity + ?, price = ? 
                 WHERE id = ?`,
        [quantity, price, existingItem[0].id]
      );
    } else {
      // 4. Insert new item
      const [newItem] = await conn.query(
        `INSERT INTO cart_items 
                 (cart_id, store_id, product_id, variation_id, sku, attribute_key, quantity, price, weight)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          cart_id,
          store_id,
          product_id,
          variation_id,
          sku.trim(),
          attribute_key.trim(),
          quantity,
          price,
          weight,
        ]
      );

      const cart_item_id = newItem.insertId;

      // 5. Insert attribute rows
      const attributesToInsert = Object.entries(selectedAttributes).map(
        ([name, value]) => [cart_item_id, name.trim(), value.trim()]
      );

      if (attributesToInsert.length > 0) {
        await conn.query(
          `INSERT INTO cart_item_attributes (cart_item_id, name, value) VALUES ?`,
          [attributesToInsert]
        );
      }
    }

    await conn.commit();
    return {
      success: true,
      data: "Item added to cart.",
    };
  } catch (error) {
    await conn.rollback();
    console.error("Add to cart error:", error);
    return {
      success: false,
      error: "Server error.",
    };
  } finally {
    if (conn) conn.release();
  }
};

exports.updateCartItem = async (req) => {
  const { user_id, sku, quantity, key: attribute_key } = req.body;

  if (!user_id || !sku || !attribute_key || typeof quantity !== "number") {
    return { success: false, error: "Missing or invalid parameters" };
  }

  //console.log(req.body)

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Step 1: Get cart id
    const [cart] = await connection.query(
      "SELECT id FROM carts_table WHERE user_id = ? LIMIT 1",
      [user_id]
    );

    if (cart.length === 0) {
      return { success: false, error: "Cart not found for user" };
    }

    const cartId = cart[0].id;

    // Step 2: Find the item
    const [item] = await connection.query(
      "SELECT id FROM cart_items WHERE cart_id = ? AND sku = ? AND attribute_key = ? LIMIT 1",
      [cartId, sku.trim(), attribute_key.trim()]
    );

    if (item.length === 0) {
      return { success: false, error: "Cart item not found" };
    }

    // Step 3: Update quantity
    const [qtyUpdate] = await connection.query(
      "UPDATE cart_items SET quantity = ? WHERE id = ?",
      [quantity, item[0].id]
    );

    await connection.commit();

    if (qtyUpdate.affectedRows > 0) {
      return { success: true, data: "Cart item updated successfully" };
    }

    return { success: false, error: "No changes made to cart item" };
  } catch (error) {
    await connection.rollback();
    console.error("Error updating cart item:", error);
    return { success: false, error: "Internal server error" };
  } finally {
    if (connection) connection.release();
  }
};

exports.removeCartItem = async (req) => {
  const jwtData = req.user;
  const { product_id, variation_id, sku, attribute_key } = req.body;

  if (!product_id) {
    return {
      success: false,
      error: "Product ID is required.",
    };
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Find cart ID for the user
    const [cartRows] = await connection.query(
      "SELECT id FROM carts_table WHERE user_id = ?",
      [jwtData.id]
    );

    if (cartRows.length === 0) {
      await connection.rollback();
      return {
        success: false,
        error: "Cart not found.",
      };
    }

    const cart_id = cartRows[0].id;

    // 2. Build the DELETE query conditionally
    let deleteQuery = `DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?`;
    let queryParams = [cart_id, product_id];

    if (sku) {
      if (variation_id) {
        deleteQuery += ` AND variation_id = ?`;
        queryParams.push(variation_id);
      }
      deleteQuery += ` AND sku = ?`;
      queryParams.push(sku);

      if (attribute_key) {
        deleteQuery += ` AND attribute_key = ?`;
        queryParams.push(attribute_key);
      }
    }

    // 3. Execute the delete query
    const [result] = await connection.query(deleteQuery, queryParams);

    await connection.commit();

    return {
      success: true,
      data:
        result.affectedRows > 0
          ? "Item(s) removed from cart."
          : "Item(s) not found in cart.",
    };
  } catch (error) {
    await connection.rollback();
    console.error("Remove cart item error:", error);
    return { success: false, error: "Something went wrong." };
  } finally {
    if (connection) connection.release();
  }
};

exports.getCart = async (req) => {
  const { user_id } = req.body;

  if (!user_id) {
    return { success: false, error: "User ID is required" };
  }

  const conn = await pool.getConnection();
  try {
    // Get the cart ID
    const [cart] = await conn.query(
      "SELECT id FROM carts_table WHERE user_id = ?",
      [user_id]
    );

    if (cart.length === 0) {
      return { success: true, data: [] };
    }

    const cartId = cart[0].id;

    // Fetch cart items with product info, variation_id, stock, and media
    const [cartItems] = await conn.query(
      `
            SELECT 
                ci.id,
                ci.cart_id,
                ci.product_id,
                ci.store_id,
                ci.sku,
                ci.attribute_key AS \`key\`,
                ci.quantity,
                ci.weight,
                ci.price,
                v.id AS variation_id,
                p.name,
                (
                    SELECT url 
                    FROM media_table 
                    WHERE product_id = ci.product_id 
                    AND (variation_id IS NULL OR variation_id = v.id)
                    AND type = 'image' 
                    ORDER BY variation_id IS NULL ASC, id ASC 
                    LIMIT 1
                ) AS image
            FROM 
                cart_items ci
            INNER JOIN 
                products_table p ON ci.product_id = p.id
            INNER JOIN
                variations_table v ON ci.sku = v.sku
            WHERE 
                ci.cart_id = ?
            `,
      [cartId]
    );

    if (cartItems.length === 0) {
      return { success: true, data: [] };
    }

    // STEP 1: Get unique store IDs
    const storeIds = [...new Set(cartItems.map((item) => item.store_id))];

    // STEP 2: Get user scopes for each store_id
    const [scopeRows] = await conn.query(
      `SELECT user_id, scope FROM users_scope WHERE user_id IN (?)`,
      [storeIds]
    );

    // STEP 3: Group scopes by store_id
    const scopeMap = {};
    scopeRows.forEach(({ user_id, scope }) => {
      if (!scopeMap[user_id]) scopeMap[user_id] = [];
      scopeMap[user_id].push(scope);
    });

    // Get all product IDs from the cart items
    const productIds = [...new Set(cartItems.map((item) => item.product_id))];
    const cartItemIds = cartItems.map((item) => item.id);

    // Fetch MOQ data
    const [moqData] = await conn.query(
      `SELECT product_id, min_qty, ppu FROM product_moq WHERE product_id IN (?) ORDER BY min_qty DESC`,
      [productIds]
    );

    // Group MOQ by product_id
    const moqMap = {};
    moqData.forEach((row) => {
      if (!moqMap[row.product_id]) moqMap[row.product_id] = [];
      moqMap[row.product_id].push({
        min_qty: row.min_qty,
        ppu: parseFloat(row.ppu),
      });
    });

    // Fetch cart item attributes
    const placeholders = cartItemIds.map(() => "?").join(",");
    const [attributeRows] = await conn.query(
      `SELECT cart_item_id AS item_id, name, value FROM cart_item_attributes WHERE cart_item_id IN (${placeholders})`,
      cartItemIds
    );

    // Group attributes by item_id
    const attributeMap = {};
    attributeRows.forEach((attr) => {
      if (!attributeMap[attr.item_id]) attributeMap[attr.item_id] = {};
      attributeMap[attr.item_id][attr.name] = attr.value;
    });

    // Build final cart structure
    const finalCartItems = cartItems.map((item) => ({
      ...item,
      selectedAttributes: attributeMap[item.id] || {},
      moq: moqMap[item.product_id] || [],
      source: scopeMap[item.store_id] || [],
    }));

    return { success: true, data: finalCartItems };
  } catch (error) {
    console.error("Error fetching cart:", error);
    return { success: false, error: "Internal server error" };
  } finally {
    await conn.release();
  }
};
