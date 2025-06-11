module.exports.getStoreCapabilities = async (storeIds, pool, fields = ['id', 'name']) => {
    if (!storeIds || !Array.isArray(storeIds) || storeIds.length === 0) {
        return [];
    }

    const selectedFields = fields.map(f => `c.${f}`).join(', ');
    const query = `
        SELECT sc.store_id, ${selectedFields}
        FROM store_capabilities sc
        JOIN capabilities_table c ON sc.capability_id = c.id
        WHERE sc.store_id IN (?)
    `;

    try {
        const [rows] = await pool.query(query, [storeIds]);
        return rows;
    } catch (error) {
        console.error("Error in getStoreCapabilities:", error);
        throw error;
    }
};