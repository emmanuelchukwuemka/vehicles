const { pool } = require("../connection/db");
require('dotenv').config();
const { v4: uuid } = require("uuid")
const axios = require('axios');

exports.addToCart = async (req, res) => {

    const { user_id, product_id, sku, color, size, quantity, price } = req.body;

    const conn = await pool.getConnection();

    try {
        // Validation
        if (!user_id || !product_id || !sku || !size || !quantity || !price) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

        await conn.beginTransaction();

        // Check if user already has a cart
        const [existingCart] = await conn.query(
            "SELECT id FROM carts_table WHERE user_id = ?",
            [user_id]
        );

        let cart_id;
        if (existingCart.length > 0) {
            cart_id = existingCart[0].id;
        } else {
            const [cartResult] = await conn.query(
                "INSERT INTO carts_table (user_id) VALUES (?)",
                [user_id]
            );
            cart_id = cartResult.insertId;
        }

        // Check if item already exists in cart
        const [existingItem] = await conn.query(
            `SELECT id, quantity FROM cart_items 
             WHERE cart_id = ? AND sku = ? AND size = ?`,
            [cart_id, sku.trim(), size.trim()]
        );

        if (existingItem.length > 0) {
            // Update quantity
            await conn.query(
                `UPDATE cart_items SET quantity = quantity + ?, price = ? WHERE id = ?`,
                [quantity, price, existingItem[0].id]
            );
        } else {
            // Add new item
            await conn.query(
                `INSERT INTO cart_items (cart_id, product_id, sku, color, size, quantity, price) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [cart_id, product_id, sku.trim(), color?.trim() || null, size.trim(), quantity, price]
            );
        }

        await conn.commit();
        return {
            success: true,
            data: "Item added to cart."
        };

    } catch (error) {
        await conn.rollback();
        console.error("Add to cart error:", error);
        return {
            success: false,
            error: "Server error."
        };
    } finally {
        conn.release();
    }
};

exports.updateCartItem = async (req) => {
    const { user_id, sku, size, quantity } = req.body;

    console.log(JSON.stringify(req.body, 0, 2))

    if (!user_id || !sku || !size || typeof quantity !== 'number') {
        return { success: false, error: 'Missing or invalid parameters' };
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Step 1: Find the user's cart
        const [cart] = await connection.query(
            'SELECT id FROM carts_table WHERE user_id = ?',
            [user_id]
        );

        if (cart.length === 0) {
            await connection.rollback();
            return { success: false, error: 'Cart not found for user' };
        }

        const cartId = cart[0].id;

        // Step 2: Check if the item exists in cart_items
        const [item] = await connection.query(
            'SELECT id FROM cart_items WHERE cart_id = ? AND sku = ? AND size = ?',
            [cartId, sku, size]
        );

        if (item.length === 0) {
            await connection.rollback();
            return { success: false, error: 'Cart item not found' };
        }

        // Step 3: Update the quantity
        await connection.query(
            'UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND sku = ? AND size = ?',
            [quantity, cartId, sku, size]
        );

        await connection.commit();

        return { success: true, data: 'Cart item updated successfully' };

    } catch (error) {
        await connection.rollback();
        console.error('Error updating cart item:', error);
        return { success: false, error: 'Internal server error' };
    } finally {
        connection.release();
    }
};

exports.removeCartItem = async (req) => {

    const jwtData = req.user; // assuming user is authenticated
    const { product_id, sku, size, color } = req.body;

    if (!product_id) {
        return {
            success: false,
            error: "Product ID is required."
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
                error: "Cart not found."
            };
        }

        const cart_id = cartRows[0].id;

        // 2. Build the DELETE query conditionally
        let deleteQuery = `DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?`;
        let queryParams = [cart_id, product_id];

        if (sku) {
            deleteQuery += ` AND sku = ?`;
            queryParams.push(sku);

            if (size) {
                deleteQuery += ` AND size = ?`;
                queryParams.push(size);
            }

            if (color) {
                deleteQuery += ` AND color = ?`;
                queryParams.push(color);
            }
        }

        // 3. Execute the delete query
        const [result] = await connection.query(deleteQuery, queryParams);

        await connection.commit();

        return {
            success: true,
            data: result.affectedRows > 0 ? "Item(s) removed from cart." : "Item(s) not found in cart."
        };
    } catch (error) {
        await connection.rollback();
        console.error("Remove cart item error:", error);
        return { success: false, error: "Something went wrong." };
    } finally {
        connection.release();
    }
};

exports.getCart = async (req) => {
    const { user_id } = req.params;

    if (!user_id) {
        return { success: false, error: 'User ID is required' };
    }

    const connection = await pool.getConnection();
    try {
        const [cart] = await connection.query(
            'SELECT id FROM carts_table WHERE user_id = ?',
            [user_id]
        );

        if (cart.length === 0) {
            return { success: true, data: [] };
        }

        const cartId = cart[0].id;

        // Fetch cart items with product name, variation_id, and media
        const [cartItems] = await connection.query(
            `
            SELECT 
                ci.id,
                ci.product_id,
                ci.sku,
                ci.color,
                ci.size,
                ci.quantity,
                ci.price,
                v.id AS variation_id,
                v.stock,
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

        // Get all product IDs from the cart items
        const productIds = [...new Set(cartItems.map(item => item.product_id))];

        // Fetch all MOQ records for those products
        const [moqData] = await connection.query(
            "SELECT product_id, min_qty, ppu FROM product_moq WHERE product_id IN (?) ORDER BY min_qty DESC",
            [productIds]
        );

        // Group MOQ by product_id
        const moqMap = {};
        moqData.forEach(row => {
            if (!moqMap[row.product_id]) moqMap[row.product_id] = [];
            moqMap[row.product_id].push({
                min_qty: row.min_qty,
                ppu: parseFloat(row.ppu)
            });
        });

        // Attach MOQ to each cart item
        const cartItemsWithMoq = cartItems.map(item => ({
            ...item,
            moq: moqMap[item.product_id] || []
        }));

        return { success: true, data: cartItemsWithMoq };

    } catch (error) {
        console.error("Error fetching cart:", error);
        return { success: false, error: 'Internal server error' };
    } finally {
        connection.release();
    }
};
