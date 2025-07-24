const { getAttachmentsBySource } = require("../files/getAttachmentsBySource");

module.exports.getChats = async (pool, user_id, partner_id) => {
  if (!user_id || !partner_id) {
    return {
      success: false,
      error: "Missing user_id or partner_id.",
    };
  }

  try {
    // Fetch chat messages between user and store owner
    const [chatRows] = await pool.query(
      `
      SELECT id, sender_id, receiver_id, message, is_product, status, created_at
      FROM chat_table
      WHERE 
        (sender_id = ? AND receiver_id = ?)
        OR
        (sender_id = ? AND receiver_id = ?)
      ORDER BY created_at ASC
      `,
      [user_id, partner_id, partner_id, user_id]
    );

    const messageIds = chatRows.map((msg) => msg.id);
    const attachmentMap = await getAttachmentsBySource(
      pool,
      "chat",
      messageIds
    );

    // Parse product messages
    const formattedChats = chatRows.map((chat) => ({
      ...chat,
      message: chat.is_product ? JSON.parse(chat.message) : chat.message,
      attachments: attachmentMap[chat.id] || [],
    }));

    return {
      success: true,
      data: formattedChats,
    };
  } catch (error) {
    console.error("Fetch Chat Error:", error);
    return {
      success: false,
      error: "Unable to fetch messages.",
    };
  }
};
