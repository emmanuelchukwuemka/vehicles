const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const axios = require("axios");
const userRouter = require("./controllers/users.controller");
const cartRouter = require("./controllers/cart.controller");
const sellerRouter = require("./controllers/seller.controller");
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

// Middleware to parse JSON
app.use(bodyParser.json({ limit: "500kb" }));

app.use(checkPayload);
//app.use(requestTimer)

app.use("/user", userRouter);

app.use("/cart", cartRouter);

app.use("/seller", sellerRouter);

app.use("/product", productRouter);

app.use("/category", categoryRouter);

app.use("/admin", adminRouter);

app.use("/chat", chatRouter);

// WebSocket logic
const connectedUsers = new Map();

io.on("connection", (socket) => {
  console.log("🔌 New socket connected:", socket.id);

  socket.on("join", (userId) => {
    if (!connectedUsers.has(userId)) {
      connectedUsers.set(userId, new Set());
    }
    connectedUsers.get(userId).add(socket.id);
    console.log(`👤 User ${userId} joined with socket ID: ${socket.id}`);
  });

  socket.on("send_message", async (data) => {
    const { sender_id, receiver_id, is_product, message } = data;

    try {
      // Save message to DB
      const chatMsg = is_product ? JSON.stringify(message) : message;

      const [result] = await pool.query(
        `
        INSERT INTO chat_table (sender_id, receiver_id, message, is_product, status)
        VALUES (?, ?, ?, ?, 1)
      `,
        [sender_id, receiver_id, chatMsg, is_product ? 1 : 0]
      );

      const insertedId = result.insertId;

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

      // Emit to both users
      const senderSockets = connectedUsers.get(sender_id);
      const receiverSockets = connectedUsers.get(receiver_id);

      console.log("Sender Sockets:", senderSockets);
      console.log("Receiver Sockets:", receiverSockets);

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
    console.log("receiver_id=>", receiver_id);
    console.log("sender_id=>", sender_id);

    try {
      await pool.query(
        `UPDATE chat_table SET status = 2 WHERE receiver_id = ? AND sender_id = ? AND status < 2`,
        [receiver_id, sender_id]
      );

      // Emit only to the sender
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

// Start server with both HTTP and WebSocket support
server.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
