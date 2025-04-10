require('dotenv').config();
const express = require("express")
const router = express.Router()
const service = require("../services/admin.service")
const jwt = require('jsonwebtoken');
const { dynamicKey, staticKey } = require('../helpers/keyVolt');
const { staticDecrypt, dynamicDecrypt } = require('../helpers/hasher');


router.get('/sellers', async (req, res) => {

    try {
        const result = await service.fetch_sellers(req);

        if (result && result.success && result.data.length > 0) {

            const allSellers = result.data.map(seller => {

                const _id = seller.id
                const _name = staticDecrypt(seller._name, staticKey);
                const _logo = dynamicDecrypt(seller._logo, dynamicKey);
                const _slogan = dynamicDecrypt(seller._slogan, dynamicKey);
                const _country = dynamicDecrypt(seller._country, dynamicKey);
                const _banner = dynamicDecrypt(seller._banner, dynamicKey);
                const _picture = dynamicDecrypt(seller._picture, dynamicKey);
                const _netWorth = dynamicDecrypt(seller._netWorth, dynamicKey);
                const _category = dynamicDecrypt(seller._category, dynamicKey);
                const _staffCount = dynamicDecrypt(seller._staffCount, dynamicKey);
                const _address = dynamicDecrypt(seller._address, dynamicKey);
                const _code = staticDecrypt(seller._code, staticKey);
                const _isVerified = dynamicDecrypt(seller._isVerified, dynamicKey);
                const _status = dynamicDecrypt(seller._status, dynamicKey);
                const _date = seller._date

                return {
                    _id,
                    _name,
                    _logo,
                    _slogan,
                    _country,
                    _banner,
                    _picture,
                    _netWorth: parseFloat(_netWorth),
                    _category,
                    _staffCount,
                    _address,
                    _code,
                    _isVerified: parseInt(_isVerified),
                    _status: parseInt(_status),
                    _date
                }
            });

            res.status(200).json({
                success: result.success,
                data: allSellers
            });

        } else {

            const errorMessage = result.error || 'Unknown server error occurred';
            res.status(400).json({ success: false, error: errorMessage });
        }
    } catch (error) {
        console.error('Error fetching sellers data:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/capability', async (req, res) => {

    try {
        const result = await service.create_ability(req);

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
        console.error('Error creating ability:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/filters', async (req, res) => {

    try {
        const result = await service.create_filter(req);

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
        console.error('Error creating filter:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/assign-filters-to-product', async (req, res) => {

    try {
        const result = await service.assign_filter_to_product(req);

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
        console.error('Error assigning filter:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/shipping-methods', async (req, res) => {

    try {
        const result = await service.create_shipping_method(req);

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
        console.error('Error creating shipping method:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/shipping-provider', async (req, res) => {

    try {
        const result = await service.add_shipping_provider(req);

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
        console.error('Error creating shipping provider:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});



module.exports = router