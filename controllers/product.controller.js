require('dotenv').config();
const express = require("express")
const router = express.Router()
const service = require("../services/product.service")
const jwt = require('jsonwebtoken');
const multer = require('multer');

const upload = multer();


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

router.get('/:product_id', async (req, res) => {

    try {
        const result = await service.fetch_single_product(req);

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
        console.error('Error fetching store products:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/text-search', async (req, res) => {

    try {
        const result = await service.text_search_products(req);

        if (result && result.success && result.data.length > 0) {

            const products = result.data.map(product => {

                const id = product.id;
                const name = product.title
                const price = parseFloat(product.price)
                const images = product.images.split(',');

                return { id, name, price, images }
            });

            res.status(200).json({
                success: result.success,
                data: products
            });

        } else {

            const errorMessage = result.error || 'Unknown server server occurred';
            res.status(400).json({ success: false, error: errorMessage });
        }
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/image-search', upload.single('file'), async (req, res) => {

    try {
        const result = await service.image_search(req);

        if (result && result.success && result.data.len > 0) {

            res.status(200).json({
                success: result.success,
                data: result.data
            });

        } else {

            const errorMessage = result.error || 'Unknown server server occurred';
            res.status(400).json({ success: false, error: errorMessage });
        }
    } catch (error) {
        console.error('Error searching image:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/voice-search', upload.single('file'), async (req, res) => {

    try {
        const result = await service.voice_search(req);

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
        console.error('Error making voice searching:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/barcode-search', async (req, res) => {

    try {
        const result = await service.barcode_search(req);

        if (result && result.success && result.data.length > 0) {

            const products = result.data.map(product => {

                const id = product.id;
                const name = product.title
                const price = parseFloat(product.price)
                const images = product.images.split(',');

                return { id, name, price, images }
            });

            res.status(200).json({
                success: result.success,
                data: products
            });

        } else {

            const errorMessage = result.error || 'Unknown server server occurred';
            res.status(400).json({ success: false, error: errorMessage });
        }
    } catch (error) {
        console.error('Error making barcode searching:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/fetch-multiple-product', async (req, res) => {

    try {
        const result = await service.fetch_multiple_products(req);

        if (result && result.success) {

            const products = result.data.map(product => {

                const id = product.id;
                const name = product.title
                const price = parseFloat(product.price)
                const images = product.images.split(',');

                return { id, name, price, images }
            });

            res.status(200).json({
                success: result.success,
                data: products
            });

        } else {

            const errorMessage = result.error || 'Unknown server server occurred';
            res.status(400).json({ success: false, error: errorMessage });
        }
    } catch (error) {
        console.error('Error multiple products:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/live-products', async (req, res) => {

    try {
        const result = await service.fetch_live_products(req);

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
        console.error('Error fetching live products:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/live-products/single', async (req, res) => {

    try {
        const result = await service.fetch_single_live_products(req);

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
        console.error('Error fetching live products:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/like', async (req, res) => {

    try {
        const result = await service.like_product(req);

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
        console.error('Error reaching store:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/update-sample', async (req, res) => {

    try {
        const result = await service.set_product_sample(req);

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
        console.error('Error updating product sample:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/fetch-samples', async (req, res) => {

    try {
        const result = await service.get_all_product_samples(req);

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
        console.error('Error fetching samples:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});


module.exports = router