require('dotenv').config();
const express = require("express")
const router = express.Router()
const service = require("../services/seller.service.js")
const jwt = require('jsonwebtoken');


// Access the secret key


router.post('/create-seller', async (req, res) => {
    const data = req.body;

    try {
        const result = await service.create_seller(data);

        if (result && result.success) {

            res.status(200).json({ success: result.success });

        } else {

            const errorMessage = result.error || 'Unknown server server occurred';
            res.status(400).json({ success: false, message: errorMessage });
        }
    } catch (error) {
        console.error('Error during email verification:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

router.post('/add-product', async (req, res) => {
    const data = req.body;

    try {
        const result = await service.addCharges(data);

        if (result && result.success) {

            res.status(200).json({ success: result.success });

        } else {

            const errorMessage = result.error || 'Unknown server server occurred';
            res.status(400).json({ success: false, message: errorMessage });
        }
    } catch (error) {
        console.error('Error during email verification:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


module.exports = router