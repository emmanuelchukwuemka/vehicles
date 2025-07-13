module.exports = async function getRecommendedProducts(
  pool,
  store_id,
  min_rating = 4.0,
  limit = 10
) {
  const [rows] = await pool.query(
    `SELECT p.id, p.name, p.description, AVG(r.rating) AS average_rating
       FROM products_table p
       JOIN product_reviews r ON p.id = r.product_id
       WHERE p.store_id = ?
         AND r.status = 1
       GROUP BY p.id
       HAVING average_rating >= ?
       ORDER BY RAND()
       LIMIT ?`,
    [store_id, min_rating, limit]
  );

  return rows.map((row) => ({
    ...row,
    average_rating: Number(row.average_rating),
  }));
};
