const { pool } = require("../connection/db");

module.exports.getRankedProductsByStore = async (store_id) => {
    try {
        const [rows] = await pool.query(
            `SELECT 
                oi.product_id,
                SUM(oi.quantity) AS total_sold
             FROM order_items oi
             INNER JOIN orders_table o ON o.id = oi.order_id
             WHERE oi.store_id = ?
               AND o.payment_status = 'paid'
             GROUP BY oi.product_id
             ORDER BY total_sold DESC`,
            [store_id]
        );

        console.log("rows=>", JSON.stringify(rows, 0, 2));

        return rows.map(row => row.product_id); // return ranked product IDs
    } catch (err) {
        console.error('Error getting ranked products:', err);
        return [];
    }
};