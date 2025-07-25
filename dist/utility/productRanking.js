"use strict";
const { pool } = require("../connection/db");
// Fetch best-selling product IDs for a given store
module.exports.getBestSellingProductIds = async (store_id, limit = 10) => {
    try {
        const [rows] = await pool.query(`SELECT oi.product_id, SUM(oi.quantity) as total_sold
             FROM order_items oi
             INNER JOIN orders_table o ON o.id = oi.order_id
             WHERE oi.store_id = ? AND o.delivery_status = 'delivered'
             GROUP BY oi.product_id
             ORDER BY total_sold DESC
             LIMIT ?`, [store_id, limit]);
        return rows.map((r) => r.product_id);
    }
    catch (err) {
        console.error("Error in getBestSellingProductIds:", err);
        return [];
    }
};
