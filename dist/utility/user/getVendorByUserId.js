"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkVendorByUserId = void 0;
const checkVendorByUserId = async ({ pool, user_id, }) => {
    if (!user_id) {
        throw new Error("user_id is required");
    }
    const query = `
    SELECT * FROM vendors_table
    WHERE user_id = ?
    LIMIT 1
  `;
    try {
        const [rows] = await pool.query(query, [user_id]);
        const result = rows;
        return result.length > 0 ? result[0] : null;
    }
    catch (error) {
        console.error("Error checking vendor by user_id:", error);
        throw error;
    }
};
exports.checkVendorByUserId = checkVendorByUserId;
