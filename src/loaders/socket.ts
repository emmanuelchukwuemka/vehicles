// socket.ts
import { Server, Socket } from "socket.io";
import { ChatRow } from "../modules/chat/chat.types";
import { Pool } from "mysql2/promise";

export const connectedUsers = new Map<number, Set<string>>();

export const initSocket = (io: Server, pool: Pool) => {
  io.on("connection", (socket: Socket) => {
    console.log("🔌 New socket connected:", socket.id);

    socket.on("join", (userId: number) => {
      if (!connectedUsers.has(userId)) {
        connectedUsers.set(userId, new Set<string>());
      }
      connectedUsers.get(userId)?.add(socket.id);
      console.log(`👤 User ${userId} joined with socket ID: ${socket.id}`);
    });

    socket.on("send_message", async (data: ChatRow) => {
      const {
        sender_id,
        receiver_id,
        is_product,
        sender_type,
        receiver_type,
        message,
        attachments = [],
      } = data;

      try {
        const chatMsg = is_product ? JSON.stringify(message) : message;

        const [result] = await pool.query(
          `
          INSERT INTO chat_table (sender_id, receiver_id, sender_type, receiver_type, message, is_product, status)
          VALUES (?, ?, ?, ?, ?, ?, 1)
          `,
          [
            sender_id,
            receiver_id,
            sender_type,
            receiver_type,
            chatMsg,
            is_product ? 1 : 0,
          ]
        );

        const insertedId = (result as any).insertId;

        // Save attachments
        if (attachments.length > 0) {
          const values = attachments.map(({ name, type, url }) => [
            insertedId,
            "chat",
            url,
            type,
            name,
          ]);
          await pool.query(
            `INSERT INTO attachment_table (identifier, source, attachment, type, name) VALUES ?`,
            [values]
          );
        }

        const [rows] = await pool.query(
          `
          SELECT id, sender_id, receiver_id, message, is_product, status, created_at
          FROM chat_table
          WHERE id = ?
          `,
          [insertedId]
        );

        const messageData = (rows as any)[0];
        messageData.message = messageData.is_product
          ? JSON.parse(messageData.message)
          : messageData.message;
        messageData.attachments = attachments;

        const senderSockets = connectedUsers.get(sender_id);
        const receiverSockets = connectedUsers.get(receiver_id);

        if (receiverSockets) {
          receiverSockets.forEach((sockId) =>
            io.to(sockId).emit("receive_message", messageData)
          );
        }

        if (senderSockets) {
          senderSockets.forEach((sockId) =>
            io.to(sockId).emit("receive_message", messageData)
          );
        }
      } catch (err) {
        console.error("DB Chat Error:", err);
        socket.emit("chat_error", { error: "Failed to send message." });
      }
    });

    socket.on("message_seen", async ({ receiver_id, sender_id }) => {
      try {
        await pool.query(
          `UPDATE chat_table SET status = 2 WHERE receiver_id = ? AND sender_id = ? AND status < 2`,
          [receiver_id, sender_id]
        );

        const senderSockets = connectedUsers.get(sender_id);
        if (senderSockets) {
          senderSockets.forEach((sockId) =>
            io.to(sockId).emit("message_seen_ack", {
              sender_id,
              status: 2,
              receiver_id,
            })
          );
        }
      } catch (err) {
        console.error("Error updating message status:", err);
      }
    });

    socket.on("disconnect", () => {
      for (const [userId, sockets] of connectedUsers.entries()) {
        sockets.delete(socket.id);
        if (sockets.size === 0) {
          connectedUsers.delete(userId);
        }
      }
      console.log(`❌ Socket ${socket.id} disconnected`);
    });
  });
};
