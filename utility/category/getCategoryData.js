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

    if (!level_id || typeof level_id !== 'number') {
        return {
            success: false,
            error: "level_id must be a valid number"
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

        const query = `
            SELECT ${selectedFields}
            FROM \`${table}\`
            WHERE id = ? AND _status = 1
            LIMIT 1
        `;

        const [rows] = await pool.query(query, [level_id]);

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
    } catch (error) {
        console.error(`Error in getCollectionData for ${level}:`, error);
        return {
            success: false,
            error: "Failed to fetch collection data"
        };
    }
};