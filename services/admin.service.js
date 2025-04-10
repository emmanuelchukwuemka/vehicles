const { pool } = require("../connection/db");
require('dotenv').config();
const { v4: uuid } = require("uuid")
const axios = require('axios');
const { staticEncrypt, dynamicEncrypt } = require("../helpers/hasher");
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
