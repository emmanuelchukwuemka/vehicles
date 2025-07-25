"use strict";
/**
 * Gets media URLs for a product
 * @param {Pool} pool - Database connection pool
 * @param {number|number[]} productId - Single product ID or array of IDs
 * @param {string[]} [fields=['url']] - Fields to return
 * @param {number} [limit] - Optional limit for media items
 * @returns {Promise<string[]|Object[]>} - Array of URLs or media objects
*/
module.exports.getProductMedias = async (pool, productId, fields = ['url'], limit) => {
    try {
        // Validate input
        if (!productId)
            throw new Error('Product ID is required');
        // Build query
        const fieldList = fields.map(f => `\`${f}\``).join(', ');
        let query = `SELECT ${fieldList} FROM media_table WHERE product_id`;
        const params = [];
        // Handle single ID or array of IDs
        if (Array.isArray(productId)) {
            if (productId.length === 0)
                return [];
            query += ` IN (${productId.map(() => '?').join(',')})`;
            params.push(...productId);
        }
        else {
            query += ' = ?';
            params.push(productId);
        }
        // Add optional limit
        if (limit) {
            query += ' LIMIT ?';
            params.push(limit);
        }
        // Execute query
        const [mediaRows] = await pool.query(query, params);
        // Return full objects or just URLs based on requested fields
        return fields.length === 1 && fields[0] === 'url'
            ? mediaRows.map(row => row.url)
            : mediaRows;
    }
    catch (error) {
        console.error('Error in getProductMedia:', error);
        throw error; // Re-throw for the caller to handle
    }
};
