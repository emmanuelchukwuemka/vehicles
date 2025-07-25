const { pool } = require("../connection/db");
import dotenv from "dotenv";
dotenv.config();
import { v4 as uuid } from "uuid";
const axios = require("axios");
import { uploadToCloudinary } from "../utility/files/uploadToCloudinary";
const { getChats } = require("../utility/chat/getChats");
import { Request, Response } from "express";
import { getChatList } from "../utility/chat/getChatList";
import { getUserById } from "../utility/user/getUserById";
import { getStoreById } from "../utility/store/getStoreById";
import { v2 as cloudinary } from "cloudinary";
import { Server } from "socket.io";
import { connectedUsers } from "../socket";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports.sendMessage = async (req: Request) => {
  const { user_id, store_id, message, is_product } = req.body;

  if (!user_id || !store_id || !message) {
    return {
      success: false,
      error: "Missing required fields.",
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
        error: "Store not found or inactive.",
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

    const lastMessage = {}; //await getLatestChat(pool, user_id, store_id);

    return lastMessage;
  } catch (error) {
    console.error("Chat Err:", error);
    return {
      success: false,
      error: "Unable to send message.",
    };
  }
};

module.exports.fetchChatList = async (req: Request) => {
  const { user_id, isStore } = req.body;

  if (!user_id) {
    return {
      success: false,
      error: "Missing required fields.",
    };
  }

  try {
    const chatList = await getChatList(pool, user_id, isStore);

    //console.log(chatList);

    return {
      success: true,
      data: chatList,
    };
  } catch (error) {
    console.error("Error fetching chat list:", error);
    return {
      success: false,
      error: "Unable to fetch message list",
    };
  }
};

module.exports.fetchMessages = async (req: Request) => {
  try {
    const { user_id, partner_id, isStore } = req.body;

    if (!user_id || !partner_id) {
      return { success: false, error: "Missing user_id or partner_id." };
    }

    const partnerInfo = isStore ? await getUserById(pool, partner_id) : null;
    const messages = await getChats(pool, user_id, partner_id);

    return {
      success: true,
      data: {
        partner:
          isStore && partnerInfo ? { firstname: partnerInfo.first_name } : null,
        messages: messages.data,
      },
    };
  } catch (error) {
    console.error("FetchMessages Error:", error);
    return { success: false, error: "Failed to fetch messages." };
  }
};

// module.exports.fetchMessages = async (req: Request) => {
//   const { user_id, partner_id, isStore } = req.body;
//   //const store = await getStoreById(pool, partner_id);
//   const partnerInfo = await getUserById(pool, partner_id);
//   const messages = await getChats(pool, user_id, partner_id);
//   return {
//     success: true,
//     data: {
//       partner: isStore ? { firstname: partnerInfo?.first_name } : null,
//       messages: messages.data,
//     },
//   };
// };

module.exports.sendMessage = async (req: Request, res: Response) => {
  const io = req.app.get("io") as Server;

  try {
    const payload = JSON.parse(req.body.payload);
    const files = req.files as Express.Multer.File[];

    let uploadedFiles: { url: string; type: string; name: string }[] = [];

    if (files && files.length > 0) {
      uploadedFiles = await Promise.all(
        files.map(async (file) => {
          return await uploadToCloudinary(file); // This handles video vs image internally
        })
      );
    }

    // Save message to DB
    const chatMsg = payload.is_product
      ? JSON.stringify(payload.message)
      : payload.message;

    const [chatResult] = await pool.query(
      `
        INSERT INTO chat_table (sender_id, receiver_id, sender_type, receiver_type, message, is_product, status)
        VALUES (?, ?, ?, ?, ?, ?, 1)
      `,
      [
        payload.sender_id,
        payload.receiver_id,
        payload.sender_type,
        payload.receiver_type,
        chatMsg,
        payload.is_product ? 1 : 0,
      ]
    );

    const insertedId = (chatResult as any).insertId;

    // Save attachments
    if (uploadedFiles.length > 0) {
      const values = uploadedFiles.map(({ name, type, url }) => [
        insertedId,
        "chat",
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

    // Fetch saved message
    const [rows] = await pool.query(
      `SELECT id, sender_id, receiver_id, sender_type, receiver_type, message, is_product, status, created_at
       FROM chat_table WHERE id = ?`,
      [insertedId]
    );

    const finalMessage = rows[0];
    finalMessage.message = finalMessage.is_product
      ? JSON.parse(finalMessage.message)
      : finalMessage.message;
    finalMessage.attachments = uploadedFiles;

    // Emit to both sender and receiver
    const senderSockets = connectedUsers.get(payload.sender_id) || [];
    const receiverSockets = connectedUsers.get(payload.receiver_id) || [];

    senderSockets.forEach((socketId) =>
      io.to(socketId).emit("receive_message", finalMessage)
    );
    receiverSockets.forEach((socketId) =>
      io.to(socketId).emit("receive_message", finalMessage)
    );

    return { success: true, data: finalMessage };
  } catch (err) {
    console.error("Upload error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "File upload failed",
    };
  }
};

module.exports.uploadFilesToCloudinaryOld = async (
  req: Request,
  res: Response
) => {
  const io = req.app.get("io") as Server;

  //const { payload } = req.body;

  try {
    const payload = JSON.parse(req.body.payload);
    const files = req.files as Express.Multer.File[];
    console.log("Files", files);

    if (!files || files.length === 0) {
      return {
        success: false,
        error: "No files uploaded",
      };
    }

    //return console.log(payload);

    // Upload all files to Cloudinary
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const base64 = `data:${file.mimetype};base64,${file.buffer.toString(
          "base64"
        )}`;

        const resourceType = file.mimetype.startsWith("video")
          ? "video"
          : file.mimetype.startsWith("image")
          ? "image"
          : "raw";

        const uploadResult = await cloudinary.uploader.upload(base64, {
          public_id: uuid(),
          resource_type: resourceType,
        });

        return {
          url: uploadResult.secure_url,
          type: uploadResult.resource_type,
          name: uploadResult.original_filename,
        };
      })
    );

    // Attach uploaded file metadata to payload
    const enrichedPayload = {
      ...payload,
      attachments: uploadedFiles,
    };

    // Emit message via WebSocket (broadcast to sender & receiver if needed)
    io.emit("send_message", enrichedPayload);

    return {
      success: true,
      data: enrichedPayload,
    };
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({
      success: false,
      error: err instanceof Error ? err.message : "File upload failed",
    });
  }
};

// module.exports.uploadFilesToCloudinary = async (req: Request) => {
//   const{payload} = req.body
//   const files = req.files as Express.Multer.File[];

//   if (!files || files.length === 0) {
//     return { success: false, error: "No files uploaded" };
//   }

//   try {
//     const results = await Promise.all(
//       files.map(async (file) => {
//         const base64 = `data:${file.mimetype};base64,${file.buffer.toString(
//           "base64"
//         )}`;
//         const resourceType = file.mimetype.startsWith("video")
//           ? "video"
//           : file.mimetype.startsWith("image")
//           ? "image"
//           : "raw";

//         const uploadResult = await cloudinary.uploader.upload(base64, {
//           public_id: uuid(),
//           resource_type: resourceType,
//         });

//         console.log(uploadResult);

//         return uploadResult;
//       })
//     );

//     return { success: true, data: results };
//   } catch (err) {
//     const errorMessage = err instanceof Error ? err.message : "Upload failed";

//     return { success: false, error: errorMessage };
//   }
// };
