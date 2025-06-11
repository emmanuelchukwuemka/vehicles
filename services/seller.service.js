const { pool } = require("../connection/db");
require('dotenv').config();
const { v4: uuid } = require("uuid")
const axios = require('axios');
const { staticEncrypt, dynamicEncrypt, generateVariationSKU, hashPassword, generateProductSKU } = require("../helpers/hasher");
const { staticKey, dynamicKey } = require("../helpers/keyVolt");
const { fetchStoreGallery } = require("../utility/getStoreGallery");
const { getStoreReviews } = require("../utility/getStoreReviews");
const { getStoreCapabilities } = require("../utility/store/getStoreCapabilities");
const { getProductMOQ } = require("../utility/product/getProductMOQ");
const { getProductMedia } = require("../utility/product/getProductMedia");


module.exports.create_vendor = async (req) => {

    const { firstName, lastName, email, phone, country, password, picture } = req.body;

    if (!firstName || !lastName || !email || !phone || !country || !password || !picture) {

        return {
            success: false,
            error: "One or more required data is missing"
        }
    }

    let connection;

    try {
        const hashedAccess = await hashPassword(password);
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const mergedData = {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            email: email.trim().toLowerCase(),
            phone: JSON.stringify(dynamicEncrypt(phone, dynamicKey)),
            nationality: country.trim().toLowerCase(),
            password: hashedAccess,
            picture: picture,
            is_verified: 1,
            status: 1
        };

        const columns = Object.keys(mergedData).join(', ');
        const placeholders = Array(Object.keys(mergedData).length).fill('?').join(', ');
        const values = Object.values(mergedData);

        const [{ insertId }] = await connection.query(`
                INSERT INTO vendors_table (${columns}, created_at, updated_at)
                VALUES (${placeholders}, NOW(), NOW())
            `, values);

        if (insertId) {
            await connection.commit();
            return {
                success: true,
                data: "Vendor account created successfully"
            };
        }

        await connection.rollback();
        return {
            success: false,
            error: "Unable to create vendor account"
        };

    } catch (error) {
        await connection.rollback();
        console.error('Error creating vendor account:', error);
        return {
            success: false,
            error: "Could not create new vendor, please try again"
        };
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports.create_store = async (req) => {
    const { vendor_id, name, slogan, country, address, logo, netWorth, staff, floor_space, capabilities = [], banner = null, picture = null } = req.body;

    if (!vendor_id || !name || !slogan || !country || !address || !logo || !staff) {
        return {
            success: false,
            error: "One or more required data fields are missing."
        };
    }

    let connection;

    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Prepare store data
        const mergedData = {
            vendor_id,
            name: name.trim(),
            slogan: slogan.trim(),
            country: country.trim().toLowerCase(),
            banner: banner || null,
            picture: picture || null,
            net_worth: netWorth,
            logo,
            staff_count: staff,
            address,
            floor_space: floor_space,
            code: uuid(), // Ensure uniqueness
            is_verified: 1,
            status: 1
        };

        const columns = Object.keys(mergedData).join(', ');
        const placeholders = Object.keys(mergedData).map(() => '?').join(', ');
        const values = Object.values(mergedData);

        const [{ insertId }] = await connection.query(
            `INSERT INTO stores_table (${columns}, created_at, updated_at) VALUES (${placeholders}, NOW(), NOW())`,
            values
        );

        if (insertId) {
            // Insert Capabilities efficiently
            if (capabilities.length > 0) {
                const capabilities_IDs = capabilities.map(capability => [insertId, capability]);
                await connection.query(
                    `INSERT INTO store_capabilities (store_id, capability_id) VALUES ?`,
                    [capabilities_IDs]
                );
            }

            await connection.commit();
            return {
                success: true,
                data: "Your store has been created successfully."
            };
        }

        await connection.rollback();
        return {
            success: false,
            error: "Unable to create store."
        };

    } catch (error) {
        await connection.rollback();
        console.error('Error creating store:', error);
        return {
            success: false,
            error: "Could not create store, please try again."
        };
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports.add_collection = async (req) => {
    const { store_id, name } = req.body;

    if (!store_id || !name) {
        return {
            success: false,
            error: "Missing required fields: store_id or name"
        };
    }

    let connection;

    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Check if the collection already exists
        const [existingCollection] = await connection.query(`
            SELECT id FROM collections_table WHERE store_id = ? AND name = ?
        `, [store_id, name.trim()]);

        if (existingCollection.length > 0) {
            await connection.rollback();
            return {
                success: false,
                error: "Collection with this name already exists for the store"
            };
        }

        // Insert new collection
        const [{ insertId }] = await connection.query(`
            INSERT INTO collections_table (store_id, name, created_at, updated_at)
            VALUES (?, ?, NOW(), NOW())
        `, [store_id, name.trim()]);

        if (insertId) {
            await connection.commit();
            return {
                success: true,
                data: "Collection created successfully"
            };
        }

        await connection.rollback();
        return {
            success: false,
            error: "Unable to create collection"
        };

    } catch (error) {
        if (connection) await connection.rollback();
        console.error("Error creating collection:", error);
        return {
            success: false,
            error: "Database error while creating collection"
        };
    } finally {
        if (connection) connection.release();
    }
};

module.exports.createBaseProduct = async (req) => {
    const { store_id, collection_id, subcategory_id, name, desc, customizable, specifications, moq, sample, discount, price, weight, stock } = req.body;

    console.log(req.body)

    if (!store_id || !collection_id || !subcategory_id || !name || !desc || !price) {
        return {
            success: false,
            error: "Your product details are missing some required information"
        };
    }

    let connection;

    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const product_code = uuid(); // Unique product reference code

        const [{ insertId: productId }] = await connection.query(
            `INSERT INTO products_table 
             (store_id, subcategory_id, collection_id, product_code, name, description, customizable, price, discount, weight, stock, status, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW())`,
            [
                store_id,
                subcategory_id,
                collection_id,
                product_code,
                name.trim(),
                desc.trim(),
                customizable || 0,
                price,
                discount,
                weight,
                stock
            ]
        );

        if (!productId) {
            await connection.rollback();
            return { success: false, error: "Product insertion failed" };
        }

        // 🔹 Insert Sample (if available)
        if (sample && sample.ppu != null && sample.min_qty != null) {
            // Use ON DUPLICATE KEY UPDATE in case you ever re‑upsert the same product
            await connection.query(
                `INSERT INTO product_sample (store_id, product_id, ppu, min_qty, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW()) ON DUPLICATE KEY UPDATE ppu = VALUES(ppu), min_qty = VALUES(min_qty),  updated_at = NOW()`, [store_id, productId, sample.ppu, sample.min_qty]
            );
        }

        // 🔹 Insert MOQ (if available)
        if (Array.isArray(moq)) {
            for (const { min_qty, ppu } of moq) {
                await connection.query(
                    `INSERT INTO product_moq (product_id, min_qty, ppu, created_at, updated_at)
                             VALUES (?, ?, ?, NOW(), NOW())`,
                    [productId, min_qty, ppu]
                );
            }
        }

        // 🔹 Insert Specifications (if available)
        if (Array.isArray(specifications)) {
            for (const { name: specName, value: specValue } of specifications) {
                await connection.query(
                    `INSERT INTO product_specifications (product_id, name, value, created_at)
                     VALUES (?, ?, ?, NOW())`,
                    [productId, specName, specValue]
                );
            }
        }

        await connection.commit();
        return {
            success: true,
            data: { product_id: productId, product_code }
        };
    } catch (error) {
        if (connection) await connection.rollback();
        console.error("Error creating base product:", error);
        return { success: false, error: "Error creating product, please try again" };
    } finally {
        if (connection) connection.release();
    }
};

module.exports.createProductVariation = async (req) => {
    const { product_id, product_code, variation } = req.body;

    if (!product_id || !product_code || !variation) {
        return {
            success: false,
            error: "Product id and code is required"
        };
    }

    let connection;

    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // 🔹 Check if product with the same SKU already exists
        const [[productData]] = await connection.query(
            `SELECT id, product_code, subcategory_id, name FROM products_table WHERE id = ? AND product_code = ? LIMIT 1`,
            [product_id, product_code]
        );

        if (!productData) {
            //await connection.rollback();
            return {
                success: false,
                error: "Product could not be found"
            };
        }

        const variationSku = generateVariationSKU(productData, variation);

        const [{ insertId: variationId }] = await connection.query(
            `INSERT INTO variations_table (product_id, sku, status, created_at, updated_at)
            VALUES (?, ?, 1, NOW(), NOW())`,
            [
                product_id,
                variationSku
            ]
        );

        if (!variationId) {
            await connection.rollback();
            return {
                success: false,
                error: "Variation insertion failed"
            };
        }

        // Insert variation attributes
        for (const attribute of variation.attributes || []) {
            const { attribute_id, label, value, price, stock, weight, image } = attribute;

            // Insert into variation_attributes and capture inserted ID
            const [attributeResult] = await connection.query(
                `INSERT INTO variation_attributes (variation_id, attribute_id, label, value, price, stock, weight, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
                [variationId, attribute_id, label, value, price, stock, weight]
            );

            const insertedAttributeId = attributeResult.insertId;

            // Insert image into media_table if present
            if (image) {
                await connection.query(
                    `INSERT INTO media_table (product_id, variation_id, attribute_id, url, type, created_at)
             VALUES (?, ?, ?, ?, ?, NOW())`,
                    [product_id, variationId, insertedAttributeId, image, "image"]
                );
            }
        }

        // 🔹 Insert gallery files (if available)
        for (const { url, type } of variation.media || []) {
            await connection.query(
                `INSERT INTO media_table (product_id, variation_id, url, type, created_at) VALUES (?, ?, ?, ?, NOW())`,
                [product_id, variationId, url, type]
            );
        }


        await connection.commit();
        return {
            success: true,
            data: variationSku
        };
    } catch (error) {
        if (connection) await connection.rollback();
        console.error("Error creating product variation:", error);
        return { success: false, error: "Error creating variation, please try again" };
    } finally {
        if (connection) connection.release();
    }
};

module.exports.fetchStores = async (req) => {
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
        let query = `SELECT DISTINCT s.id, s.code, s.name, s.logo, s.net_worth, s.floor_space, s.staff_count, s.is_verified, s.created_at, s.status FROM stores_table s
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
        const capabilities = await getStoreCapabilities(storeIds, pool, ['id', 'name']);

        // Fetch Products
        const [products] = await connection.query(`
            SELECT p.id, p.store_id, p.name, p.price, p.discount
            FROM (
                SELECT 
                    p.*,
                    ROW_NUMBER() OVER (PARTITION BY p.store_id ORDER BY p.id) AS row_num
                FROM products_table p
                WHERE p.store_id IN (?)
            ) p
            WHERE p.row_num <= 3;
        `, [storeIds]);

        if (products.length > 0) {
            const productIds = products.map(p => p.id);

            const moq = await getProductMOQ(productIds);

            const mediaFields = ['product_id', 'url'];
            const media = await getProductMedia(productIds, pool, mediaFields);

            // Structure the response
            let storeData = stores.map(store => ({
                store: store,
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
                        media: media[p.id]
                    }))
            }));

            return { success: true, data: storeData };
        }

        return { success: false, error: "No stores found" };

    } catch (error) {
        console.error("Error fetching stores:", error);
        return { success: false, error: "An error occurred while fetching stores." };
    } finally {
        if (connection) connection.release();
    }
};

