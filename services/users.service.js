const { pool } = require("../connection/db");
const { hashPassword, comparePasswords } = require("../helpers/hasher");
require('dotenv').config();
const { v4: uuid } = require("uuid")
const axios = require('axios');
const { reloadService } = require("../helpers/dataReload.service");
const { categorizeReview } = require("../helpers/executors");


module.exports.create_account = async (req) => {
    const { firstName, lastName, email, phone, country, password, picture } = req.body;

    if (!firstName || !lastName || !email || !phone || !country || !password) {
        return { success: false, error: "Invalid input" };
    }

    let connection;

    try {
        const hashedPassword = await hashPassword(password);
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const trimmedEmail = email.trim().toLowerCase();

        // ✅ Check if the email or phone already exists
        const [existingUser] = await connection.query(
            `SELECT id FROM users_table WHERE email = ? OR phone = ? LIMIT 1`,
            [trimmedEmail, phone]
        );

        if (existingUser.length > 0) {
            await connection.rollback();
            return { success: false, error: "Email or phone number already in use" };
        }

        // ✅ Prepare vendor data for insertion
        const vendorData = {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            email: trimmedEmail,
            phone: phone,
            nationality: country.trim().toLowerCase(),
            password: hashedPassword,
            picture: picture || null, // Ensure null if no picture provided
            is_verified: 1,
            status: 1
        };

        const columns = Object.keys(vendorData).join(", ");
        const placeholders = Object.keys(vendorData).map(() => "?").join(", ");
        const values = Object.values(vendorData);

        // ✅ Insert new vendor
        const [{ insertId }] = await connection.query(
            `INSERT INTO users_table (${columns}, created_at, updated_at)
             VALUES (${placeholders}, NOW(), NOW())`,
            values
        );

        if (!insertId) {
            await connection.rollback();
            return { success: false, error: "Failed to create vendor account" };
        }

        await connection.commit();
        return { success: true, data: "Account created successfully" };

    } catch (error) {
        if (connection) await connection.rollback();
        console.error("Error creating account:", error);
        return { success: false, error: "Could not create account, please try again" };
    } finally {
        if (connection) connection.release();
    }
};

module.exports.login_User = async (req) => {

    const { email, password } = req.body;

    const userEmail = email.trim().toLowerCase();

    try {
        const [[userData]] = await pool.query('SELECT * FROM users_table WHERE email = ?', [userEmail]);

        if (userData && userData.id) {

            const passwordMatch = await comparePasswords(password, userData.password);

            if (passwordMatch) {

                return {
                    success: true,
                    data: userData
                };
            }

            return {
                success: false,
                error: "Incorrect email or password"
            }

        }

        return {
            success: false,
            error: "Incorrect email or password"
        };

    } catch (error) {

        console.log("Error==>", error)

        return {
            success: false,
            error: "Unable to process your request"
        }
    }
};

module.exports.fetch_capabilities = async (req) => {
    try {
        // Fetch capabilities
        const [capabilities] = await pool.query("SELECT id, name, description FROM capabilities_table");

        if (!capabilities.length) {
            return {
                success: true,
                data: []
            };
        }

        return {
            success: true,
            data: capabilities
        };

    } catch (error) {
        console.error("Error fetching capabilities:", error);
        throw new Error("Error fetching capabilities");
    }
};

module.exports.fetch_stores = async (req) => {
    try {
        // ✅ Step 1: Fetch Active Stores with Capabilities
        const [stores] = await pool.query(`
            SELECT 
                s.id, s.code, s.name, s.logo, s.net_worth, s.staff_count, 
                s.is_verified, s.verified_date, s.status
            FROM stores_table s
            WHERE s.status = 1
        `);

        if (!stores.length) {
            return { success: true, data: [] };
        }

        const storeIds = stores.map(store => store.id);

        // ✅ Step 2: Fetch Capabilities (Returning as Objects)
        const [capabilities] = await pool.query(`
            SELECT sc.store_id, c.id AS capability_id, c.name AS capability_name
            FROM store_capabilities sc
            JOIN capabilities_table c ON sc.capability_id = c.id
            WHERE sc.store_id IN (?)
        `, [storeIds]);

        // ✅ Step 3: Fetch Products (Limit 6 per Store)
        const [products] = await pool.query(`
            SELECT p.id, p.store_id, p.name, p.price, p.discount
            FROM (
                SELECT id, store_id, name, price, discount, 
                       ROW_NUMBER() OVER (PARTITION BY store_id ORDER BY created_at DESC) AS row_num
                FROM products_table
                WHERE store_id IN (?)
            ) p
            WHERE p.row_num <= 6
        `, [storeIds]);

        if (!products.length) {
            return {
                success: true,
                data: stores.map(store => ({
                    ...store,
                    capabilities: capabilities
                        .filter(c => c.store_id === store.id)
                        .map(c => ({ id: c.capability_id, name: c.capability_name })),
                    products: []
                }))
            };
        }

        // ✅ Step 4: Fetch MOQ & Media
        const productIds = products.map(p => p.id);
        const [moq] = productIds.length
            ? await pool.query(
                `SELECT product_id, min_qty, ppu FROM product_moq WHERE product_id IN (?)`,
                [productIds]
            )
            : [[]];

        const [media] = productIds.length
            ? await pool.query(
                `SELECT product_id, url, type FROM media_table WHERE product_id IN (?)`,
                [productIds]
            )
            : [[]];

        // ✅ Step 5: Structure Response
        const storeData = stores.map(store => ({
            id: store.id,
            code: store.code,
            name: store.name,
            logo: store.logo,
            net_worth: store.net_worth,
            staff_count: store.staff_count,
            is_verified: store.is_verified,
            verified_date: store.verified_date,
            status: store.status,
            capabilities: capabilities
                .filter(c => c.store_id === store.id)
                .map(c => ({ id: c.capability_id, name: c.capability_name })), // ✅ Now an array of objects
            products: products
                .filter(p => p.store_id === store.id)
                .map(p => ({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    discount: p.discount,
                    moq: moq.filter(m => m.product_id === p.id),
                    media: media.filter(m => m.product_id === p.id),
                }))
        }));

        return { success: true, data: storeData };

    } catch (error) {
        console.error("Error fetching stores:", error);
        return { success: false, error: "Error fetching stores" };
    }
};

