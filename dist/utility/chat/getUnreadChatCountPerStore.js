"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnreadChatCountPerStore = void 0;
const getUnreadChatCountPerStore = async (pool, user_id, isStore) => {
    const type = isStore ? "store" : "user";
    const [rows] = await pool.query(`
    SELECT
      CASE 
        WHEN sender_type = 'store' THEN sender_id
        ELSE receiver_id
      END AS store_id,
      COUNT(*) AS unreadCount
    FROM chat_table
    WHERE 
      (
        (sender_type = ? AND sender_id = ?)
        OR 
        (receiver_type = ? AND receiver_id = ?)
      )
      AND status < 2
    GROUP BY store_id
    `, [type, user_id, type, user_id]);
    return rows;
};
exports.getUnreadChatCountPerStore = getUnreadChatCountPerStore;
