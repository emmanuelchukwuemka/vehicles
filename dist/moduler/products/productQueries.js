"use strict";
/**
 * Gets product details by IDs
 * @param {Pool} pool - Database connection pool
 * @param {number[]} productIds - Array of product IDs
 * @param {string[]} [fields=['id','store_id','name']] - Fields to select
 * @returns {Promise<Object>} - Key-value pair of productId: productData
 */
module.exports.getProductsByIds = async (pool, productIds, fields = ['id', 'store_id', 'name']) => {
    if (productIds.length === 0)
        return {};
    const fieldList = fields.map(f => `\`${f}\``).join(', ');
    const [products] = await pool.query(`
        SELECT ${fieldList}
        FROM products_table
        WHERE id IN (?)
        AND status = 1
    `, [productIds]);
    // Convert to map for easier lookup
    return products.reduce((acc, product) => {
        acc[product.id] = product;
        return acc;
    }, {});
};
