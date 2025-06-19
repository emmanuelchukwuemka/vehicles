module.exports.getCategoryData = async ({ level, level_id, pool, fields = ['*'] }) => {
    // Map level to table name
    const levelTableMap = {
        maincategory: 'maincategory',
        category: 'category',
        subcategory: 'subcategory'
    };

    const table = levelTableMap[level];

    if (!table) {
        return {
            success: false,
            error: "Invalid collection level"
        };
    }

    try {
        // Format fields
        let selectedFields;
        if (fields.length === 1 && fields[0] === '*') {
            selectedFields = '*';
        } else {
            const uniqueFields = Array.from(new Set(['id', ...fields]));
            selectedFields = uniqueFields.map(f => `\`${f}\``).join(', ');
        }

        // Build query based on presence of level_id
        let query;
        let queryParams = [];

        if (level_id !== undefined && typeof level_id === 'number') {
            query = `
                SELECT ${selectedFields}
                FROM \`${table}\`
                WHERE id = ? AND status = 1
                LIMIT 1
            `;
            queryParams = [level_id];
        } else {
            query = `
                SELECT ${selectedFields}
                FROM \`${table}\`
                WHERE status = 1
            `;
        }

        const [rows] = await pool.query(query, queryParams);

        if (level_id !== undefined) {
        // Single record expected when level_id is provided
            if (!rows.length) {
                return {
                    success: false,
                    error: `No ${level} found for the given ID`
                };
            }
            return {
                success: true,
                data: rows[0]
            };
        } else {
            // Return all records when no level_id is provided
            return rows
        }
    } catch (error) {
        console.error(`Error in getCollectionData for ${level}:`, error);
        return {
            success: false,
            error: "Failed to fetch collection data"
        };
    }
};