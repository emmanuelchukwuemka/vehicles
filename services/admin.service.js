const { pool } = require("../connection/db");
require('dotenv').config();
const { v4: uuid } = require("uuid")
const axios = require('axios');
const { staticEncrypt, dynamicEncrypt, staticDecrypt, dynamicDecrypt } = require("../helpers/hasher");
const { staticKey, dynamicKey } = require("../helpers/keyVolt");


module.exports.fetch_sellers = async (req) => {

    try {
        const [sellers] = await pool.query('SELECT * FROM sellers_table');

        if (sellers && sellers.length > 0) {

            const sellersData = sellers.map(seller => {
                return seller
            })

            return {
                success: true,
                data: sellersData
            };

        }

        return {
            success: false,
            error: `No available in the database`
        };

    } catch (error) {

        // console.log("Error==>", error)

        throw new Error('Error during login', error);
    }
};

module.exports.create_ability = async (req) => {
    const { name, desc } = req.body;

    if (!name || !desc) {
        return {
            success: false,
            error: "Ability name is required"
        };
    }

    const newName = name.trim().toLowerCase()
    const description = desc.trim().toLowerCase()

    try {
        // Check if ability already exists
        const [existingAbilities] = await pool.query(
            "SELECT id FROM capabilities_table WHERE name = ? LIMIT 1",
            [name]
        );

        if (existingAbilities.length > 0) {
            return {
                success: false,
                error: "This ability already exists"
            };
        }

        // Insert the new ability
        const [{ insertId }] = await pool.query(
            "INSERT INTO capabilities_table (name, description, created_at, updated_at) VALUES (?, ?, NOW(), NOW())",
            [newName, description]
        );

        return {
            success: true,
            data: `${name} Ability added successfully`
        };

    } catch (error) {
        console.error("Error creating ability:", error);
        return {
            success: false,
            error: "Error creating ability"
        };
    }
};

module.exports.create_filter = async (req) => {
    const { name, desc } = req.body;

    if (!name || !desc) {
        return {
            success: false,
            error: "Filter name and description is required"
        };
    }

    const filterName = name.trim().toLowerCase()
    const filterDesc = desc.trim().toLowerCase()

    try {
        // Check if ability already exists
        const [existingFilter] = await pool.query(
            "SELECT id FROM filters_table WHERE name = ? LIMIT 1",
            [name]
        );

        if (existingFilter.length > 0) {
            return {
                success: false,
                error: "This filter already exists"
            };
        }

        // Insert the new ability
        const [{ insertId }] = await pool.query(
            "INSERT INTO filters_table (name, description, status, created_at, updated_at) VALUES (?, ?, 1, NOW(), NOW())",
            [filterName, filterDesc]
        );

        return {
            success: true,
            data: `Filter added successfully`
        };

    } catch (error) {
        console.error("Error creating filter:", error);
        return {
            success: false,
            error: "Error creating filter"
        };
    }
};

module.exports.assign_filter_to_product = async (req) => {
    const { product_id, filters } = req.body;

    if (!product_id || !Array.isArray(filters) || filters.length === 0) {
        return { success: false, error: "Invalid input" };
    }

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction(); // ✅ Start transaction

        // ✅ Check if product exists and is active
        const [productRows] = await conn.query("SELECT id FROM products_table WHERE id = ? AND status = 1", [product_id]);
        if (productRows.length === 0) {
            await conn.rollback();
            return { success: false, error: "Product not found or inactive" };
        }

        // ✅ Validate that all filter IDs exist
        const [filterRows] = await conn.query("SELECT id FROM filters_table WHERE id IN (?)", [filters]);
        const validFilterIds = filterRows.map(row => row.id);

        if (validFilterIds.length !== filters.length) {
            await conn.rollback();
            return { success: false, error: "One or more filters are invalid" };
        }

        // ✅ Insert product-filter mappings (Prevent Duplicates)
        const insertValues = validFilterIds.map(filter_id => [product_id, filter_id]);
        await conn.query("INSERT IGNORE INTO product_filters (product_id, filter_id) VALUES ?", [insertValues]);

        await conn.commit(); // ✅ Commit transaction
        return { success: true, data: "Filters assigned successfully" };

    } catch (error) {
        await conn.rollback(); // ✅ Rollback on error
        console.error("Error assigning filters:", error);
        return { success: false, error: "Internal server error" };
    } finally {
        conn.release(); // ✅ Always release connection
    }
};

