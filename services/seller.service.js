const { pool } = require("../connection/db");
require('dotenv').config();
const { v4: uuid } = require("uuid")
const axios = require('axios');
const { staticEncrypt, dynamicEncrypt, generateVariationSKU, hashPassword, generateProductSKU } = require("../helpers/hasher");
const { staticKey, dynamicKey } = require("../helpers/keyVolt");


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

module.exports.add_product = async (req) => {
    const productData = req.body;
    const { store_id, collection_id, subcategory_id, name, desc, customizable, price, discount, weight, sample, variations, moq, specifications } = productData;

    if (!store_id || !collection_id || !subcategory_id || !name || !desc) {
        return {
            success: false,
            error: "Your product details are missing some required information"
        };
    }

    let connection;

    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Generate SKU for main product
        const sku = generateProductSKU(productData);
        const product_code = uuid();

        // 🔹 Check if product with the same SKU already exists
        const [existingProduct] = await connection.query(
            `SELECT id FROM products_table WHERE sku = ? LIMIT 1`,
            [sku]
        );

        if (existingProduct.length > 0) {
            await connection.rollback();
            return {
                success: false,
                error: "A product with this SKU already exists"
            };
        }

        // Insert the main product
        const [{ insertId: productId }] = await connection.query(
            `INSERT INTO products_table 
                (store_id, subcategory_id, collection_id, product_code, sku, name, description, customizable, price, discount, weight, sample, status, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW())`,
            [
                store_id, subcategory_id, collection_id, product_code, sku,
                name.trim(), desc.trim(), customizable, price, discount, weight, JSON.stringify(sample)
            ]
        );

        if (!productId) {
            await connection.rollback();
            return {
                success: false,
                error: "Product insertion failed"
            };
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

        // Insert variations
        if (Array.isArray(variations)) {
            for (const variation of variations) {
                const variationSku = generateVariationSKU(productData, variation);

                const [{ insertId: variationId }] = await connection.query(
                    `INSERT INTO variations_table (product_id, sku, price, stock, status, created_at, updated_at)
                     VALUES (?, ?, ?, ?, 1, NOW(), NOW())`,
                    [
                        productId, variationSku,
                        variation.price, variation.stock
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
                for (const { name: attrName, value: attrValue } of variation.attributes || []) {
                    await connection.query(
                        `INSERT INTO variation_attributes (variation_id, name, value, created_at) 
                         VALUES (?, ?, ?, NOW())`,
                        [variationId, attrName, attrValue]
                    );
                }

                // Insert variation media
                for (const { url, type } of variation.media || []) {
                    await connection.query(
                        `INSERT INTO media_table (product_id, variation_id, url, type, created_at) VALUES (?, ?, ?, ?, NOW())`,
                        [productId, variationId, url, type]
                    );
                }
            }
        }

        //await connection.rollback();
        await connection.commit();
        return {
            success: true,
            data: `Product ${sku} created successfully`
        };

    } catch (error) {
        if (connection) await connection.rollback();
        console.error("Error adding product:", error);
        return { success: false, error: "Error adding product, please try again" };
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