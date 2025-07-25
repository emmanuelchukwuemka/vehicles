"use strict";
module.exports.getStoreTrendingProducts = async (pool, store_id, limit = 10, days = 30) => {
    try {
        const [rows] = await pool.query(`SELECT 
           oi.product_id,
           p.name,
           SUM(oi.quantity) AS total_sold,
           MAX(o.created_at) AS last_ordered_at
         FROM order_items oi
         JOIN orders_table o ON o.id = oi.order_id
         JOIN products_table p ON p.id = oi.product_id
         WHERE 
           oi.store_id = ?
           AND o.payment_status = 'paid'
           AND o.created_at >= NOW() - INTERVAL ? DAY
         GROUP BY oi.product_id
         ORDER BY total_sold DESC
         LIMIT ?`, [store_id, days, limit]);
        return {
            success: true,
            data: rows,
        };
    }
    catch (error) {
        console.error("Error fetching trending products:", error);
        return {
            success: false,
            error: "An error occurred while fetching trending products",
        };
    }
};
