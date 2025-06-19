/**
 * Gets store details by IDs
 * @param {Pool} pool - Database connection pool
 * @param {number[]} storeIds - Array of store IDs
 * @param {string[]} [fields=['id','is_verified','created_at']] - Fields to select
 * @returns {Promise<Object>} - Key-value pair of storeId: storeData
 */
module.exports.getStoresByIds = async (pool, storeIds, fields = ['id', 'is_verified', 'created_at']) => {
    if (storeIds?.length === 0) return {};

    const fieldList = fields.map(f => `\`${f}\``).join(', ');
    const [stores] = await pool.query(`
        SELECT ${fieldList}
        FROM stores_table
        WHERE id IN (?)
        AND status = 1
    `, [storeIds]);

    // Convert to map for easier lookup
    return stores.reduce((acc, store) => {
        acc[store.id] = store;
        return acc;
    }, {});
};