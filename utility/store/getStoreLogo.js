module.exports.getStoreLogo = async (pool, store_id) => {
  const [rows] = await pool.query(
    `SELECT logo FROM stores_table WHERE id = ?`,
    [store_id]
  );

  if (rows.length === 0) return null;
  return rows[0].logo;
};
