module.exports.getStoresByIds = async (storeIds, pool, fields = ['*']) => {
    if (!Array.isArray(storeIds) || storeIds.length === 0) {
        return [];
    }

    // Ensure `id` is always included so we can build the map
    let selectedFields = fields.includes('*')
        ? '*'
        : Array.from(new Set(['id', ...fields])).join(', ');

    const uniqueIds = [...new Set(storeIds)];
    const placeholders = uniqueIds.map(() => '?').join(', ');

    const query = `
        SELECT ${selectedFields} FROM stores_table
        WHERE id IN (${placeholders})
    `;

    try {
        const [rows] = await pool.query(query, uniqueIds);

        const storeMap = {};
        for (const store of rows) {
            storeMap[store.id] = store;
        }

        return storeMap;
    } catch (error) {
        console.log('Error fetching store details:', error);
        return {
            success: false,
            error: "Failed to fetch store information"
        };
    }
};