module.exports.fetch_store_products = async (req) => {
    const { store_id } = req.params;
    const { isCustomizable, activeCollection, selectedFilter } = req.query; // Filters from request query

    if (isNaN(store_id)) {
        return {
            success: false,
            error: "Invalid Store ID"
        };
    }

    try {
        // Fetch products with only required fields
        let [products] = await pool.query(
            `SELECT id, name, collection_id, customizable, created_at FROM products_table 
             WHERE store_id = ? AND status = 1 ORDER BY created_at DESC`,
            [store_id]
        );

        if (!products.length) {
            return { success: true, data: [] };
        }

        const productIds = products.map(p => p.id);

        // Fetch media
        const [media] = await pool.query(
            `SELECT product_id, url, type FROM media_table WHERE product_id IN (?)`,
            [productIds]
        );

        // Fetch MOQ
        const [moq] = await pool.query(
            `SELECT product_id, min_qty, ppu FROM product_moq WHERE product_id IN (?)`,
            [productIds]
        );

        // Fetch Collection Names
        const [collections] = await pool.query(
            `SELECT id, name FROM collections_table WHERE id IN (?)`,
            [products.map(p => p.collection_id)]
        );

        // Fetch Product Filters (Precomputed)
        const [productFilters] = await pool.query(
            `SELECT product_id, filter_id FROM product_filters WHERE product_id IN (?)`,
            [productIds]
        );

        // **Filter Implementation**

        // ✅ Convert Product Filters to a Map for Quick Lookup
        const productFilterMap = {};
        productFilters.forEach(({ product_id, filter_id }) => {
            if (!productFilterMap[product_id]) productFilterMap[product_id] = [];
            productFilterMap[product_id].push(filter_id);
        });

        // ✅ Convert Collections to a Map
        const collectionMap = {};
        collections.forEach(c => {
            collectionMap[c.id] = { id: c.id, name: c.name };
        });

        // ✅ Apply Filters
        let filteredProducts = products.map(product => ({
            id: product.id,
            name: product.name,
            customizable: product.customizable,
            created_at: product.created_at,
            collection: collectionMap[product.collection_id] || { id: null, name: null },
            media: media.filter(m => m.product_id === product.id),
            moq: moq.filter(m => m.product_id === product.id),
            filters: productFilterMap[product.id] || [] // Assign filters
        }));

        // ✅ Filter by Customizable
        if (isCustomizable === "true") {
            filteredProducts = filteredProducts.filter(p => p.customizable === 1);
        }

        // ✅ Filter by Collection
        if (activeCollection) {
            filteredProducts = filteredProducts.filter(p => p.collection.id === parseInt(activeCollection));
        }

        // ✅ Filter by Default Filters (Recommended, New, Hot, Best Selling, Low Price)
        if (selectedFilter) {
            const filterId = parseInt(selectedFilter);
            filteredProducts = filteredProducts.filter(p => p.filters.includes(filterId));

            // ✅ Special Case: Low Price → Sort by Price Ascending
            if (filterId === 5) {
                filteredProducts.sort((a, b) => (a.moq[0]?.ppu || 0) - (b.moq[0]?.ppu || 0));
            }
        }

        return { success: true, data: filteredProducts };

    } catch (error) {
        console.error("Error fetching products:", error);
        return { success: false, error: "An error occurred while fetching products" };
    }
};

module.exports.fetch_store_collections = async (req) => {
    const { store_id } = req.params;

    if (isNaN(store_id)) {
        return {
            success: false,
            error: "Invalid Store ID"
        };
    }

    try {
        // Fetch unique collections associated with the store's products
        const [collections] = await pool.query(
            `SELECT DISTINCT c.id, c.name 
             FROM collections_table c
             JOIN products_table p ON c.id = p.collection_id
             WHERE p.store_id = ? AND c.status = 1`,
            [store_id]
        );

        return {
            success: true,
            data: collections
        };

    } catch (error) {
        console.error("Error fetching collections:", error);
        return {
            success: false,
            error: "An error occurred while fetching collections"
        };
    }
};

