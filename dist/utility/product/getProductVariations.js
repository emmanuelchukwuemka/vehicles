"use strict";
module.exports.getProductVariations = async (pool, productIds) => {
    if (!productIds || productIds.length === 0)
        return [];
    const ids = Array.isArray(productIds) ? productIds : [productIds];
    const [rows] = await pool.query(`SELECT id, product_id, sku, status 
       FROM variations_table 
       WHERE product_id IN (?)`, [ids]);
    return rows;
};