module.exports.create_shipping_method = async (req) => {
    const { name, description, icon } = req.body;

    // Validate input
    if (!name || !description) {
        return {
            success: false,
            error: "Shipping method name and description are required",
        };
    }

    const trim_name = name.trim().toLowerCase();
    const trim_desc = description.trim().toLowerCase();
    const trim_icon = icon.trim().toLowerCase();

    try {
        // Check if the shipping method already exists
        const [existingMethod] = await pool.query(
            "SELECT id FROM shipping_methods WHERE name = ? LIMIT 1",
            [trim_name]
        );

        if (existingMethod.length > 0) {
            return {
                success: false,
                error: "This shipping method already exists",
            };
        }

        // Insert the new shipping method
        const [{ insertId }] = await pool.query(
            "INSERT INTO shipping_methods (name, description, icon, status, created_at) VALUES (?, ?, ?, 1, NOW())",
            [trim_name, trim_desc, trim_icon]
        );

        return {
            success: true,
            data: `Shipping method added successfully`,
        };
    } catch (error) {
        console.error("Error creating shipping method:", error);
        return {
            success: false,
            error: "Error creating shipping method",
        };
    }
};

module.exports.add_shipping_provider = async (req) => {
    const {
        method_id,
        name,
        duration_from,
        duration_to,
        price,
        class: shipping_class,
        notice,
        is_guaranteed,
        offered_by
    } = req.body;

    // Validate required fields
    if (!method_id || !name || !duration_from || !duration_to || !price || !shipping_class || !offered_by) {
        return {
            success: false,
            error: "Some required information are missing",
        };
    }

    const trim_Name = name.trim().toLowerCase();
    const trim_offeredBy = offered_by.trim();
    const trim_notice = notice ? notice.trim() : "";

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        // Check if the shipping method exists
        const [methodExists] = await connection.query(
            "SELECT id FROM shipping_methods WHERE id = ? LIMIT 1",
            [method_id]
        );

        if (methodExists.length === 0) {
            await connection.rollback();
            return {
                success: false,
                error: "The provided shipping method does not exist",
            };
        }

        // Check if provider already exists for the method
        const [existingProvider] = await connection.query(
            "SELECT id FROM shipping_providers WHERE method_id = ? AND name = ? LIMIT 1",
            [method_id, trim_Name]
        );

        if (existingProvider.length > 0) {
            await connection.rollback();
            return {
                success: false,
                error: "This provider already exists for the selected shipping method",
            };
        }

        // Insert new provider
        const [{ insertId }] = await connection.query(
            `INSERT INTO shipping_providers 
            (method_id, name, duration_from, duration_to, price, class, offered_by, notice, is_guaranteed, status, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW())`,
            [
                method_id,
                trim_Name,
                duration_from,
                duration_to,
                price,
                shipping_class,
                trim_offeredBy,
                trim_notice,
                is_guaranteed ? 1 : 0,
            ]
        );

        await connection.commit();
        connection.release();

        return {
            success: true,
            data: `Shipping provider added successfully`,
        };
    } catch (error) {
        await connection.rollback();
        connection.release();
        console.error("Error creating shipping provider:", error);
        return {
            success: false,
            error: "Error creating shipping provider",
        };
    }
};


module.exports.createStoreGalleryItem = async (req, res) => {
    const { store_id, url, type, position, title, description } = req.body;

    // Simple validation
    if (!store_id || !url || !type || !position || !title || !description) {
        return { success: false, error: 'All fields are required.' };
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Check if the store exists and is active (status = 1)
        const [storeRows] = await connection.query(
            `SELECT id FROM stores_table WHERE id = ? AND status = 1`,
            [store_id]
        );

        if (storeRows.length === 0) {
            await connection.rollback();
            return { success: false, error: 'Store does not exist or is not active.' };
        }

        // Insert into store_gallery
        const [result] = await connection.query(
            `INSERT INTO store_gallery (store_id, url, type, position, title, description) VALUES (?, ?, ?, ?, ?, ?)`,
            [store_id, url.trim(), type.trim(), position.trim(), title.trim(), description.trim()]
        );

        await connection.commit();
        return {
            success: true,
            data: 'Gallery item created successfully.'
        };

    } catch (error) {
        await connection.rollback();
        console.error(error);
        return { success: false, error: 'Failed to create gallery item.' };
    } finally {
        connection.release();
    }
};


