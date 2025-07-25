"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnreadPerPartner = void 0;
const getUnreadPerPartner = async (pool, user_id, isStore) => {
    const receiverType = isStore ? "store" : "user";
    const [rows] = await pool.query(`
    SELECT 
      sender_id AS partner_id,
      COUNT(*) AS unreadCount
    FROM chat_table
    WHERE 
      receiver_id = ?
      AND receiver_type = ?
      AND status < 2
    GROUP BY sender_id
    `, [user_id, receiverType]);
    return rows;
};
exports.getUnreadPerPartner = getUnreadPerPartner;
