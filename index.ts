import { Socket, Server } from "socket.io";
import { ChatRow } from "./types/chat";

const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
require("dotenv").config();
const marketRouter = require("./controllers/markets.controller");
const userRouter = require("./controllers/users.controller");
const cartRouter = require("./controllers/cart.controller");
const sellerRouter = require("./controllers/seller.controller");
const vendorRouter = require("./controllers/vendor.controller");
const productRouter = require("./controllers/product.controller");
const categoryRouter = require("./controllers/categories.controller");
const adminRouter = require("./controllers/admin.controller");
const chatRouter = require("./controllers/chat.controller");
const {
  jwtValidator,
  checkPayload,
  requestTimer,
} = require("./mw/middlewares");
const { pool } = require("./connection/db");

const app = express();

const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // In production, replace with your frontend URL
    methods: ["GET", "POST"],
  },
});

const port = process.env.APP_PORT_NUMBER;

// setInterval(async () => {
//   try {
//     await pool.query("SELECT 1");
//     console.log("DB keep-alive ping success");
//   } catch (err) {
//     console.error("DB keep-alive ping failed:", err);
//   }
// }, 60 * 4000); // every 60 seconds

app.set("io", io);

app.set("pool", pool);

// Middleware to parse JSON
app.use(bodyParser.json({ limit: "500kb" }));

app.use(checkPayload);
//app.use(requestTimer)

app.use("/market", marketRouter);

app.use("/user", userRouter);

app.use("/cart", jwtValidator, cartRouter);

app.use("/seller", sellerRouter);

app.use("/vendor", vendorRouter);

app.use("/product", productRouter);

app.use("/category", categoryRouter);

app.use("/admin", adminRouter);

app.use("/chat", chatRouter);

// WebSocket logic
const connectedUsers = new Map();
app.set("connectedUsers", connectedUsers); // Map<userId, socketIds[]>

io.on("connection", (socket: Socket) => {
  console.log("🔌 New socket connected:", socket.id);

  socket.on("join", (userId: number) => {
    if (!connectedUsers.has(userId)) {
      connectedUsers.set(userId, new Set<string>());
    }
    connectedUsers.get(userId).add(socket.id);
    console.log(`👤 User ${userId} joined with socket ID: ${socket.id}`);
  });

  // socket.on("send_message", async (data: ChatRow) => {
  //   const {
  //     sender_id,
  //     receiver_id,
  //     is_product,
  //     sender_type,
  //     receiver_type,
  //     message,
  //   } = data;

  //   console.log("server-req=>", data);

  //   try {
  //     // Save message to DB
  //     const chatMsg = is_product ? JSON.stringify(message) : message;

  //     const [result] = await pool.query(
  //       `
  //       INSERT INTO chat_table (sender_id, receiver_id, sender_type, receiver_type, message, is_product, status)
  //       VALUES (?, ?, ?, ?, ?, ?, 1)
  //     `,
  //       [
  //         sender_id,
  //         receiver_id,
  //         sender_type,
  //         receiver_type,
  //         chatMsg,
  //         is_product ? 1 : 0,
  //       ]
  //     );

  //     const insertedId = result.insertId;

  //     // Fetch full inserted message from DB
  //     const [rows] = await pool.query(
  //       `
  //       SELECT id, sender_id, receiver_id, message, is_product, status, created_at
  //       FROM chat_table
  //       WHERE id = ?
  //     `,
  //       [insertedId]
  //     );

  //     const messageData = rows[0];
  //     messageData.message = messageData.is_product
  //       ? JSON.parse(messageData.message)
  //       : messageData.message;

  //     // Emit to both users
  //     const senderSockets = connectedUsers.get(sender_id);
  //     const receiverSockets = connectedUsers.get(receiver_id);

  //     console.log("Sender Sockets:", senderSockets);
  //     console.log("Receiver Sockets:", receiverSockets);

  //     if (receiverSockets) {
  //       receiverSockets.forEach((sockId: string) =>
  //         io.to(sockId).emit("receive_message", messageData)
  //       );
  //     }

  //     if (senderSockets) {
  //       senderSockets.forEach((sockId: string) =>
  //         io.to(sockId).emit("receive_message", messageData)
  //       );
  //     }
  //   } catch (err) {
  //     console.error("DB Chat Error:", err);
  //     socket.emit("chat_error", { error: "Failed to send message." });
  //   }
  // });

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

      const insertedId = result.insertId;

      // Insert attachments (if any)
      if (attachments.length > 0) {
        console.log("has attachment:", attachments);
        const values = attachments.map(({ name, type, url }) => [
          insertedId, // identifier
          "chat", // source
          url,
          type,
          name,
        ]);
        await pool.query(
          `
          INSERT INTO attachment_table (identifier, source, attachment, type, name)
          VALUES ?
          `,
          [values]
        );
      }

      console.log("No attachment:", attachments);

      // Fetch full inserted message from DB
      const [rows] = await pool.query(
        `
        SELECT id, sender_id, receiver_id, message, is_product, status, created_at
        FROM chat_table
        WHERE id = ?
        `,
        [insertedId]
      );

      const messageData = rows[0];
      messageData.message = messageData.is_product
        ? JSON.parse(messageData.message)
        : messageData.message;

      // Optional: include attachments in the emitted message
      messageData.attachments = attachments;

      // Emit to both users
      const senderSockets = connectedUsers.get(sender_id);
      const receiverSockets = connectedUsers.get(receiver_id);

      if (receiverSockets) {
        receiverSockets.forEach((sockId: string) =>
          io.to(sockId).emit("receive_message", messageData)
        );
      }

      if (senderSockets) {
        senderSockets.forEach((sockId: string) =>
          io.to(sockId).emit("receive_message", messageData)
        );
      }
    } catch (err) {
      console.error("DB Chat Error:", err);
      socket.emit("chat_error", { error: "Failed to send message." });
    }
  });

  socket.on("message_seen", async ({ receiver_id, sender_id }) => {
    console.log("seen_receiver=>", receiver_id);
    console.log("seen_sender=>", sender_id);

    try {
      await pool.query(
        `UPDATE chat_table SET status = 2 WHERE receiver_id = ? AND sender_id = ? AND status < 2`,
        [receiver_id, sender_id]
      );

      // Emit only to the sender
      const senderSockets = connectedUsers.get(sender_id);

      if (senderSockets) {
        senderSockets.forEach((sockId: string) =>
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

// Start server with both HTTP and WebSocket support
server.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