// ///////////////////////To be reviewed////////////////////////////////
module.exports.filter_stores_by_category = async (req) => {
    const { filter_type, filter_id } = req.params; // Accepts 'main_category', 'category', or 'sub_category'

    if (!filter_type || !filter_id) {
        return {
            success: false,
            error: "Filter type and filter ID are required"
        };
    }

    let filterColumn;
    if (filter_type === "main_category") {
        filterColumn = "mc.id";
    } else if (filter_type === "category") {
        filterColumn = "c.id";
    } else if (filter_type === "sub_category") {
        filterColumn = "sc.id";
    } else {
        return {
            success: false,
            error: "Invalid filter type"
        };
    }

    try {
        const [stores] = await pool.query(
            `
            SELECT DISTINCT
                s.id, s.code, s.name, s.logo, s.net_worth,
                s.staff_count, s.is_verified, s.verified_date, s.status,

                -- Fetch capabilities
                COALESCE(
                    CONCAT('[', GROUP_CONCAT(
                        DISTINCT JSON_OBJECT(
                            "id", ct.id,
                            "name", ct.name,
                            "description", ct.description
                        )
                    ), ']'), '[]'
                ) AS capabilities,

                -- Fetch products
                COALESCE(
                    CONCAT('[', GROUP_CONCAT(
                        DISTINCT JSON_OBJECT(
                            "id", p.id,
                            "name", p.name,
                            "moq", (
                                SELECT CONCAT('[', GROUP_CONCAT(
                                    JSON_OBJECT("product_id", pm.product_id, "min_qty", pm.min_qty, "ppu", pm.ppu)
                                ), ']')
                                FROM product_moq pm WHERE pm.product_id = p.id
                            ),
                            "media", (
                                SELECT CONCAT('[', GROUP_CONCAT(
                                    JSON_OBJECT("product_id", mt.product_id, "url", mt.url, "type", mt.type)
                                ), ']')
                                FROM media_table mt WHERE mt.product_id = p.id
                            )
                        )
                    ), ']'), '[]'
                ) AS products

            FROM stores_table s
            JOIN products_table p ON s.id = p.store_id
            JOIN subcategory sc ON p.subcategory_id = sc.id
            JOIN category c ON sc._category = c.id
            JOIN maincategory mc ON c._maincategory = mc.id
            LEFT JOIN store_capabilities scp ON s.id = scp.store_id
            LEFT JOIN capabilities_table ct ON scp.capability_id = ct.id

            WHERE ${filterColumn} = ? 
            AND p.status = 1
            AND s.status = 1

            GROUP BY s.id
            ORDER BY s.is_verified DESC
            `,
            [filter_id]
        );

        if (stores.length > 0) {
            // Convert JSON strings to actual JSON arrays
            stores.forEach(store => {
                store.capabilities = JSON.parse(store.capabilities);
                store.products = JSON.parse(store.products);
                store.products.forEach(product => {
                    product.moq = product.moq ? JSON.parse(product.moq) : [];
                    product.media = product.media ? JSON.parse(product.media) : [];
                });
            });

            return {
                success: true,
                data: stores
            };
        }

        return {
            success: false,
            error: "No stores found for the selected filter"
        };
    } catch (error) {
        console.error("Error filtering stores:", error);
        return {
            success: false,
            error: "Database error while filtering stores"
        };
    }
};
module.exports.filter_stores_by_capabilities = async (req) => {
    const { capability_ids } = req.body; // Array of capability IDs

    if (!capability_ids || !Array.isArray(capability_ids) || capability_ids.length === 0) {
        return {
            success: false,
            error: "At least one capability ID is required"
        };
    }

    try {
        const [stores] = await pool.query(
            `
            SELECT DISTINCT
                s.id, s.code, s.name, s.logo, s.net_worth,
                s.staff_count, s.is_verified, s.verified_date, s.status,

                -- Fetch capabilities
                COALESCE(
                    CONCAT('[', GROUP_CONCAT(
                        DISTINCT JSON_OBJECT(
                            "id", ct.id,
                            "name", ct.name,
                            "description", ct.description
                        )
                    ), ']'), '[]'
                ) AS capabilities,

                -- Fetch products
                COALESCE(
                    CONCAT('[', GROUP_CONCAT(
                        DISTINCT JSON_OBJECT(
                            "id", p.id,
                            "name", p.name,
                            "moq", (
                                SELECT CONCAT('[', GROUP_CONCAT(
                                    JSON_OBJECT("product_id", pm.product_id, "min_qty", pm.min_qty, "ppu", pm.ppu)
                                ), ']')
                                FROM product_moq pm WHERE pm.product_id = p.id
                            ),
                            "media", (
                                SELECT CONCAT('[', GROUP_CONCAT(
                                    JSON_OBJECT("product_id", mt.product_id, "url", mt.url, "type", mt.type)
                                ), ']')
                                FROM media_table mt WHERE mt.product_id = p.id
                            )
                        )
                    ), ']'), '[]'
                ) AS products

            FROM stores_table s
            JOIN store_capabilities scp ON s.id = scp.store_id
            JOIN capabilities_table ct ON scp.capability_id = ct.id
            JOIN products_table p ON s.id = p.store_id
            LEFT JOIN subcategory sc ON p.subcategory_id = sc.id
            LEFT JOIN category c ON sc._category = c.id
            LEFT JOIN maincategory mc ON c._maincategory = mc.id

            WHERE s.status = 1
            AND p.status = 1
            AND s.id IN (
                SELECT store_id FROM store_capabilities WHERE capability_id IN (${capability_ids.map(() => '?').join(',')})
                GROUP BY store_id
                HAVING COUNT(DISTINCT capability_id) = ?
            )

            GROUP BY s.id
            ORDER BY s.is_verified DESC
            `,
            [...capability_ids, capability_ids.length]
        );

        if (stores.length > 0) {
            stores.forEach(store => {
                store.capabilities = JSON.parse(store.capabilities);
                store.products = JSON.parse(store.products);
                store.products.forEach(product => {
                    product.moq = product.moq ? JSON.parse(product.moq) : [];
                    product.media = product.media ? JSON.parse(product.media) : [];
                });
            });

            return {
                success: true,
                data: stores
            };
        }

        return {
            success: false,
            error: "No stores found for the selected capabilities"
        };
    } catch (error) {
        console.error("Error filtering stores by capabilities:", error);
        return {
            success: false,
            error: "Database error while filtering stores"
        };
    }
};
// ////////////////////////////////////////////////////////

