module.exports.getStoreIdsByCapabilities = async (pool, capabilityIds) => {
    const [results] = await pool.query(`
      SELECT store_id 
      FROM store_capabilities 
      WHERE capability_id IN (?)
      GROUP BY store_id 
      HAVING COUNT(DISTINCT capability_id) = ?
    `, [capabilityIds, capabilityIds.length]);

    return results.map(r => r.store_id);
}