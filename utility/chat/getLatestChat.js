module.exports.getLatestChat = async (connection, user_id, store_id) => {
    if (!user_id || !store_id) {
        return {
            success: false,
            error: "Missing user_id or store_id."
        };
    }

    try {
        // Get store owner's user ID
        const [storeRows] = await connection.query(
            "SELECT id FROM stores_table WHERE id = ? AND status = 1 LIMIT 1",
            [store_id]
        );

        if (storeRows.length === 0) {
            return {
                success: false,
                error: "Store not found or inactive."
            };
        }

        const storeOwnerId = storeRows[0].id;

        // Fetch the LAST message between user and store owner
        const [chatRows] = await connection.query(
            `
            SELECT id, sender_id, receiver_id, message, is_product, created_at
            FROM chat_table
            WHERE 
              (sender_id = ? AND receiver_id = ?)
              OR
              (sender_id = ? AND receiver_id = ?)
            ORDER BY created_at DESC
            LIMIT 1
            `,
            [user_id, storeOwnerId, storeOwnerId, user_id]
        );

        if (chatRows.length === 0) {
            return {
                success: true,
                data: null // No messages yet
            };
        }

        const chat = chatRows[0];

        return {
            success: true,
            data: {
                ...chat,
                message: chat.is_product ? JSON.parse(chat.message) : chat.message
            }
        };

    } catch (error) {
        console.error("Fetch Last Message Error:", error);
        return {
            success: false,
            error: "Unable to fetch last message."
        };
    }
};