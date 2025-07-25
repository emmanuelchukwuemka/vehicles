"use strict";
module.exports.getProductMOQ = async (pool, productIds) => {
    try {
        if (!productIds)
            return [];
        // Convert single ID to array
        const ids = Array.isArray(productIds) ? productIds : [productIds];
        //console.log("IDs=>", ids);
        const [rows] = await pool.query(`SELECT product_id, min_qty, ppu FROM product_moq WHERE product_id IN (?)`, [ids]);
        return rows;
    }
    catch (error) {
        console.error("Error fetching product MOQ:", error);
        return [];
    }
};
