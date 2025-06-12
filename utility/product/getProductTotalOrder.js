const { pool } = require("../../connection/db");

module.exports.getProductTotalOrder = async (product_id) => {
    if (!product_id) {
        return {
            success: false,
            error: "Product ID is required"
        };
    }

    try {
        const [rows] = await pool.query(
            `SELECT SUM(quantity) AS total_quantity
             FROM order_items
             WHERE product_id = ?`,
            [product_id]
        );

        const total_quantity = rows[0]?.total_quantity || 0;

        return {
            success: true,
            data: total_quantity
        };
    } catch (error) {
        console.error("Error fetching total ordered quantity:", error);
        return {
            success: false,
            error: "Failed to fetch total ordered quantity"
        };
    }
};