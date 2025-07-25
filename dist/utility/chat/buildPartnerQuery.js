"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPartnerQuery = buildPartnerQuery;
function buildPartnerQuery(isStore) {
    if (isStore) {
        /* Store is logged‑in → list the USERS it chats with */
        return {
            sql: `
          SELECT
            u.id AS partner_id,
            CONCAT(u.first_name,' ',u.last_name) AS partner_name,
            u.picture AS partner_avatar,
            c.id,  
            c.sender_id,  
            c.receiver_id,
            c.sender_type,
            c.receiver_type,
            c.message, 
            c.created_at,
            c.status,
            c.is_product
          FROM chat_table c
          JOIN (
            SELECT 
              MAX(id) AS last_chat_id,
              CASE WHEN sender_type='user' THEN sender_id
                   ELSE receiver_id END AS user_id
            FROM chat_table
            WHERE (sender_type='store' AND sender_id=?) 
               OR (receiver_type='store' AND receiver_id=?)
            GROUP BY user_id
          ) latest ON latest.last_chat_id = c.id
          JOIN users_table u ON u.id = latest.user_id
          ORDER BY c.created_at DESC`,
            params: (id) => [id, id],
        };
    }
    /* User is logged‑in → list the STORES they chat with */
    return {
        sql: `
        SELECT
          s.id        AS partner_id,
          s.name      AS partner_name,
          s.logo      AS partner_avatar,
  
          c.id,
          c.sender_id,  c.receiver_id,
          c.sender_type,c.receiver_type,
          c.message,    c.created_at,
          c.status,     c.is_product
        FROM chat_table c
        JOIN (
          SELECT 
            MAX(id) AS last_chat_id,
            CASE WHEN sender_type='store' THEN sender_id
                 ELSE receiver_id END AS store_id
          FROM chat_table
          WHERE (sender_type='user' AND sender_id=?)
             OR (receiver_type='user' AND receiver_id=?)
          GROUP BY store_id
        ) latest ON latest.last_chat_id = c.id
        JOIN stores_table s ON s.id = latest.store_id
        ORDER BY c.created_at DESC`,
        params: (id) => [id, id],
    };
}
