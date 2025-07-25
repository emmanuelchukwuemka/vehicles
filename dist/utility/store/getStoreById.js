"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreById = void 0;
const getStoreById = async (pool, storeId) => {
    try {
        const [rows] = await pool.query(`
      SELECT id, name, logo, email, phone
      FROM stores_table
      WHERE id = ?
      LIMIT 1
      `, [storeId]);
        return rows.length > 0 ? rows[0] : null;
    }
    catch (error) {
        console.error("Error fetching store by ID:", error);
        return null;
    }
};
exports.getStoreById = getStoreById;
