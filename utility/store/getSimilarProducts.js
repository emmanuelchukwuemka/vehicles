module.exports.getSimilarProducts = async (
  pool,
  store_id,
  collection_id,
  exclude_product_id,
  limit = 10
) => {
  const [rows] = await pool.query(
    `SELECT id, name, description FROM products_table
     WHERE store_id = ? AND collection_id = ? AND id != ?
     LIMIT ?`,
    [store_id, collection_id, exclude_product_id, limit]
  );
  //console.log("body=>", { store_id, collection_id, exclude_product_id });
  //console.log("Similar=>", rows);
  return rows;
};
