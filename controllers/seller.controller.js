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

router.post("/fetch-single-store", async (req, res) => {

    try {

        const result = await service.fetch_single_store(req);

        if (result && result.success) {

           res.status(200).json({
                success: result.success,
                data: result.data
            });

        } else {

            const errorMessage = result.error || 'Error establishing connection to the server';
            res.status(400).json({ success: false, error: errorMessage });
        }

    } catch (error) {
        console.error('Error fetching store:', error);
        res.status(500).send('Internal Server Error');
    }

})

router.post('/product/add', async (req, res) => {

    try {
        const result = await service.createBaseProduct(req);

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

router.post('/product/variation/add', async (req, res) => {

    try {
        const result = await service.createProductVariation(req);

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
        console.error('Error creating variation:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post("/fetch-stores", async (req, res) => {

    try {

        const result = await service.fetchStores(req);

        if (result && result.success && result.data.length) {

            const stores = result.data.map(store => {

                const id = store.id;
                const code = store.code;
                const name = store.name
                const logo = store.logo
                const net_worth = parseFloat(store.net_worth)
                const created_at = store.created_at
                const floor_space = store.floor_space
                const staff_count = store.staff_count
                const is_verified = store.is_verified
                const capabilities = store.capabilities
                const products = store.products
                const status = parseInt(store.status)


                return {
                    id,
                    code,
                    name,
                    logo,
                    net_worth,
                    floor_space,
                    staff_count,
                    is_verified,
                    created_at,
                    capabilities,
                    status,
                    products
                }
            });

            res.json({
                success: true,
                data: result.data
            });

        } else {

            const errorMessage = result.error || 'Error establishing connection to the server';
            res.status(400).json({ success: false, error: errorMessage });
        }

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).send('Internal Server Error');
    }

})

router.post("/fetch-stores-test", async (req, res) => {

    try {

        const result = await service.fetchStoresTest(req);

        if (result && result.success && result.data.length) {

            res.json({
                success: true,
                data: result.data
            });

        } else {

            const errorMessage = result.error || 'Error establishing connection to the server';
            res.status(400).json({ success: false, error: errorMessage });
        }

    } catch (error) {
        console.error('Error fetching stores:', error);
        res.status(500).send('Internal Server Error');
    }

})

router.post('/store-collections', async (req, res) => {

    try {
        const result = await service.fetch_store_collections(req);

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
        console.error('Error fetching store collection:', error);
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

router.get('/store-review/:store_id', async (req, res) => {

    try {
        const result = await service.get_store_reviews(req);

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
        console.error('Error fetching store reviews:', error);
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

router.post('/gallery/fetch', async (req, res) => {

    try {
        const result = await service.fetchStoreGallery(req);

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

router.post('/load-app', async (req, res) => {

    try {
        const result = await service.loadApp(req);

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
        console.error('Error fetching resources:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = router