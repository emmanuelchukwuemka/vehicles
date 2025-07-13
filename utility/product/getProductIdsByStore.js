module.exports.getProductIdsByStore = async (pool, store_id) => {
  const [rows] = await pool.query(
    `SELECT id FROM products_table WHERE store_id = ?`,
    [store_id]
  );
  //console.log("IDs=>", rows);
  return rows.map((row) => row.id);
};
