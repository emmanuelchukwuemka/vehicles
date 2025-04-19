require('dotenv').config();
const express = require("express")
const router = express.Router()
const service = require("../services/seller.service")
const jwt = require('jsonwebtoken');


// Access the secret key


router.post('/create-vendor', async (req, res) => {

    try {
        const result = await service.create_vendor(req);

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
        console.error('Error during email verification:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/create-store', async (req, res) => {
    const data = req.body;

    try {
        const result = await service.create_store(req);

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
        console.error('Error during email verification:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/add-collection', async (req, res) => {
    const data = req.body;

    try {
        const result = await service.add_collection(req);

        if (result && result.success) {

            res.status(200).json({
                success: result.success,
                data: result.data
            });

        } else {

            const errorMessage = result.error || 'Unknown server error occurred';
            res.status(400).json({ success: false, error: errorMessage });
        }
    } catch (error) {
        console.error('Error creating collection:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/product', async (req, res) => {

    try {
        const result = await service.add_product(req);

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
        console.error('Error creating product:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.get('/store-products', async (req, res) => {

    try {
        const result = await service.fetch_store_products(req);

        if (result && result.success) {

            res.status(200).json({
                success: result.success,
                data: result.data
            });

        } else {

            const errorMessage = result.error || 'Unknown server occurred';
            res.status(400).json({ success: false, error: errorMessage });
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/live/save', async (req, res) => {

    try {
        const result = await service.save_live(req);

        if (result && result.success) {

            res.status(200).json({
                success: result.success,
                data: result.data
            });

        } else {

            const errorMessage = result.error || 'Unknown server occurred';
            res.status(400).json({ success: false, error: errorMessage });
        }
    } catch (error) {
        console.error('Error saving live data:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.get('/products/:product_id', async (req, res) => {

    try {
        const result = await service.fetch_product(req);

        if (result && result.success) {

            res.status(200).json({
                success: result.success,
                data: result.data
            });

        } else {

            const errorMessage = result.error || 'Unknown server occurred';
            res.status(400).json({ success: false, error: errorMessage });
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = router