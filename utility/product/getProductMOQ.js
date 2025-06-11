const { pool } = require("../../connection/db");

module.exports.getProductMOQ = async (productIds) => {
    try {
        if (!productIds) return [];

        // Convert single ID to array
        const ids = Array.isArray(productIds) ? productIds : [productIds];

        const [rows] = await pool.query(
            `SELECT product_id, min_qty, ppu FROM product_moq WHERE product_id IN (?)`,
            [ids]
        );

        return rows;
    } catch (error) {
        console.error("Error fetching product MOQ:", error);
        return [];
    }
};