module.exports.fetch_default_filters = async (req) => {

    try {
        // Fetch system filters
        const [filters] = await pool.query("SELECT id, name FROM filters_table WHERE status = 1");

        if (!filters.length) {
            return {
                success: true,
                data: []
            };
        }

        return {
            success: true,
            data: filters
        };

    } catch (error) {
        console.error("Error fetching filters:", error);
        throw new Error("Error fetching filters");
    }
};

module.exports.fetchStoresNew = async (req) => {
    const { categ_level, categ_id, caps } = req.body;

    let filterColumn;
    if (categ_level === "main_category") {
        filterColumn = "mc.id";
    } else if (categ_level === "category") {
        filterColumn = "c.id";
    } else if (categ_level === "sub_category") {
        filterColumn = "sc.id";
    }

    let connection;
    try {
        connection = await pool.getConnection();

        // Base Query: Fetch all active stores
        let query = `SELECT DISTINCT s.id, s.code, s.name, s.logo, s.net_worth, s.floor_space,
                            s.staff_count, s.is_verified, s.verified_date, s.status
                     FROM stores_table s
                     LEFT JOIN products_table p ON s.id = p.store_id
                     LEFT JOIN subcategory sc ON p.subcategory_id = sc.id
                     LEFT JOIN category c ON sc._category = c.id
                     LEFT JOIN maincategory mc ON c._maincategory = mc.id
                     WHERE s.status = 1`;
        let queryParams = [];

        // Apply Category Filter
        if (categ_level && categ_id) {
            query += ` AND ${filterColumn} = ?`;
            queryParams.push(categ_id);
        }

        // Apply Capability Filter
        if (caps && caps.length > 0) {
            query += ` AND s.id IN (
                SELECT store_id FROM store_capabilities 
                WHERE capability_id IN (${caps.map(() => '?').join(',')})
                GROUP BY store_id HAVING COUNT(DISTINCT capability_id) = ?
            )`;
            queryParams.push(...caps, caps.length);
        }

        // Execute store query
        const [stores] = await connection.query(query, queryParams);
        if (!stores.length) {
            return { success: false, error: "No stores found for this filter." };
        }

        // Get store IDs
        const storeIds = stores.map(s => s.id);

        // Fetch Capabilities
        const [capabilities] = await connection.query(`
            SELECT sc.store_id, c.id AS capability_id, c.name
            FROM store_capabilities sc
            JOIN capabilities_table c ON sc.capability_id = c.id
            WHERE sc.store_id IN (?);
        `, [storeIds]);

        // Fetch Products
        const [products] = await connection.query(`
            SELECT p.id, p.store_id, p.name, p.price, p.discount
            FROM products_table p
            WHERE p.store_id IN (?);
        `, [storeIds]);

        // Fetch MOQ
        const [moq] = await connection.query(`
            SELECT product_id, min_qty, ppu
            FROM product_moq
            WHERE product_id IN (?);
        `, [products.map(p => p.id)]);

        // Fetch Media
        const [media] = await connection.query(`
            SELECT product_id, url, type
            FROM media_table
            WHERE product_id IN (?);
        `, [products.map(p => p.id)]);

        // Structure the response
        let storeData = stores.map(store => ({
            id: store.id,
            code: store.code,
            name: store.name,
            logo: store.logo,
            net_worth: store.net_worth,
            floor_space: store.floor_space,
            staff_count: store.staff_count,
            is_verified: store.is_verified,
            verified_date: store.verified_date,
            status: store.status,
            capabilities: capabilities
                .filter(c => c.store_id === store.id)
                .map(c => ({ id: c.capability_id, name: c.name })),
            products: products
                .filter(p => p.store_id === store.id)
                .map(p => ({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    discount: p.discount,
                    moq: moq.filter(m => m.product_id === p.id),
                    media: media.filter(m => m.product_id === p.id),
                }))
        }));

        return { success: true, data: storeData };

    } catch (error) {
        console.error("Error fetching stores:", error);
        return { success: false, error: "An error occurred while fetching stores." };
    } finally {
        if (connection) connection.release();
    }
};

