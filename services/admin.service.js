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
