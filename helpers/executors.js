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
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
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
}

module.exports.saveCustomization = async (connection, customData) => {
    const {
        product_id,
        store_id,
        user_id,
        variation_id,
        sku,
        attr_key,
        source,
        customizations
    } = customData;

    try {
        for (const key in customizations) {
            const {
                type: customization_type,
                customization_id = null,
                value,
                settings
            } = customizations[key];

            const query = `
                INSERT INTO customizations_table (
                    product_id, store_id, user_id, variation_id, sku, attr_key,
                    source, customization_type, customization_id, value, settings
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE
                    value = VALUES(value),
                    settings = VALUES(settings),
                    updated_at = CURRENT_TIMESTAMP
            `;

            const values = [
                product_id,
                store_id,
                user_id,
                variation_id,
                sku,
                attr_key,
                source,
                customization_type,
                customization_id,
                value,
                JSON.stringify(settings)
            ];

            await connection.query(query, values);
        }

        return {
            success: true,
            data: "Customization(s) saved successfully"
        };
    } catch (error) {
        console.error('Error in saveCustomization:', error);
        return {
            success: false,
            error: "Failed to save customization"
        };
    }
};