module.exports.follow_and_like_stores = async (req) => {
    const { user_id, store_id, action } = req.body;

    if (!user_id || !store_id || !["like", "follow"].includes(action)) {
        return { success: false, error: "Invalid input" };
    }

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        // ✅ Check if the user exists and is active
        const [userRows] = await conn.query(
            "SELECT id FROM users_table WHERE id = ? AND status = 1",
            [user_id]
        );
        if (userRows.length === 0) {
            await conn.rollback();
            return { success: false, error: "User not found or inactive" };
        }

        // ✅ Check if the interaction already exists
        const [existing] = await conn.query(
            "SELECT id FROM store_interactions WHERE user_id = ? AND store_id = ? AND action = ?",
            [user_id, store_id, action]
        );

        if (existing.length > 0) {
            // ✅ If exists, remove interaction (unlike/unfollow)
            await conn.query(
                "DELETE FROM store_interactions WHERE user_id = ? AND store_id = ? AND action = ?",
                [user_id, store_id, action]
            );
            await conn.commit();
            return { success: true, data: 0 };
        } else {
            // ✅ If not exists, add interaction (like/follow)
            await conn.query(
                "INSERT INTO store_interactions (user_id, store_id, action) VALUES (?, ?, ?)",
                [user_id, store_id, action]
            );
            await conn.commit();
            return { success: true, data: 1 };
        }
    } catch (error) {
        await conn.rollback();
        console.error("Error in store interaction:", error);
        return { success: false, error: "Internal server error" };
    } finally {
        conn.release();
    }
};

module.exports.fetch_single_product = async (req) => {
    const { product_id } = req.params;

    if (isNaN(product_id)) {
        return { success: false, error: "Invalid Product ID" };
    }

    let connection;

    try {
        connection = await pool.getConnection();

        // Fetch product details
        const [productRows] = await connection.query(`
            SELECT p.*, s.name AS store_name, s.logo AS store_logo, s.is_verified AS store_verified
            FROM products_table p
            JOIN stores_table s ON p.store_id = s.id
            WHERE p.id = ? AND p.status = 1
            LIMIT 1
        `, [product_id]);

        if (productRows.length === 0) {
            return { success: false, error: "Product not found" };
        }
        const product = productRows[0];

        // Fetch product media
        const [media] = await connection.query(`
            SELECT url, type FROM media_table WHERE product_id = ? AND variation_id IS NULL
        `, [product_id]);

        // Fetch MOQ (Minimum Order Quantity)
        const [moq] = await connection.query(`
            SELECT min_qty, ppu FROM product_moq WHERE product_id = ?
        `, [product_id]);

        // Fetch product specifications
        const [specifications] = await connection.query(`
            SELECT name, value FROM product_specifications WHERE product_id = ?
        `, [product_id]);

        // Fetch product reviews (average rating & total count)
        const [productReviews] = await connection.query(`
            SELECT COUNT(*) AS total_reviews, AVG(rating) AS avg_rating 
            FROM product_reviews 
            WHERE product_id = ? AND status = 1
        `, [product_id]);

        // Fetch store reviews (average rating & total count)
        const [storeReviews] = await connection.query(`
            SELECT COUNT(*) AS total_reviews, AVG(rating) AS avg_rating 
            FROM store_reviews 
            WHERE store_id = ? AND status = 1
        `, [product.store_id]);

        // Fetch product variations
        const [variations] = await connection.query(`
            SELECT * FROM variations_table 
            WHERE product_id = ? AND status = 1
        `, [product_id]);

        // Attach attributes & media to each variation
        for (const variation of variations) {
            const [attributes] = await connection.query(`
                SELECT name, value FROM variation_attributes WHERE variation_id = ?
            `, [variation.id]);

            const [variationMedia] = await connection.query(`
                SELECT url, type FROM media_table WHERE variation_id = ?
            `, [variation.id]);

            variation.attributes = attributes;
            variation.media = variationMedia;
        }

        return {
            success: true,
            data: {
                ...product,
                media,
                moq,
                specifications,
                product_reviews: {
                    total_reviews: productReviews[0].total_reviews || 0,
                    avg_rating: parseFloat(productReviews[0].avg_rating) || 0
                },
                store_reviews: {
                    total_reviews: storeReviews[0].total_reviews || 0,
                    avg_rating: parseFloat(storeReviews[0].avg_rating) || 0
                },
                variations
            }
        };

    } catch (error) {
        console.error("Error fetching product:", error);
        return { success: false, error: "An error occurred while fetching product" };
    } finally {
        if (connection) connection.release();
    }
};

