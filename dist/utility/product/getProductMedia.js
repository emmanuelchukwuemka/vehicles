"use strict";
module.exports.getProductMedia = async (productIds, pool, fields = ['*']) => {
    try {
        if (!productIds || (Array.isArray(productIds) && productIds.length === 0)) {
            return [];
        }
        // Normalize to array
        const ids = Array.isArray(productIds) ? productIds : [productIds];
        // Ensure product_id is always selected for mapping
        let selectedFields;
        if (fields.length === 1 && fields[0] === '*') {
            selectedFields = '*';
        }
        else {
            const uniqueFields = Array.from(new Set(['product_id', ...fields]));
            selectedFields = uniqueFields.map(f => `\`${f}\``).join(', ');
        }
        const query = `
            SELECT ${selectedFields}
            FROM media_table
            WHERE product_id IN (?)
        `;
        const [rows] = await pool.query(query, [ids]);
        // Map by product_id
        const mediaMap = {};
        for (const row of rows) {
            if (!mediaMap[row.product_id]) {
                mediaMap[row.product_id] = [];
            }
            mediaMap[row.product_id].push(row);
        }
        return mediaMap;
    }
    catch (error) {
        console.error("Error fetching product media:", error);
        return {};
    }
};
