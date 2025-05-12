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