module.exports.fetch_product_variation = async (req) => {
    const { product_id } = req.params;

    if (isNaN(product_id)) {
        return { success: false, error: "Invalid Product ID" };
    }

    let connection;

    try {
        connection = await pool.getConnection();

        // Fetch product details
        const [productRows] = await connection.query(`
            SELECT p.*, s.name AS store_name, s.logo AS store_logo, s.is_verified AS store_verified
            FROM products_table p
            JOIN stores_table s ON p.store_id = s.id
            WHERE p.id = ? AND p.status = 1
            LIMIT 1
        `, [product_id]);

        if (productRows.length === 0) {
            return { success: false, error: "Product not found" };
        }
        const product = productRows[0];

        // Fetch product media
        const [media] = await connection.query(`
            SELECT url, type FROM media_table WHERE product_id = ? AND variation_id IS NULL
        `, [product_id]);

        // Fetch MOQ (Minimum Order Quantity)
        const [moq] = await connection.query(`
            SELECT min_qty, ppu FROM product_moq WHERE product_id = ?
        `, [product_id]);

        // Fetch product specifications
        const [specifications] = await connection.query(`
            SELECT name, value FROM product_specifications WHERE product_id = ?
        `, [product_id]);

        // Fetch product reviews (average rating & total count)
        const [productReviews] = await connection.query(`
            SELECT COUNT(*) AS total_reviews, AVG(rating) AS avg_rating 
            FROM product_reviews 
            WHERE product_id = ? AND status = 1
        `, [product_id]);

        // Fetch store reviews (average rating & total count)
        const [storeReviews] = await connection.query(`
            SELECT COUNT(*) AS total_reviews, AVG(rating) AS avg_rating 
            FROM store_reviews 
            WHERE store_id = ? AND status = 1
        `, [product.store_id]);

        // Fetch product variations
        const [variations] = await connection.query(`
            SELECT * FROM variations_table 
            WHERE product_id = ? AND status = 1
        `, [product_id]);

        // Attach attributes & media to each variation
        for (const variation of variations) {
            const [attributes] = await connection.query(`
                SELECT name, value FROM variation_attributes WHERE variation_id = ?
            `, [variation.id]);

            const [variationMedia] = await connection.query(`
                SELECT url, type FROM media_table WHERE variation_id = ?
            `, [variation.id]);

            variation.attributes = attributes;
            variation.media = variationMedia;
        }

        return {
            success: true,
            data: {
                ...product,
                media,
                moq,
                specifications,
                product_reviews: {
                    total_reviews: productReviews[0].total_reviews || 0,
                    avg_rating: parseFloat(productReviews[0].avg_rating) || 0
                },
                store_reviews: {
                    total_reviews: storeReviews[0].total_reviews || 0,
                    avg_rating: parseFloat(storeReviews[0].avg_rating) || 0
                },
                variations
            }
        };

    } catch (error) {
        console.error("Error fetching product:", error);
        return { success: false, error: "An error occurred while fetching product" };
    } finally {
        if (connection) connection.release();
    }
};

module.exports.get_product_reviews = async (req) => {
    const { product_id } = req.params;

    if (isNaN(product_id)) {
        return {
            success: false,
            error: "Invalid Product ID"
        };
    }

    try {
        // Validate if the product exists and is active
        const [productCheck] = await pool.query(
            `SELECT id FROM products_table WHERE id = ? AND status = 1 LIMIT 1`,
            [product_id]
        );

        if (productCheck.length === 0) {
            return {
                success: false,
                error: "Product not found or inactive"
            };
        }

        // Fetch average rating and total reviews
        const [reviewStats] = await pool.query(
            `SELECT 
                COUNT(id) AS total_reviews, 
                IFNULL(AVG(rating), 0) AS average_rating
             FROM product_reviews 
             WHERE product_id = ? AND status = 1`,
            [product_id]
        );

        let { total_reviews, average_rating } = reviewStats[0];

        // Ensure average_rating is a valid number
        average_rating = Number(average_rating) || 0;

        // Determine rating label
        let rating_label;
        if (average_rating >= 4.5) {
            rating_label = "Excellent";
        } else if (average_rating >= 4.0) {
            rating_label = "Very Good";
        } else if (average_rating >= 3.0) {
            rating_label = "Good";
        } else if (average_rating >= 2.0) {
            rating_label = "Fair";
        } else if (average_rating > 0) {
            rating_label = "Poor";
        } else {
            rating_label = "No Ratings Yet";
        }

        // Fetch individual user reviews
        const [userReviews] = await pool.query(
            `SELECT 
                pr.id,
                pr.user_id,
                u.first_name AS user_name,
                pr.rating,
                pr.review_text,
                pr.created_at
             FROM product_reviews pr
             JOIN users_table u ON pr.user_id = u.id
             WHERE pr.product_id = ? AND pr.status = 1
             ORDER BY pr.created_at DESC`,
            [product_id]
        );

        return {
            success: true,
            data: {
                average_rating: parseFloat(average_rating.toFixed(1)), // Keep the rating as a float
                total_reviews,
                rating_label,
                reviews: userReviews // Include user reviews
            }
        };
    } catch (error) {
        console.error("Error fetching product reviews:", error);
        return {
            success: false,
            error: "An error occurred while fetching reviews"
        };
    }
};

