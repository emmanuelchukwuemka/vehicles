import { Pool } from "mysql2/promise";
import { UnreadCount } from "../../types/chat";

export const getUnreadChatCountPerStore = async (
  pool: Pool,
  user_id: number,
  isStore: boolean
): Promise<UnreadCount[]> => {
  const type = isStore ? "store" : "user";

  const [rows] = await pool.query<UnreadCount[]>(
    `
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
    `,
    [type, user_id, type, user_id]
  );

  return rows as UnreadCount[];
};
