"use strict";
const { pool } = require("../../connection/db");
module.exports.getProductFilters = async (productId) => {
    try {
        if (!productId)
            return [];
        const ids = Array.isArray(productId) ? productId : [productId];
        // Step 1: Get filters associated with products
        const [productFilterRows] = await pool.query(`SELECT product_id, filter_id FROM product_filters WHERE product_id IN (?)`, [ids]);
        if (!productFilterRows.length)
            return [];
        const filterIds = [...new Set(productFilterRows.map(row => row.filter_id))];
        // Step 2: Get filter details
        const [filterDetails] = await pool.query(`SELECT id, name FROM filters_table WHERE id IN (?)`, [filterIds]);
        // Map filter ID to filter details
        const filterMap = {};
        filterDetails.forEach(f => {
            filterMap[f.id] = f;
        });
        // Step 3: Return result as a mapping: { product_id: [filters] }
        const result = {};
        productFilterRows.forEach(({ product_id, filter_id }) => {
            if (!result[product_id])
                result[product_id] = [];
            if (filterMap[filter_id])
                result[product_id].push(filterMap[filter_id]);
        });
        return result;
    }
    catch (error) {
        console.error("Error fetching product filters:", error);
        return [];
    }
};
