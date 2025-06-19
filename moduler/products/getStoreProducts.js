/**
     * Gets top products per store with customizable fields and limit
     * @param {Pool} pool - Database connection pool
     * @param {number[]} storeIds - Array of store IDs
     * @param {string[]} [fields=['id','store_id','name','price','discount']] - Fields to select
     * @param {number} [limit=3] - Number of products per store
     * @returns {Promise<Array>} - Array of product objects
     */

module.exports.getStoreProducts = async (pool, storeIds, fields = ['id', 'store_id', 'name', 'price', 'discount'], limit = 3) => {
    // 1. Input Validation
    if (!Array.isArray(storeIds) || storeIds.length === 0) {
        return [];
    }

    if (typeof limit !== 'number' || limit <= 0) {
        throw new Error('Limit must be a positive number');
    }

    // 2. Field Validation
    const validFields = [
        'id', 'store_id', 'name', 'price', 'discount',
        'description', 'sku', 'created_at', 'updated_at'
    ];

    const selectedFields = fields
        .filter(field => validFields.includes(field))
        .map(field => `\`${field}\``)
        .join(', ') || '*';

    // 3. Execute Simple Query (No CTE)
    const [products] = await pool.query(
        `SELECT ${selectedFields} 
         FROM products_table 
         WHERE store_id IN (?) 
         ORDER BY store_id, id 
         LIMIT ?`,
        [storeIds, limit] // Simple limit calculation
    );

    return products;
};