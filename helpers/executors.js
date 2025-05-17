require('dotenv').config();
const axios = require('axios');
const { v4: uuid } = require("uuid")
const { formatCurrency } = require('./codeGen');
const { pool } = require('../connection/db');

module.exports.categorizeReview = (req) => {

    const { review_text, rating } = req.body

    if (!review_text) return { product_quality: rating, supplier_service: rating, on_time_shipment: rating };

    const text = review_text.toLowerCase();

    // Default values start from overall rating
    let product_quality = rating;
    let supplier_service = rating;
    let on_time_shipment = rating;

    // Detect Product Quality keywords
    if (/quality|durable|good material|excellent|superior|poor material|defective|cheap/.test(text)) {
        product_quality += (rating >= 3 ? 0.5 : -0.5);
    }

    // Detect Supplier Service keywords
    if (/customer service|support|helpful|rude|not responsive|friendly|unprofessional/.test(text)) {
        supplier_service += (rating >= 3 ? 0.5 : -0.5);
    }

    // Detect On-time Shipment keywords
    if (/fast shipping|on time|delayed|late delivery|slow shipping|express delivery/.test(text)) {
        on_time_shipment += (rating >= 3 ? 0.5 : -0.5);
    }

    // Ensure ratings stay between 1.0 and 5.0
    product_quality = Math.max(1.0, Math.min(5.0, product_quality));
    supplier_service = Math.max(1.0, Math.min(5.0, supplier_service));
    on_time_shipment = Math.max(1.0, Math.min(5.0, on_time_shipment));

    return { product_quality, supplier_service, on_time_shipment };
};

module.exports.getStoreReviews = async (store_id) => {
    try {
        const [rows] = await pool.query(`
            SELECT COUNT(*) AS total_reviews, AVG(rating) AS avg_rating 
            FROM store_reviews 
            WHERE store_id = ? AND status = 1
        `, [store_id]);

        const total_reviews = rows[0]?.total_reviews || 0;
        const avg = rows[0]?.avg_rating;

        return {
            total_reviews,
            avg_rating: avg ? `${parseFloat(avg).toFixed(1)}/5` : null
        };
    } catch (err) {
        console.error("Error fetching store reviews:", err);
        return {
            total_reviews: 0,
            avg_rating: null
        };
    }
};

module.exports.getStoreCreatedAt = async (store_id) => {
    try {
        const [rows] = await pool.query(
            `SELECT created_at FROM stores_table WHERE id = ? AND status = 1`,
            [store_id]
        );

        if (rows.length === 0) {
            return null; // store not found or inactive
        }

        return rows[0].created_at;
    } catch (error) {
        console.error('Error fetching store created_at:', error);
        return null;
    }
};

module.exports.fetchProductSample = async function (product_id) {
    try {
        const [sample] = await pool.query(
            `SELECT min_qty, ppu FROM product_sample WHERE product_id = ? LIMIT 1`,
            [product_id]
        );
        return sample || null;
    } catch (error) {
        console.error("Error fetching product sample:", error);
        return null;
    }
};

module.exports.confirmCardPayment = async (payment) => {
    //const { user_id, reference, auth_value, auth_type, mode = "test" } = payment
    try {
        const response = await axios.post(
            "https://bloomzonapi-6idf.onrender.com/paystack/payment_pin_validation", payment
        );

        if (response.status !== 200 || !response.data?.status) {
            return {
                success: false,
                error: response.data?.message || "Payment verification failed"
            };
        }

        return { success: true };
    } catch (error) {
        console.error("validatePayment error:", error.response?.data || error.message);
        return {
            success: false,
            error: error.response?.data?.message || "Payment validation failed"
        };
    }
};

