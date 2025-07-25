"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const service = require("../services/chat.service");
//const jwt = require("jsonwebtoken");
//const { jwtValidator } = require("../mw/middlewares");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
router.post("/send", async (req, res) => {
    try {
        const result = await service.sendMessage(req);
        if (result && result.success) {
            res.status(200).json({
                success: result.success,
                data: result.data,
            });
        }
        else {
            const errorMessage = result.error || "Unknown server server occurred";
            res.status(400).json({ success: false, error: errorMessage });
        }
    }
    catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});
router.post("/fetch", async (req, res) => {
    try {
        const result = await service.fetchMessages(req);
        if (result && result.success) {
            res.status(200).json({
                success: result.success,
                data: result.data,
            });
        }
        else {
            const errorMessage = result.error || "Unknown server server occurred";
            res.status(400).json({ success: false, error: errorMessage });
        }
    }
    catch (error) {
        console.error("Error fetching chats:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});
router.post("/chatList", async (req, res) => {
    try {
        const result = await service.fetchChatList(req);
        if (result && result.success) {
            res.status(200).json({
                success: result.success,
                data: result.data,
            });
        }
        else {
            const errorMessage = result.error || "Unknown server server occurred";
            res.status(400).json({ success: false, error: errorMessage });
        }
    }
    catch (error) {
        console.error("Error fetching chats list:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});
router.post("/file-upload", upload.array("files"), async (req, res) => {
    try {
        const result = await service.sendMessage(req);
        if (result && result.success) {
            res.status(200).json({
                success: result.success,
                data: result.data,
            });
        }
        else {
            const errorMessage = result.error || "Unknown server server occurred";
            res.status(400).json({ success: false, error: errorMessage });
        }
    }
    catch (error) {
        console.error("Error uploadin file:", error);
        return { success: false, error: "Internal Server Error" };
    }
});
module.exports = router;
