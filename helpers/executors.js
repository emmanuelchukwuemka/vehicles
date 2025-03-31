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