module.exports.createPaymentGateway = async (req, res) => {
    const { name, logo, provider, is_active, sandbox_mode, config } = req.body;

    // Basic validation
    if (!name || !provider) {
        return {
            success:false,
            error:"Name and provider are required"
        };
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [existing] = await connection.query(
            `SELECT id FROM payment_gateways WHERE provider = ? LIMIT 1`,
            [provider.trim()]
        );

        if (existing.length > 0) {
            await connection.release();
            return {
                success:false,
                error:"Payment gateway already exists"
            };
            
        }

        const [result] = await connection.query(
            `INSERT INTO payment_gateways (name, logo, provider, is_active, sandbox_mode, config)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                name.trim(),
                logo,
                provider.trim(),
                is_active ?? true,
                sandbox_mode ?? false,
                config ? JSON.stringify(config) : null
            ]
        );

        await connection.commit();
        return {
            success:true,
            data:"Payment gateway created successfully"
        };

    } catch (err) {
        await connection.rollback();
        console.error('createPaymentGateway error:', err);
        return {
            success:false,
            error:"Failed to create payment gateway"
        };
    } finally {
        connection.release();
    }
};

module.exports.createLayout = async (req) => {

    const { name, description, priority } = req.body

    if (!name || !description || !priority) {
        return { success: false, error: 'All fields (name, description, priority) are required' };
    }

    const trim_name = name?.trim();
    const trim_description = description?.trim();

    const query = `
    INSERT INTO layouts_table (name, description, priority)
    VALUES (?, ?, ?)
  `;

    try {
        const [result] = await pool.query(query,
            [
                trim_name,
                trim_description,
                priority
            ]
        );
        return {
            success: true,
            data: "Layout created successfully"
        };
    } catch (error) {
        return {
            success: false,
            error: error.message || 'Database error'
        };
    }
}

module.exports.createAttribute = async (req) => {

    const { name, label = null, layout_id = null } = req.body

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [existing] = await connection.query(
            'SELECT id FROM attributes_table WHERE name = ?',
            [name.trim()]
        );

        if (existing.length > 0) {
            connection.release();
            return {
                success: false,
                data: "Attribute already exists"
            };
        }

        const [result] = await connection.query(
            `INSERT INTO attributes_table (name, label, layout_id) VALUES (?, ?, ?)`,
            [name.trim(), label, layout_id]
        );

        await connection.commit();
        return {
            success: true,
            data: "Attribute created successfully"
        };

    } catch (error) {
        console.log("Err=>", error)
        await connection.rollback();
        return {
            success: false,
            data: "Failed to create attribute"
        };

    } finally {
        connection.release();
    }
};

exports.decryptData = async (req, res) => {
    const { fields, algorithm, table } = req.body;

    // Validate input
    if (!table || !Array.isArray(fields) || fields.length === 0 || !algorithm) {
        return {
            success: false,
            error: "Missing required fields: table, fields[], or algorithm"
        };
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Escape table and field names to prevent SQL injection
        const escapedFields = fields.map(f => `\`${f}\``).join(', ');
        const query = `SELECT id, ${escapedFields} FROM \`${table}\``;

        const [rows] = await connection.query(query, []);

        if (rows.length === 0) {
            await connection.rollback();
            return res.json({
                success: false,
                error: "No record found"
            });
        }

        // Load encryption config
        //const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
        //const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');

        const decryptedRows = [];

        for (const row of rows) {
            const updates = {};

            for (const field of fields) {
                try {
                    const value = row[field];
                    if (!value) continue;

                    let decrypted;
                    if (algorithm === 'dynamic') {
                        decrypted = dynamicDecrypt(value, dynamicKey);
                    } else if (algorithm === 'static') {
                        decrypted = staticDecrypt(value, staticKey);
                    } else {
                        throw new Error("Unsupported algorithm");
                    }

                    updates[field] = decrypted;

                } catch (err) {
                    console.warn(`Failed to decrypt field '${field}' for row ID ${row.id}:`, err.message);
                }

                decryptedRows.push({
                    id: row.id,
                    ...updates
                });
            }

            if (Object.keys(updates).length > 0) {
                const setClause = Object.keys(updates).map(f => `\`${f}\` = ?`).join(', ');
                const values = Object.values(updates);
                values.push(row.id);

                await connection.query(
                    `UPDATE \`${table}\` SET ${setClause} WHERE id = ?`,
                    values
                );
            }
        }

        // await connection.rollback();
        // return {
        //     success: true,
        //     data: decryptedRows
        // };

        await connection.commit();
        return {
            success: true,
            data: "Decryption and update successful"
        };

    } catch (err) {
        await connection.rollback();
        console.error('Decryption error:', err);
        return res.json({
            success: false,
            error: "Failed to decrypt and update data"
        });
    } finally {
        connection.release();
    }
};