module.exports.getBestSellingProducts = async (pool, store_id, limit = 10) => {
  const [rows] = await pool.query(
    `SELECT oi.product_id, SUM(oi.quantity) AS total_sold
     FROM order_items oi
     INNER JOIN orders_table o ON o.id = oi.order_id
     WHERE oi.store_id = ? AND o.payment_status = 'paid'
     GROUP BY oi.product_id
     ORDER BY total_sold DESC
     LIMIT ?`,
    [store_id, limit]
  );
  console.log("body=>", { store_id });
  console.log("Similar=>", rows);
  return rows;
};