module.exports.saveCardPaymentMethod = async (connection, cardInfo) => {

    //console.log("card=>", JSON.stringify(cardInfo, 0, 2))

    const {
        user_id,
        method,
        brand,
        last4,
        expiry_month,
        expiry_year,
        token,
        paymentGateway_id,
        isDefaultCard
    } = cardInfo;

    try {
        if (!!isDefaultCard) {
            // Unset other default cards for the user
            await connection.query(
                `UPDATE user_payment_methods SET is_default = 0 WHERE user_id = ?`,
                [user_id]
            );
        }

        await connection.query(
            `INSERT INTO user_payment_methods 
                (user_id, method, gateway_id, brand, last4, exp_month, exp_year, token, is_default)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                user_id,
                method,
                paymentGateway_id,
                brand,
                last4,
                expiry_month,
                expiry_year,
                token,
                !!isDefaultCard ? 1 : 0
            ]
        );

        return { success: true };
    } catch (error) {
        console.error("savePaymentMethod error:", error.message);
        return {
            success: false,
            error: error.message || "Failed to save payment method"
        };
    }
};

module.exports.getProductTotalOrder = async (product_id) => {
    if (!product_id) {
        return {
            success: false,
            error: "Product ID is required"
        };
    }

    try {
        const [rows] = await pool.query(
            `SELECT SUM(quantity) AS total_quantity
             FROM order_items
             WHERE product_id = ?`,
            [product_id]
        );

        const total_quantity = rows[0]?.total_quantity || 0;

        return {
            success: true,
            data: { total_quantity }
        };
    } catch (error) {
        console.error("Error fetching total ordered quantity:", error);
        return {
            success: false,
            error: "Failed to fetch total ordered quantity"
        };
    }
};

module.exports.getProductMOQ = async (productId) => {
    try {
        if (!productId) return [];

        // Convert single ID to array
        const ids = Array.isArray(productId) ? productId : [productId];

        const [rows] = await pool.query(
            `SELECT product_id, min_qty, ppu FROM product_moq WHERE product_id IN (?)`,
            [ids]
        );

        return rows;
    } catch (error) {
        console.error("Error fetching product MOQ:", error);
        return [];
    }
};

module.exports.getProductCollection = async (productId) => {
    try {
        if (!productId) return [];

        // Normalize productId to an array
        const ids = Array.isArray(productId) ? productId : [productId];

        // Fetch product → collection_id mapping
        const [products] = await pool.query(
            `SELECT id, collection_id FROM products_table WHERE id IN (?)`,
            [ids]
        );

        const collectionIds = [...new Set(products.map(p => p.collection_id))];

        if (!collectionIds.length) return [];

        // Fetch collection details
        const [collections] = await pool.query(
            `SELECT id, name FROM collections_table WHERE id IN (?)`,
            [collectionIds]
        );

        return collections;
    } catch (error) {
        console.error("Error fetching product collections:", error);
        return [];
    }
};

module.exports.getProductFilters = async (productId) => {
    try {
        if (!productId) return [];

        const ids = Array.isArray(productId) ? productId : [productId];

        // Step 1: Get filters associated with products
        const [productFilterRows] = await pool.query(
            `SELECT product_id, filter_id FROM product_filters WHERE product_id IN (?)`,
            [ids]
        );

        if (!productFilterRows.length) return [];

        const filterIds = [...new Set(productFilterRows.map(row => row.filter_id))];

        // Step 2: Get filter details
        const [filterDetails] = await pool.query(
            `SELECT id, name FROM filters_table WHERE id IN (?)`,
            [filterIds]
        );

        // Map filter ID to filter details
        const filterMap = {};
        filterDetails.forEach(f => {
            filterMap[f.id] = f;
        });

        // Step 3: Return result as a mapping: { product_id: [filters] }
        const result = {};

        productFilterRows.forEach(({ product_id, filter_id }) => {
            if (!result[product_id]) result[product_id] = [];
            if (filterMap[filter_id]) result[product_id].push(filterMap[filter_id]);
        });

        return result;
    } catch (error) {
        console.error("Error fetching product filters:", error);
        return [];
    }
};

module.exports.getProductSubcategory = async (productIds) => {
    try {
        if (!productIds || productIds.length === 0) return [];

        const ids = Array.isArray(productIds) ? productIds : [productIds];

        // Step 1: Get subcategory IDs from products
        const [productRows] = await pool.query(
            `SELECT id as product_id, subcategory_id FROM products_table WHERE id IN (?)`,
            [ids]
        );

        const subcategoryIds = [...new Set(productRows.map(p => p.subcategory_id).filter(Boolean))];
        if (!subcategoryIds.length) return [];

        // Step 2: Get subcategory details
        const [subcategoryRows] = await pool.query(
            `SELECT id, _name AS name, _image AS image FROM subcategory WHERE id IN (?)`,
            [subcategoryIds]
        );

        const subcategoryMap = {};
        subcategoryRows.forEach(sub => {
            subcategoryMap[sub.id] = {
                id: sub.id,
                name: sub.name,
                image: sub.image
            };
        });

        // Step 3: Map back to products
        const result = {};
        productRows.forEach(({ product_id, subcategory_id }) => {
            result[product_id] = subcategoryMap[subcategory_id] || null;
        });

        return result;

    } catch (error) {
        console.error("Error fetching product subcategory:", error);
        return [];
    }
};