module.exports.give_product_review = async (req) => {
    const { product_id, user_id, rating, review_text } = req.body;
    const user_ip = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    // Validate input fields
    if (!product_id || !user_id || !rating) {
        return {
            success: false,
            error: "Product ID, User ID, and Rating are required."
        };
    }

    if (isNaN(product_id) || isNaN(user_id) || isNaN(rating)) {
        return {
            success: false,
            error: "Invalid input format."
        };
    }

    if (rating < 1.0 || rating > 5.0) {
        return {
            success: false,
            error: "Rating must be between 1.0 and 5.0."
        };
    }

    try {
        // Check if the user exists and is active
        const [userCheck] = await pool.query(
            `SELECT id FROM users_table WHERE id = ? AND status = 1 LIMIT 1`,
            [user_id]
        );

        if (userCheck.length === 0) {
            return {
                success: false,
                error: "User not found or inactive."
            };
        }

        // Check if the product exists and is active
        const [productCheck] = await pool.query(
            `SELECT id FROM products_table WHERE id = ? AND status = 1 LIMIT 1`,
            [product_id]
        );

        if (productCheck.length === 0) {
            return {
                success: false,
                error: "Product not found or inactive."
            };
        }

        // Check if the user already left a review (prevent duplicates)
        const [existingReview] = await pool.query(
            `SELECT id FROM product_reviews WHERE product_id = ? AND user_id = ? LIMIT 1`,
            [product_id, user_id]
        );

        if (existingReview.length > 0) {
            return {
                success: false,
                error: "You have already reviewed this product."
            };
        }

        // Insert the new review
        await pool.query(
            `INSERT INTO product_reviews (product_id, user_id, rating, review_text, user_ip) 
             VALUES (?, ?, ?, ?, ?)`,
            [product_id, user_id, rating, review_text, user_ip]
        );

        return {
            success: true,
            data: "Review submitted successfully."
        };

    } catch (error) {
        console.error("Error submitting product review:", error);
        return {
            success: false,
            error: "An error occurred while submitting your review."
        };
    }
};

