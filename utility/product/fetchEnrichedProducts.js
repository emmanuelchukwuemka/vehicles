const { pool } = require("../../connection/db");
const { getProductMOQ, getProductFilters, getProductCollection, getProductSubcategory } = require("../../helpers/executors");

module.exports.fetchEnrichedProducts = async (store_id) => {
    // Step 1: Basic validation
    if (isNaN(store_id)) throw new Error("Invalid store ID");

    // Step 2: Fetch base products
    const [products] = await pool.query(
        `SELECT id, name, collection_id, customizable, created_at, subcategory_id FROM products_table 
         WHERE store_id = ? AND status = 1 ORDER BY created_at DESC`,
        [store_id]
    );
    if (!products.length) return [];

    const productIds = products.map(p => p.id);

    // Step 3: Fetch all enrichment data
    const [media] = await pool.query(
        `SELECT product_id, url, type FROM media_table WHERE product_id IN (?)`,
        [productIds]
    );
    const moq = await getProductMOQ(productIds);
    const filters = await getProductFilters(productIds);
    const collections = await getProductCollection(productIds);
    const subcategories = await getProductSubcategory(productIds);

    console.log("Filter=>", filters)

    // Step 4: Convert filters to map
    const filterMap = {};
    if (Array.isArray(filters)) {
        filters.forEach(({ product_id, filter_id }) => {
            if (!filterMap[product_id]) filterMap[product_id] = [];
            filterMap[product_id].push(filter_id);
        });
    }

    // Step 5: Map collections
    const collectionMap = {};
    collections.forEach(c => {
        collectionMap[c.id] = { id: c.id, name: c.name };
    });

    // Step 6: Return enriched list
    return products.map(product => ({
        id: product.id,
        name: product.name,
        customizable: product.customizable,
        created_at: product.created_at,
        media: media.filter(m => m.product_id === product.id),
        moq: moq.filter(m => m.product_id === product.id),
        filters: (filters[product.id] || []).map(f => f.id),
        collection: collectionMap[product.collection_id] || { id: null, name: null },
        subcategory: subcategories[product.id] || null
    }));
}