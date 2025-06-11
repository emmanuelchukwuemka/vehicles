module.exports.getChats = async (connection, user_id, receiver_id) => {
    //const { user_id, store_id } = req.query;

    if (!user_id || !receiver_id) {
        return {
            success: false,
            error: "Missing user_id or store_id."
        };
    }

    try {
        // Get store owner's user ID
        const [storeRows] = await connection.query(
            "SELECT id FROM stores_table WHERE id = ? AND status = 1 LIMIT 1",
            [receiver_id]
        );

        if (storeRows.length === 0) {
            return {
                success: false,
                error: "Store not found or inactive."
            };
        }

        const storeOwnerId = storeRows[0].id;

        // Fetch chat messages between user and store owner
        const [chatRows] = await connection.query(
            `
      SELECT id, sender_id, receiver_id, message, is_product, status, created_at
      FROM chat_table
      WHERE 
        (sender_id = ? AND receiver_id = ?)
        OR
        (sender_id = ? AND receiver_id = ?)
      ORDER BY created_at ASC
      `,
            [user_id, storeOwnerId, storeOwnerId, user_id]
        );

        // Parse product messages
        const formattedChats = chatRows.map(chat => ({
            ...chat,
            message: chat.is_product ? JSON.parse(chat.message) : chat.message
        }));

        return {
            success: true,
            data: formattedChats
        };

    } catch (error) {
        console.error("Fetch Chat Error:", error);
        return {
            success: false,
            error: "Unable to fetch messages."
        };
    }
};