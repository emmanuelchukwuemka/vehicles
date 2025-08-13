"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = exports.connectedUsers = void 0;
exports.connectedUsers = new Map();
const initSocket = (io, pool) => {
    io.on("connection", (socket) => {
        console.log("🔌 New socket connected:", socket.id);
        socket.on("join", (userId) => {
            if (!exports.connectedUsers.has(userId)) {
                exports.connectedUsers.set(userId, new Set());
            }
            exports.connectedUsers.get(userId)?.add(socket.id);
            console.log(`👤 User ${userId} joined with socket ID: ${socket.id}`);
        });
        socket.on("send_message", async (data) => {
            const { sender_id, receiver_id, is_product, sender_type, receiver_type, message, attachments = [], } = data;
            try {
                const chatMsg = is_product ? JSON.stringify(message) : message;
                const [result] = await pool.query(`
          INSERT INTO chat_table (sender_id, receiver_id, sender_type, receiver_type, message, is_product, status)
          VALUES (?, ?, ?, ?, ?, ?, 1)
          `, [
                    sender_id,
                    receiver_id,
                    sender_type,
                    receiver_type,
                    chatMsg,
                    is_product ? 1 : 0,
                ]);
                const insertedId = result.insertId;
                // Save attachments
                if (attachments.length > 0) {
                    const values = attachments.map(({ name, type, url }) => [
                        insertedId,
                        "chat",
                        url,
                        type,
                        name,
                    ]);
                    await pool.query(`INSERT INTO attachment_table (identifier, source, attachment, type, name) VALUES ?`, [values]);
                }
                const [rows] = await pool.query(`
          SELECT id, sender_id, receiver_id, message, is_product, status, created_at
          FROM chat_table
          WHERE id = ?
          `, [insertedId]);
                const messageData = rows[0];
                messageData.message = messageData.is_product
                    ? JSON.parse(messageData.message)
                    : messageData.message;
                messageData.attachments = attachments;
                const senderSockets = exports.connectedUsers.get(sender_id);
                const receiverSockets = exports.connectedUsers.get(receiver_id);
                if (receiverSockets) {
                    receiverSockets.forEach((sockId) => io.to(sockId).emit("receive_message", messageData));
                }
                if (senderSockets) {
                    senderSockets.forEach((sockId) => io.to(sockId).emit("receive_message", messageData));
                }
            }
            catch (err) {
                console.error("DB Chat Error:", err);
                socket.emit("chat_error", { error: "Failed to send message." });
            }
        });
        socket.on("message_seen", async ({ receiver_id, sender_id }) => {
            try {
                await pool.query(`UPDATE chat_table SET status = 2 WHERE receiver_id = ? AND sender_id = ? AND status < 2`, [receiver_id, sender_id]);
                const senderSockets = exports.connectedUsers.get(sender_id);
                if (senderSockets) {
                    senderSockets.forEach((sockId) => io.to(sockId).emit("message_seen_ack", {
                        sender_id,
                        status: 2,
                        receiver_id,
                    }));
                }
            }
            catch (err) {
                console.error("Error updating message status:", err);
            }
        });
        socket.on("disconnect", () => {
            for (const [userId, sockets] of exports.connectedUsers.entries()) {
                sockets.delete(socket.id);
                if (sockets.size === 0) {
                    exports.connectedUsers.delete(userId);
                }
            }
            console.log(`❌ Socket ${socket.id} disconnected`);
        });
    });
};
exports.initSocket = initSocket;