module.exports.save_live = async (req) => {

    const conn = await pool.getConnection();

    const {
        store_id,
        product_id,
        title,
        description = '',
        stream_url,
        thumbnail_url = null
    } = req.body;

    try {
        // Begin transaction
        await conn.beginTransaction();

        // Validate store
        const [storeRows] = await conn.query(
            `SELECT id FROM stores_table WHERE id = ? AND status = 1 LIMIT 1`,
            [store_id]
        );

        if (storeRows.length === 0) {
            await conn.rollback();
            return {
                success: false,
                error: "Invalid or inactive store"
            };
        }

        const store = storeRows[0]

        // If product_id is provided, validate product

        const [productRows] = await conn.query(
            `SELECT id, store_id FROM products_table WHERE id = ? AND status = 1 LIMIT 1`,
            [product_id, store_id]
        );

        if (productRows.length === 0) {
            return {
                success: false,
                error: "Invalid or inactive product"
            };
        }

        const product = productRows[0]

        if (store.id !== product.store_id) {
            return {
                success: false,
                error: "Product and store does not match"
            };
        }

        console.log("prod==>", product)

        // Insert live session
        const [result] = await conn.query(
            `INSERT INTO live_table 
            (store_id, product_id, title, description, stream_url, is_live) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                store_id,
                product_id,
                title?.trim().toLowerCase(),
                description?.trim(),
                stream_url?.trim(),
                1 // is_live = true
            ]
        );

        await conn.commit();
        return {
            success: true,
            data: `Live stored with an id: ${result.insertId}`
        }

    } catch (error) {
        await conn.rollback();
        console.error('create_live_session error:', error);
        return {
            success: false,
            error: "Failed to save live session"
        };
    } finally {
        conn.release();
    }

}


module.exports.fetch_single_store = async (req) => {
    const { store_id } = req.body;

    if (!store_id) {
        return { success: false, error: "store_id is required." };
    }

    try {
        // Fetch store details
        const [stores] = await pool.query(`
            SELECT s.id, s.code, s.name, s.logo, s.net_worth, s.floor_space,
                   s.staff_count, s.is_verified, s.created_at AS store_created_at, s.status
            FROM stores_table s
            WHERE s.id = ? AND s.status = 1
        `, [store_id]);

        if (!stores.length) {
            return { success: false, error: "Store not found or inactive." };
        }

        const store = stores[0];

        // Fetch capabilities
        const [capabilities] = await pool.query(`
            SELECT sc.store_id, c.id AS capability_id, c.name
            FROM store_capabilities sc
            JOIN capabilities_table c ON sc.capability_id = c.id
            WHERE sc.store_id = ?
        `, [store_id]);

        // Format response
        const storeData = {
            id: store.id,
            code: store.code,
            name: store.name,
            logo: store.logo,
            net_worth: parseFloat(store.net_worth),
            floor_space: store.floor_space,
            staff_count: store.staff_count,
            is_verified: store.is_verified,
            created_at: store.store_created_at,
            status: parseInt(store.status),
            capabilities: capabilities.map(c => ({
                id: c.capability_id,
                name: c.name
            })),
            //products: [] // Empty array for consistent frontend structure
        };

        return { success: true, data: [storeData] };

    } catch (error) {
        console.error("Error fetching store:", error);
        return { success: false, error: "An error occurred while fetching the store." };
    }
};


module.exports.fetch_store_products = async (req) => {
    const { store_id } = req.query; // Use query params for GET requests

    if (!store_id) {
        return {
            success: false,
            error: "Store ID is required"
        };
    }

    try {
        const [products] = await pool.query(
            "SELECT * FROM products_table WHERE store_id = ? ORDER BY created_at DESC",
            [store_id]
        );

        if (products && products.length > 0) {

            return {
                success: true,
                data: products
            };
        }

        return {
            success: false,
            error: "Products not available"
        };

    } catch (error) {
        console.error("Error fetching products:", error);
        return {
            success: false,
            error: "An error occurred while fetching products"
        };
    }
};

module.exports.get_store_reviews = async (req) => {
    const { store_id } = req.params;

    if (isNaN(store_id)) {
        return { success: false, error: "Invalid Store ID" };
    }

    try {
        const storeReviews = await getStoreReviews(store_id)
        return storeReviews
    } catch (error) {
        console.log("Err=>", error)
    }
};

module.exports.fetch_store_collections = async (req) => {
    const { store_id } = req.body;

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

module.exports.fetch_product = async (req) => {

    const { product_id } = req.params;

    if (isNaN(product_id)) {
        return {
            success: false,
            error: "Invalid Product ID"
        };
    }

    try {
        // Fetch product details
        const [productRows] = await pool.query(
            `SELECT * FROM products_table WHERE id = ?`,
            [product_id]
        );

        if (productRows.length === 0) {
            return {
                success: false,
                error: "Product not found"
            };
        }

        const product = productRows[0];

        // Fetch variations
        const [variations] = await pool.query(
            `SELECT * FROM variations_table WHERE product_id = ?`,
            [product_id]
        );

        for (const variation of variations) {
            // Fetch attributes for each variation
            const [attributes] = await pool.query(
                `SELECT name, value FROM variation_attributes WHERE variation_id = ?`,
                [variation.id]
            );

            // Fetch media for each variation
            const [media] = await pool.query(
                `SELECT url, type FROM media_table WHERE variation_id = ?`,
                [variation.id]
            );

            variation.attributes = attributes;
            variation.media = media;
        }

        // Fetch MOQ
        const [moq] = await pool.query(
            `SELECT min_qty, ppu FROM product_moq WHERE product_id = ?`,
            [product_id]
        );

        return {
            success: true,
            data: {
                ...product,
                variations,
                moq
            }
        };

    } catch (error) {
        console.error("Error fetching product:", error);
        return {
            success: false,
            error: "An error occurred while fetching product"
        };
    }
};

module.exports.fetchStoreGallery = async (req) => {
    const { store_id } = req.body;

    if (isNaN(store_id)) {
        return {
            success: false,
            error: "Invalid store ID"
        };
    }

    const galleryRes = await fetchStoreGallery(store_id);
    return galleryRes

};