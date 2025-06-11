const { pool } = require("../../connection/db");

module.exports.getProductSubcategory = async (productIds) => {
    try {
        if (!productIds || productIds.length === 0) return [];

        const ids = Array.isArray(productIds) ? productIds : [productIds];

        // Step 1: Get subcategory IDs from products
        const [productRows] = await pool.query(
            `SELECT id as product_id, subcategory_id FROM products_table WHERE id IN (?)`,
            [ids]
        );

        const subcategoryIds = [...new Set(productRows.map(p => p.subcategory_id).filter(Boolean))];
        if (!subcategoryIds.length) return [];

        // Step 2: Get subcategory details
        const [subcategoryRows] = await pool.query(
            `SELECT id, _name AS name, _image AS image FROM subcategory WHERE id IN (?)`,
            [subcategoryIds]
        );

        const subcategoryMap = {};
        subcategoryRows.forEach(sub => {
            subcategoryMap[sub.id] = {
                id: sub.id,
                name: sub.name,
                image: sub.image
            };
        });

        // Step 3: Map back to products
        const result = {};
        productRows.forEach(({ product_id, subcategory_id }) => {
            result[product_id] = subcategoryMap[subcategory_id] || null;
        });

        return result;

    } catch (error) {
        console.error("Error fetching product subcategory:", error);
        return [];
    }
};