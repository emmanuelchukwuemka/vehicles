"use strict";
module.exports.getVideoMediaByStore = async (pool, productIds) => {
    if (!productIds.length)
        return [];
    const [rows] = await pool.query(`SELECT id, url, product_id, variation_id, attribute_id 
       FROM media_table 
       WHERE product_id IN (?) AND type = 'video'`, [productIds]);
    console.log("medias=>", rows);
    return rows;
};
