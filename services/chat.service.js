const { pool } = require("../connection/db");
require('dotenv').config();
const { v4: uuid } = require("uuid")
const axios = require('axios');
const { getLatestChat } = require("../utility/chat/getLatestChat");
const { getChats } = require("../utility/chat/getChats");

module.exports.sendMessage = async (req, res) => {
    const { user_id, store_id, message, is_product } = req.body;

    if (!user_id || !store_id || !message) {
        return {
            success: false,
            error: "Missing required fields."
        };
    }

    try {

        const [storeRows] = await pool.query(
            "SELECT id FROM stores_table WHERE id = ? AND status = 1 LIMIT 1",
            [store_id]
        );

        if (storeRows.length === 0) {
            await pool.rollback();
            return {
                success: false,
                error: "Store not found or inactive."
            };
        }

        const receiver_id = storeRows[0].id;



        // Stringify message if it's a product
        const formattedMessage = is_product ? JSON.stringify(message) : message;

        await pool.query(
            `INSERT INTO chat_table (sender_id, receiver_id, message, is_product)
       VALUES (?, ?, ?, ?)`,
            [user_id, receiver_id, formattedMessage, is_product ? 1 : 0]
        );

        const lastMessage = {} //await getLatestChat(pool, user_id, store_id);

        return lastMessage

    } catch (error) {
        console.error("Chat Err:", error);
        return {
            success: false,
            error: "Unable to send message."
        };
    }
};

module.exports.fetchChatList = async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return {
            success: false,
            error: "Missing required fields."
        };
    }

    try {
        const [rows] = await pool.query(`
            SELECT 
                s.id AS store_id,
                s.name AS store_name,
                s.logo,
                c.message,
                c.created_at,
                c.status,
                c.is_product
            FROM chat_table c
            JOIN (
                SELECT 
                    MAX(id) AS last_chat_id,
                    CASE 
                        WHEN sender_type = 'store' THEN sender_id 
                        ELSE receiver_id 
                    END AS store_id
                FROM chat_table
                WHERE 
                    (sender_type = 'user' AND sender_id = ?)
                    OR 
                    (receiver_type = 'user' AND receiver_id = ?)
                GROUP BY store_id
            ) latest ON latest.last_chat_id = c.id
            JOIN stores_table s ON s.id = latest.store_id
            ORDER BY c.created_at DESC
        `, [user_id, user_id]);

        return {
            success: true,
            data: rows
        };
    } catch (error) {
        console.error("Error fetching chat list:", error);
        return {
            success: false,
            error: "Unable to fetch message list"
        };
    }
};

module.exports.fetchMessages = async (req, res) => {
    const { user_id, receiver_id } = req.body;
    const messages = await getChats(pool, user_id, receiver_id)
    return messages
};

