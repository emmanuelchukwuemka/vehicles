import { Pool, RowDataPacket } from "mysql2/promise";

interface UnreadCount extends RowDataPacket {
  partner_id: number;
  unreadCount: number;
}

export const getUnreadPerPartner = async (
  pool: Pool,
  user_id: number,
  isStore: boolean
): Promise<UnreadCount[]> => {
  const receiverType = isStore ? "store" : "user";

  const [rows] = await pool.query<UnreadCount[]>(
    `
    SELECT 
      sender_id AS partner_id,
      COUNT(*) AS unreadCount
    FROM chat_table
    WHERE 
      receiver_id = ?
      AND receiver_type = ?
      AND status < 2
    GROUP BY sender_id
    `,
    [user_id, receiverType]
  );

  return rows;
};
