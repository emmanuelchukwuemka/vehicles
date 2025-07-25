"use strict";
module.exports.getProductsMOQByIds = async (pool, productIds) => {
    // Validate inputs
    if (!productIds) {
        console.warn('No product IDs provided');
        return [];
    }
    // Convert to array if single ID provided
    const ids = Array.isArray(productIds) ? productIds : [productIds];
    // Validate IDs are positive integers
    const invalidIds = ids.filter(id => !Number.isInteger(id) || id <= 0);
    if (invalidIds.length > 0) {
        console.error('Invalid product IDs detected:', invalidIds);
        throw new Error('All product IDs must be positive integers');
    }
    // Validate pool connection
    if (!pool || typeof pool.query !== 'function') {
        throw new Error('Invalid database pool provided');
    }
    try {
        // Return empty array if no valid IDs
        if (ids.length === 0)
            return [];
        // Execute query with parameterized values
        const [rows] = await pool.query(`SELECT 
                product_id, 
                min_qty, 
                ppu 
             FROM product_moq 
             WHERE product_id IN (?)`, [ids]);
        return rows;
    }
    catch (error) {
        console.error("Error fetching product MOQ:", error);
        throw new Error('Failed to fetch MOQ data'); // Re-throw for caller to handle
    }
};
