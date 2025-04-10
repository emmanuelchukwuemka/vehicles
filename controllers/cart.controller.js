require('dotenv').config();
const express = require("express")
const router = express.Router()
const service = require("../services/cart.service")
const jwt = require('jsonwebtoken');
const { jwtValidator } = require('../mw/middlewares');


router.post('/add', jwtValidator, async (req, res) => {

    try {
        const result = await service.addToCart(req);

        if (result && result.success) {

            res.status(200).json({ success: result.success });

        } else {

            const errorMessage = result.error || 'Unknown server server occurred';
            res.status(400).json({ success: false, error: errorMessage });
        }
    } catch (error) {
        console.error('Error during email verification:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/remove', jwtValidator, async (req, res) => {

    try {
        const result = await service.removeCartItem(req);

        if (result && result.success) {

            res.status(200).json({
                success:
                    result.success
            });

        } else {

            const errorMessage = result.error || 'Unknown server server occurred';
            res.status(400).json({ success: false, error: errorMessage });
        }
    } catch (error) {
        console.error('Error removing item:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/update', jwtValidator, async (req, res) => {

    try {
        const result = await service.updateCartItem(req);

        if (result && result.success) {

            res.status(200).json({
                success: result.success
            });

        } else {

            const errorMessage = result.error || 'Unknown server server occurred';
            res.status(400).json({ success: false, error: errorMessage });
        }
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.get('/fetch-cart/:user_id', jwtValidator, async (req, res) => {

    try {
        const result = await service.getCart(req);

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
        console.error('Error fetching cart:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


module.exports = router