require('dotenv').config();
const express = require("express")
const router = express.Router()
const service = require("../services/chat.service")
const jwt = require('jsonwebtoken');
const { jwtValidator } = require('../mw/middlewares');


router.post('/send', async (req, res) => {

    try {
        const result = await service.sendMessage(req);

        if (result && result.success) {

            res.status(200).json({
                success: result.success,
                data: result.data
            });

        } else {

            const errorMessage = result.error || 'Unknown server server occurred';
            res.status(400).json({ success: false, error: errorMessage });
        }
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/fetch', async (req, res) => {

    try {
        const result = await service.fetchMessages(req);
        if (result && result.success) {
            res.status(200).json({
                success: result.success,
                data: result.data
            });

        } else {

            const errorMessage = result.error || 'Unknown server server occurred';
            res.status(400).json({ success: false, error: errorMessage });
        }
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/chatList', async (req, res) => {

    try {
        const result = await service.fetchChatList(req);
        if (result && result.success) {
            res.status(200).json({
                success: result.success,
                data: result.data
            });

        } else {

            const errorMessage = result.error || 'Unknown server server occurred';
            res.status(400).json({ success: false, error: errorMessage });
        }
    } catch (error) {
        console.error('Error fetching chats list:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


module.exports = router