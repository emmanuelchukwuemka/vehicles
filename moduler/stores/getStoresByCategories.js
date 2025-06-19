module.exports.getStoresByCategories = async (pool, level, id) => {
    let column;
    if (level === 'maincategory') column = 'maincategory_id';
    else if (level === 'category') column = 'category_id';
    else if (level === 'subcategory') column = 'subcategory_id';
    else throw new Error('Invalid category level');

    const [results] = await pool.query(
        `SELECT DISTINCT store_id FROM products_table WHERE ${column} = ?`,
        [id]
    );

    return results.map(r => r.store_id);
}