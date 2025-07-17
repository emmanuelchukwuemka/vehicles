module.exports.getChats = async (pool, sender_id, receiver_id) => {
  //const { user_id, store_id } = req.query;

  if (!sender_id || !receiver_id) {
    return {
      success: false,
      error: "Missing sender_id or receiver_id.",
    };
  }

  //console.log("sender=>", sender_id);
  //console.log("receiver=>", receiver_id);

  try {
    // Get store owner's user ID
    const [storeRows] = await pool.query(
      `SELECT id FROM stores_table WHERE id IN (?, ?) AND status = 1`,
      [sender_id, receiver_id]
    );

    if (storeRows.length === 0) {
      return {
        success: false,
        error: "Store not found or inactive.",
      };
    }

    const storeOwnerId = storeRows[0].id;

    console.log("store=>", storeRows);

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
      [sender_id, storeOwnerId, storeOwnerId, sender_id]
    );

    //console.log("chats=>", chatRows);

    // Parse product messages
    const formattedChats = chatRows.map((chat) => ({
      ...chat,
      message: chat.is_product ? JSON.parse(chat.message) : chat.message,
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
