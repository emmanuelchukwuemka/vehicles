require('dotenv').config();
const express = require("express")
const router = express.Router()
const service = require("../services/categories.service")
const jwt = require('jsonwebtoken');
const { staticDecrypt, dynamicDecrypt } = require('../helpers/hasher');
const { staticKey, dynamicKey } = require('../helpers/keyVolt');

router.get('/main-category', async (req, res) => {

    try {
        const result = await service.fetch_mainCategory(req);

        if (result && result.success && result.data.length > 0) {

            const mainCategories = result.data.map(item => {

                const id = item.id
                const name = item._name;
                const image = item._image;
                const status = item._status;

                return {
                    id,
                    name,
                    image,
                    status: parseInt(status)
                }
            });

            res.status(200).json({
                success: result.success,
                data: mainCategories
            });

        } else {

            const errorMessage = result.error || 'Unknown server server occurred';
            res.status(400).json({ success: false, error: errorMessage });
        }
    } catch (error) {
        console.error('Error fetching main categories:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/main-category', async (req, res) => {

    try {
        const result = await service.add_mainCategory(req);

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
        console.error('Error adding main category:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.put('/main-category', async (req, res) => {

    try {
        const result = await service.update_mainCategory(req);

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
        console.error('Error updating main category:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.get('/category', async (req, res) => {

    try {
        const result = await service.fetch_category(req);

        if (result && result.success && result.data.length > 0) {

            const categories = result.data.map(item => {

                const id = item.id
                const main_category = item._maincategory;
                const name = item._name;
                const status = item._status;

                return {
                    id,
                    main_category,
                    name,
                    status: parseInt(status)
                }
            });

            res.status(200).json({
                success: result.success,
                data: categories
            });

        } else {

            const errorMessage = result.error || 'Unknown server server occurred';
            res.status(400).json({ success: false, error: errorMessage });
        }
    } catch (error) {
        console.error('Error while fetching catergories:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/category', async (req, res) => {

    try {
        const result = await service.add_category(req);

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
        console.error('Error occurred in adding category:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.put('/category', async (req, res) => {

    try {
        const result = await service.update_category(req);

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
        console.error('Error in updating category:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/sub-category', async (req, res) => {

    try {
        const result = await service.add_subCategory(req);

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
        console.error('Error adding sub category:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.get('/sub-category', async (req, res) => {

    try {
        const result = await service.fetch_subCategory(req);

        if (result && result.success && result.data.length > 0) {

            const subCategories = result.data.map(item => {

                const id = item.id
                const category_id = item._category
                const name = item._name.trim();
                const image = item._image;
                const status = item._status;

                return {
                    id,
                    category_id,
                    name,
                    image,
                    status: parseInt(status)
                }
            });

            res.status(200).json({
                success: result.success,
                data: subCategories
            });

        } else {

            const errorMessage = result.error || 'Unknown server server occurred';
            res.status(400).json({ success: false, error: errorMessage });
        }
    } catch (error) {
        console.error('Error fetching sub category:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.put('/sub-category', async (req, res) => {

    try {
        const result = await service.update_subCategory(req);

        if (result && result.success) {

            res.status(200).json({
                success: result.success,
                data: result.data
            });

        } else {

            const errorMessage = result.error || 'Unknown server server occurred';
            res.status(400).json({ success: false, message: errorMessage });
        }
    } catch (error) {
        console.error('Error updating sub category:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

router.get('/sub-extractor', async (req, res) => {

    try {
        const result = await service.sub_extractor(req);

        if (result && result.success && result.data.length > 0) {

            const subs = result.data.map(item => {

                const category_id = item.parent_id
                const name = item.name.trim()
                const image = item.image

                return {
                    category_id,
                    name,
                    image
                }
            });

            res.status(200).json({
                success: result.success,
                data: subs
            });

        } else {

            const errorMessage = result.error || 'Unknown server error occurred';
            res.status(400).json({ success: false, error: errorMessage });
        }
    } catch (error) {
        console.error('Error updating sub category:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/multi-insertion', async (req, res) => {

    try {
        const result = await service.multi_insertion(req);

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
        console.error('Error updating sub category:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = router