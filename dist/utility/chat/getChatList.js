"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatList = getChatList;
const buildPartnerQuery_1 = require("./buildPartnerQuery");
const getUnreadPerPartner_1 = require("./getUnreadPerPartner");
async function getChatList(pool, actorId, isStore) {
    const { sql, params } = (0, buildPartnerQuery_1.buildPartnerQuery)(isStore);
    const [rows] = await pool.query(sql, params(actorId));
    if (!rows.length)
        return [];
    // ✅ Transform to Record<partner_id, number>
    const unreadMap = (await (0, getUnreadPerPartner_1.getUnreadPerPartner)(pool, actorId, isStore)).reduce((acc, curr) => {
        acc[curr.partner_id] = curr.unreadCount;
        return acc;
    }, {});
    // ✅ unreadCount is now type-safe
    return rows.map((row) => ({
        ...row,
        unreadCount: unreadMap[row.partner_id] ?? 0,
    }));
}
