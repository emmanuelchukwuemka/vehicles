module.exports.productsSearch = async (keyword, pool, fields = ['*']) => {
    if (!keyword || typeof keyword !== 'string' || !keyword.trim()) {
        return {
            success: false,
            error: "Search text is required"
        };
    }

    try {
        const words = keyword.trim().split(/\s+/); // Split by whitespace

        // Build clauses like: (name LIKE ? OR description LIKE ?) AND ...
        const conditions = words.map(() => `(sub.name LIKE ? OR sub.description LIKE ?)`).join(' AND ');

        // Escape % and _ in each word, and wrap in % for partial match
        const searchTerms = words.flatMap(word => {
            const safe = `%${word.replace(/[%_]/g, '\\$&')}%`;
            return [safe, safe];
        });

        // Ensure 'id' is included if not selecting all
        let selectedFields;
        if (fields.length === 1 && fields[0] === '*') {
            selectedFields = 'sub.*';
        } else {
            const uniqueFields = Array.from(new Set(['id', ...fields]));
            selectedFields = uniqueFields.map(f => `sub.\`${f}\``).join(', ');
        }

        const query = `
            SELECT ${selectedFields}
            FROM (
                SELECT p.*, 
                       ROW_NUMBER() OVER (PARTITION BY p.store_id ORDER BY p.id DESC) AS rn
                FROM products_table p
            ) AS sub
            WHERE rn <= 10 AND ${conditions}
            LIMIT 50
        `;

        const [rows] = await pool.query(query, searchTerms);

        return {
            success: true,
            data: rows
        };
    } catch (error) {
        console.error('Error in productsSearch:', error);
        return {
            success: false,
            error: "Failed to search products"
        };
    }
};

// module.exports.product_search_by_collections = async (req, pool, fields = ['*']) => {
//     const { store_id, sub_id } = req.body;

//     if (!store_id || !sub_id) {
//         return {
//             success: false,
//             error: "store_id and sub_id are required"
//         };
//     }

//     try {
//         const selectedFields =
//             fields.length === 1 && fields[0] === '*'
//                 ? 'p.*'
//                 : Array.from(new Set(['id', ...fields])).map(f => `p.\`${f}\``).join(', ');

//         const query = `
//             SELECT ${selectedFields}
//             FROM products_table p
//             WHERE p.store_id = ? AND p.subcategory_id = ? AND p.status = 1
//             ORDER BY p.id DESC
//             LIMIT 50
//         `;

//         const [rows] = await pool.query(query, [store_id, sub_id]);

//         return {
//             success: true,
//             data: rows
//         };
//     } catch (error) {
//         console.error('Error in product_search_by_collections:', error);
//         return {
//             success: false,
//             error: "Failed to fetch products"
//         };
//     }
// };