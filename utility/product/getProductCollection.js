module.exports.getProductCollection = async (pool, productId) => {
  try {
    if (!productId) return [];

    // Normalize productId to an array
    const ids = Array.isArray(productId) ? productId : [productId];

    // Fetch product → collection_id mapping
    const [products] = await pool.query(
      `SELECT id, collection_id FROM products_table WHERE id IN (?)`,
      [ids]
    );

    const collectionIds = [...new Set(products.map((p) => p.collection_id))];

    if (!collectionIds.length) return [];

    // Fetch collection details
    const [collections] = await pool.query(
      `SELECT id, name, subcategory_id FROM collections_table WHERE id IN (?)`,
      [collectionIds]
    );

    return collections;
  } catch (error) {
    console.error("Error fetching product collections:", error);
    return [];
  }
};
