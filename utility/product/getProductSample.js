const { pool } = require("../../connection/db");

module.exports.getProductSample = async function (product_id) {
    try {
        const [sample] = await pool.query(
            `SELECT min_qty, ppu FROM product_sample WHERE product_id = ? LIMIT 1`,
            [product_id]
        );
        return sample || null;
    } catch (error) {
        console.error("Error fetching product sample:", error);
        return null;
    }
};