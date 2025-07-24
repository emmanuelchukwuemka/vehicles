import { Pool } from "mysql2/promise";
import { ChatPreview } from "../../types/chat";
import { buildPartnerQuery } from "./buildPartnerQuery";
import { getUnreadPerPartner } from "./getUnreadPerPartner";

export async function getChatList(
  pool: Pool,
  actorId: number,
  isStore: boolean
): Promise<ChatPreview[]> {
  const { sql, params } = buildPartnerQuery(isStore);

  const [rows] = await pool.query<ChatPreview[]>(sql, params(actorId));

  if (!rows.length) return [];

  // ✅ Transform to Record<partner_id, number>
  const unreadMap = (await getUnreadPerPartner(pool, actorId, isStore)).reduce(
    (acc, curr) => {
      acc[curr.partner_id] = curr.unreadCount;
      return acc;
    },
    {} as Record<number, number>
  );

  // ✅ unreadCount is now type-safe
  return rows.map((row) => ({
    ...row,
    unreadCount: unreadMap[row.partner_id] ?? 0,
  }));
}