module.exports.give_store_review = async (req) => {
    const { store_id, user_id, rating, review_text } = req.body;
    const user_ip = req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    if (!store_id || !user_id || !rating) {
        return { success: false, error: "Store ID, User ID, and Rating are required." };
    }

    if (isNaN(store_id) || isNaN(user_id) || isNaN(rating) || rating < 1.0 || rating > 5.0) {
        return { success: false, error: "Invalid input or rating must be between 1.0 and 5.0." };
    }

    try {
        const [userCheck] = await pool.query(`SELECT id FROM users_table WHERE id = ? AND status = 1 LIMIT 1`, [user_id]);
        if (userCheck.length === 0) return { success: false, error: "User not found or inactive." };

        const [storeCheck] = await pool.query(`SELECT id FROM stores_table WHERE id = ? AND status = 1 LIMIT 1`, [store_id]);
        if (storeCheck.length === 0) return { success: false, error: "Store not found or inactive." };

        const [existingReview] = await pool.query(`SELECT id FROM store_reviews WHERE store_id = ? AND user_id = ? LIMIT 1`, [store_id, user_id]);
        if (existingReview.length > 0) return { success: false, error: "You have already reviewed this store." };

        const { product_quality, supplier_service, on_time_shipment } = categorizeReview(req);

        await pool.query(
            `INSERT INTO store_reviews (store_id, user_id, rating, product_quality, supplier_service, on_time_shipment, review_text, user_ip) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [store_id, user_id, rating, product_quality, supplier_service, on_time_shipment, review_text, user_ip]
        );

        return { success: true, data: "Review submitted successfully." };

    } catch (error) {
        console.error("Error submitting store review:", error);
        return { success: false, error: "An error occurred while submitting your review." };
    }
};

module.exports.get_store_reviews = async (req) => {
    const { store_id } = req.params;

    if (isNaN(store_id)) {
        return { success: false, error: "Invalid Store ID" };
    }

    try {
        // Validate if the store exists and is active
        const [storeCheck] = await pool.query(
            `SELECT id FROM stores_table WHERE id = ? AND status = 1 LIMIT 1`,
            [store_id]
        );

        if (storeCheck.length === 0) {
            return { success: false, error: "Store not found or inactive." };
        }

        // Fetch overall rating and total reviews
        const [reviewStats] = await pool.query(
            `SELECT 
                COUNT(id) AS total_reviews, 
                IFNULL(AVG((product_quality + supplier_service + on_time_shipment) / 3), 0) AS average_rating
             FROM store_reviews 
             WHERE store_id = ? AND status = 1`,
            [store_id]
        );

        const total_reviews = reviewStats[0]?.total_reviews || 0;
        const average_rating = parseFloat(reviewStats[0]?.average_rating) || 0;

        // Rating label classification
        let rating_label;
        if (average_rating >= 4.5) {
            rating_label = "Excellent";
        } else if (average_rating >= 4.0) {
            rating_label = "Very Good";
        } else if (average_rating >= 3.0) {
            rating_label = "Good";
        } else if (average_rating >= 2.0) {
            rating_label = "Fair";
        } else if (average_rating > 0) {
            rating_label = "Poor";
        } else {
            rating_label = "No Ratings Yet";
        }

        // Fetch category-specific ratings
        const [categoryRatings] = await pool.query(
            `SELECT 
                AVG(product_quality) AS avg_product_quality,
                AVG(supplier_service) AS avg_supplier_service,
                AVG(on_time_shipment) AS avg_on_time_shipment
             FROM store_reviews 
             WHERE store_id = ? AND status = 1`,
            [store_id]
        );

        const categoryData = categoryRatings[0] || {};

        // Ensure values are numbers before applying .toFixed(1)
        const product_quality = categoryData.avg_product_quality !== null ? parseFloat(categoryData.avg_product_quality).toFixed(1) : null;
        const supplier_service = categoryData.avg_supplier_service !== null ? parseFloat(categoryData.avg_supplier_service).toFixed(1) : null;
        const on_time_shipment = categoryData.avg_on_time_shipment !== null ? parseFloat(categoryData.avg_on_time_shipment).toFixed(1) : null;

        // Fetch user reviews
        const [userReviews] = await pool.query(
            `SELECT 
                sr.id, sr.user_id, u.first_name, sr.rating, sr.review_text, 
                sr.product_quality, sr.supplier_service, sr.on_time_shipment, sr.created_at
             FROM store_reviews sr
             JOIN users_table u ON sr.user_id = u.id
             WHERE sr.store_id = ? AND sr.status = 1
             ORDER BY sr.created_at DESC LIMIT 4`,
            [store_id]
        );

        return {
            success: true,
            data: {
                average_rating: parseFloat(average_rating.toFixed(1)), // Convert to 1 decimal place
                total_reviews,
                rating_label,
                category_ratings: {
                    product_quality,
                    supplier_service,
                    on_time_shipment
                },
                user_reviews: userReviews.map(review => ({
                    id: review.id,
                    user_id: review.user_id,
                    user_name: review.first_name,
                    rating: review.rating,
                    review_text: review.review_text,
                    product_quality: review.product_quality,
                    supplier_service: review.supplier_service,
                    on_time_shipment: review.on_time_shipment,
                    created_at: review.created_at
                }))
            }
        };
    } catch (error) {
        console.error("Error fetching store reviews:", error);
        return { success: false, error: "An error occurred while fetching store reviews." };
    }
};

module.exports.get_shipping_methods = async () => {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // Fetch shipping methods with their providers
        const [results] = await connection.query(`
            SELECT 
                sm.id AS method_id, sm.name AS method_name, sm.description AS method_description, sm.icon AS method_icon, sm.status AS method_status, sm.created_at AS method_created_at,
                sp.id AS provider_id, sp.name AS provider_name, sp.duration_from, sp.duration_to, sp.price, sp.class, sp.offered_by, sp.notice, sp.is_guaranteed, sp.status AS provider_status, sp.created_at AS provider_created_at
            FROM shipping_methods sm
            LEFT JOIN shipping_providers sp ON sm.id = sp.method_id
            ORDER BY sm.id, sp.id
        `);

        await connection.commit();
        connection.release();

        // Structure the response: Group providers under their respective methods
        const shippingMethodsMap = new Map();

        results.forEach(row => {
            if (!shippingMethodsMap.has(row.method_id)) {
                shippingMethodsMap.set(row.method_id, {
                    method_id: row.method_id,
                    name: row.method_name,
                    description: row.method_description,
                    icon: row.method_icon,
                    status: row.method_status,
                    created_at: row.method_created_at,
                    providers: []
                });
            }

            if (row.provider_id) {

                const classMap = {
                    0: "economy",
                    1: "standard",
                    2: "premium"
                };

                shippingMethodsMap.get(row.method_id).providers.push({
                    id: row.provider_id,
                    name: row.provider_name,
                    duration_from: row.duration_from,
                    duration_to: row.duration_to,
                    price: parseFloat(row.price),
                    class: classMap[parseInt(row.class)],
                    offered_by: row.offered_by,
                    notice: row.notice,
                    is_guaranteed: row.is_guaranteed,
                    status: row.provider_status,
                    created_at: row.provider_created_at
                });
            }
        });

        return {
            success: true,
            data: Array.from(shippingMethodsMap.values())
        };
    } catch (error) {
        await connection.rollback();
        connection.release();
        console.error("Error fetching shipping methods:", error);
        return {
            success: false,
            error: "Error fetching shipping methods"
        };
    }
};

module.exports.get_shipping_providers = async () => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM shipping_providers WHERE status = 1"
        );

        const classMap = {
            0: "economy",
            1: "standard",
            2: "premium"
        };

        const providers = rows.map(provider => ({
            ...provider,
            class: classMap[provider.class] || "unknown"
        }));

        return {
            success: true,
            data: providers
        };
    } catch (error) {
        console.error("Error fetching shipping providers:", error);
        return {
            success: false,
            error: "Error fetching shipping providers"
        };
    }
};

