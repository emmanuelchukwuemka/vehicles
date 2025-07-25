"use strict";
const { pool } = require("../connection/db");
module.exports.fetchStoreGallery = async (store_id) => {
    try {
        const [rows] = await pool.query(`SELECT id, url,  title FROM store_gallery WHERE store_id = ?`, [store_id]);
        return {
            success: true,
            data: rows
        };
    }
    catch (err) {
        console.error('Error fetching store gallery:', err);
        return {
            success: false,
            error: err
        };
    }
};
