"use strict";
module.exports.searchStoreX = async (data, pool, fields = ['*']) => {
    const { store_id, level, level_id, search } = data;
    if (!store_id) {
        return {
            success: false,
            error: "store_id is required"
        };
    }
    // Build selected fields
    let selectedFields = '*';
    if (fields.length !== 1 || fields[0] !== '*') {
        const unique = Array.from(new Set(['id', 'name', 'store_id', ...fields]));
        selectedFields = unique.map(f => `p.\`${f}\``).join(', ');
    }
    let query = `SELECT ${selectedFields} FROM products_table p WHERE p.store_id = ?`;
    const params = [store_id];
    // Optional level filter
    if (level && level_id) {
        const allowedLevels = ['maincategory', 'category', 'subcategory'];
        if (allowedLevels.includes(level)) {
            query += ` AND p.${level}_id = ?`;
            params.push(level_id);
        }
    }
    // Optional text search
    if (search && typeof search === 'string' && search.trim()) {
        const keywords = search.trim().split(/\s+/); // Split by space(s)
        for (const word of keywords) {
            const safeWord = `%${word.replace(/[%_]/g, '\\$&')}%`;
            query += ` AND (p.name LIKE ? OR p.description LIKE ?)`;
            params.push(safeWord, safeWord);
        }
    }
    const [rows] = await pool.query(query, params);
    return rows;
};
module.exports.searchStore = async (data, pool, fields = ['*']) => {
    const { store_id, level, level_id, search } = data;
    if (!store_id) {
        return {
            success: false,
            error: "store_id is required"
        };
    }
    // Build selected fields
    let selectedFields = '*';
    if (fields.length !== 1 || fields[0] !== '*') {
        const unique = Array.from(new Set(['id', 'name', 'store_id', ...fields]));
        selectedFields = unique.map(f => `p.\`${f}\``).join(', ');
    }
    let query = `SELECT ${selectedFields} FROM products_table p WHERE p.store_id = ?`;
    const params = [store_id];
    // Handle optional level filter
    let levelName = 'All Products';
    if (level && level_id) {
        const allowedLevels = ['maincategory', 'category', 'subcategory'];
        if (allowedLevels.includes(level)) {
            query += ` AND p.${level}_id = ?`;
            params.push(level_id);
            // Fetch the _name of the level
            const [rows] = await pool.query(`SELECT _name FROM ${level} WHERE id = ? LIMIT 1`, [level_id]);
            if (rows.length && rows[0]._name) {
                levelName = rows[0]._name;
            }
        }
    }
    // Optional search
    if (search && typeof search === 'string' && search.trim()) {
        const keywords = search.trim().split(/\s+/); // Split by spaces
        for (const word of keywords) {
            const safeWord = `%${word.replace(/[%_]/g, '\\$&')}%`;
            query += ` AND (p.name LIKE ? OR p.description LIKE ?)`;
            params.push(safeWord, safeWord);
        }
    }
    const [products] = await pool.query(query, params);
    return {
        success: true,
        products,
        level_name: levelName
    };
};
