"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const getUserById = async (pool, userId) => {
    const [rows] = await pool.query(`SELECT * FROM users_table WHERE id = ? LIMIT 1`, [userId]);
    return rows.length > 0 ? rows[0] : null;
};
exports.getUserById = getUserById;
