const express = require("express")
const router = express.Router()
const service = require("../services/users.service.js")
require('dotenv').config();
const { reloadController } = require("../helpers/dataReload.controller.js");


router.post("/create-account", async (req, res) => {

    try {

        const result = await service.create_account(req);

        if (result && result.success) {

            res.json({
                success: true,
                data: result.data
            });

        } else {

            const errorMessage = result.error || 'Error connecting to the server';
            res.status(400).json({ success: false, error: errorMessage });
        }

    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).send('Internal Server Error');
    }

})

router.post("/login", async (req, res) => {

    try {
        const response = await service.login_User(req);

        if (response && response.success) {

            reloadController(res, response)

        } else {

            const errorMessage = response.error || 'Error establishing connection to the server';
            res.status(401).json({ success: false, error: errorMessage });
        }

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }

});

router.get("/fetch-stores", async (req, res) => {

    try {

        const result = await service.fetch_stores(req);

        if (result && result.success && result.data.length) {

            const stores = result.data.map(store => {

                const id = store.id;
                const code = store.code;
                const name = store.name
                const logo = store.logo
                const net_worth = parseFloat(store.net_worth)
                const staff_count = store.staff_count
                const is_verified = store.is_verified
                const verified_date = store.verified_date
                const capabilities = store.capabilities
                const products = store.products
                const status = parseInt(store.status)


                return {
                    id,
                    code,
                    name,
                    logo,
                    net_worth,
                    staff_count,
                    is_verified,
                    verified_date,
                    capabilities,
                    status,
                    products
                }
            });

            res.json({
                success: true,
                data: stores
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

router.get("/filter-stores-cat/:filter_type/:filter_id", async (req, res) => {

    try {

        const result = await service.filter_stores_by_category(req);

        if (result && result.success && result.data.length) {

            const stores = result.data.map(store => {

                const id = store.id;
                const code = store.code;
                const name = store.name
                const logo = store.logo
                const net_worth = parseFloat(store.net_worth)
                const staff_count = store.staff_count
                const is_verified = store.is_verified
                const verified_date = store.verified_date
                const capabilities = store.capabilities
                const products = store.products
                const status = parseInt(store.status)


                return {
                    id,
                    code,
                    name,
                    logo,
                    net_worth,
                    staff_count,
                    is_verified,
                    verified_date,
                    capabilities,
                    status,
                    products
                }
            });

            res.json({
                success: true,
                data: stores
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

router.post("/filter-stores-caps", async (req, res) => {

    try {

        const result = await service.filter_stores_by_capabilities(req);

        if (result && result.success && result.data.length) {

            const stores = result.data.map(store => {

                const id = store.id;
                const code = store.code;
                const name = store.name
                const logo = store.logo
                const net_worth = parseFloat(store.net_worth)
                const staff_count = store.staff_count
                const is_verified = store.is_verified
                const verified_date = store.verified_date
                const capabilities = store.capabilities
                const products = store.products
                const status = parseInt(store.status)


                return {
                    id,
                    code,
                    name,
                    logo,
                    net_worth,
                    staff_count,
                    is_verified,
                    verified_date,
                    capabilities,
                    status,
                    products
                }
            });

            res.json({
                success: true,
                data: stores
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

router.post("/filter-stores-cat-cap", async (req, res) => {

    try {

        const result = await service.fetchStoresNew(req);

        if (result && result.success && result.data.length) {

            const stores = result.data.map(store => {

                const id = store.id;
                const code = store.code;
                const name = store.name
                const logo = store.logo
                const net_worth = parseFloat(store.net_worth)
                const staff_count = store.staff_count
                const is_verified = store.is_verified
                const verified_date = store.verified_date
                const capabilities = store.capabilities
                const products = store.products
                const status = parseInt(store.status)


                return {
                    id,
                    code,
                    name,
                    logo,
                    net_worth,
                    staff_count,
                    is_verified,
                    verified_date,
                    capabilities,
                    status,
                    products
                }
            });

            res.json({
                success: true,
                data: stores
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

router.get('/capabilities', async (req, res) => {

    try {
        const result = await service.fetch_capabilities(req);

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
        console.error('Error fetching capabilities:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.get('/store-products/:store_id', async (req, res) => {

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
        console.error('Error fetching store products:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.get('/products/:product_id', async (req, res) => {

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

router.get('/variations/:product_id', async (req, res) => {

    try {
        const result = await service.fetch_product_variation(req);

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

router.get('/store-collections/:store_id', async (req, res) => {

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

router.get('/default-filters', async (req, res) => {

    try {
        const result = await service.fetch_default_filters(req);

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
        console.error('Error fetching filters:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/store-follow-like', async (req, res) => {

    try {
        const result = await service.follow_and_like_stores(req);

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

router.get('/product-review/:product_id', async (req, res) => {

    try {
        const result = await service.get_product_reviews(req);

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
        console.error('Error fetching product reviews:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/product-review', async (req, res) => {

    try {
        const result = await service.give_product_review(req);

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
        console.error('Error giving product reviews:', error);
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

router.post('/store-review', async (req, res) => {

    try {
        const result = await service.give_store_review(req);

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
        console.error('Error giving store reviews:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.get('/shipping', async (req, res) => {

    try {
        const result = await service.get_shipping_methods(req);

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
        console.error('Error fetching shipping methods:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.get('/shipping/providers', async (req, res) => {

    try {
        const result = await service.get_shipping_providers(req);

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
        console.error('Error fetching shipping providers:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});





module.exports = router