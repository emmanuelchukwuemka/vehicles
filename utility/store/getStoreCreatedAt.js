const { pool } = require("../../connection/db");

module.exports.getStoreCreatedAt = async (store_id) => {
    try {
        const [rows] = await pool.query(
            `SELECT created_at FROM stores_table WHERE id = ? AND status = 1`,
            [store_id]
        );

        if (rows.length === 0) {
            return null; // store not found or inactive
        }

        return rows[0].created_at;
    } catch (error) {
        console.error('Error fetching store created_at:', error);
        return null;
    }
};