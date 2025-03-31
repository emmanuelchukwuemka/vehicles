const { pool } = require("../connection/db");
require('dotenv').config();
const { v4: uuid } = require("uuid")
const axios = require('axios');

module.exports.add_section = async (req) => {
    const { name, image } = req.body;

    if (!name || !image) {
        return {
            success: false,
            error: "Section name is required",
        };
    }

    try {
        // Check if the section already exists
        const [[sectionData]] = await pool.query(
            `SELECT * FROM section_table WHERE _name = ?`,
            [name]
        );

        if (sectionData && sectionData.id) {
            return {
                success: false,
                error: "Section already exists",
            };
        }

        // Insert the new section
        const [{ affectedRows }] = await pool.query(
            `INSERT INTO section_table (_name, _image) VALUES (?, ?)`,
            [name, image]
        );

        if (affectedRows > 0) {
            return {
                success: true,
                data: "New section added successfully",
            };
        } else {
            return {
                success: false,
                error: "Failed to add the new section",
            };
        }
    } catch (error) {
        console.error("Error adding section:", error);
        return {
            success: false,
            error: "Database operation failed",
        };
    }
};
// TODO: fix some errors and deploy to github
module.exports.fetch_sections = async (req) => {
    try {
        // Fetch all records from the section_table
        const [rows] = await pool.query(`
            SELECT * FROM section_table
        `);

        if (rows.length > 0) {
            return {
                success: true,
                data: rows, // Returning all fetched records
            };
        } else {
            return {
                success: false,
                error: 'No sections found in the database',
            };
        }
    } catch (error) {
        console.error('Error fetching sections:', error);
        return {
            success: false,
            error: 'Failed to fetch sections from the database',
        };
    }
};
module.exports.update_section = async (req) => {
    const { id, name } = req.body;

    if (!id || !name) {
        return {
            success: false,
            error: "Section ID and name are required",
        };
    }

    try {
        // Update the section by ID
        const [{ affectedRows }] = await pool.query(
            `UPDATE section_table SET _name = ? WHERE id = ?`,
            [name, id]
        );

        if (affectedRows > 0) {
            return {
                success: true,
                data: "Section updated successfully",
            };
        } else {
            return {
                success: false,
                error: "No section found with the given ID",
            };
        }
    } catch (error) {
        console.error("Error updating section:", error);
        return {
            success: false,
            error: "Failed to update section",
        };
    }
};

module.exports.add_category = async (req) => {
    const { name, sectionId, image } = req.body;

    if (!name || !sectionId || !image) {
        return {
            success: false,
            error: "Parameters are not complete",
        };
    }

    try {
        // Check if the section exists
        const [section] = await pool.query(
            `SELECT id FROM section_table WHERE id = ?`,
            [sectionId]
        );

        if (section.length === 0) {
            return {
                success: false,
                error: "Section with the provided ID does not exist",
            };
        }

        // Check if the category already exists in the section
        const [existingCategory] = await pool.query(
            `SELECT id FROM category_table WHERE _name = ? AND _sectionId = ?`,
            [name, sectionId]
        );

        if (existingCategory.length > 0) {
            return {
                success: false,
                error: "Category already exists under the specified section",
            };
        }

        // Insert the new category
        const [{ affectedRows }] = await pool.query(
            `INSERT INTO category_table (_name, _sectionId, _image) VALUES (?, ?, ?)`,
            [name, sectionId, image]
        );

        if (affectedRows > 0) {
            return {
                success: true,
                data: "New category added successfully",
            };
        } else {
            return {
                success: false,
                error: "Failed to insert category into the database",
            };
        }
    } catch (error) {
        console.error("Error adding category:", error);
        return {
            success: false,
            error: "Database operation failed",
        };
    }
};
module.exports.fetch_category = async (req) => {
    const { sectionId } = req.query;
    console.log("section==>", sectionId)
    try {
        // Fetch all records from the section_table
        const [rows] = await pool.query(`
            SELECT * FROM category_table WHERE _sectionId = ?
        `, [sectionId]);

        if (rows.length > 0) {
            return {
                success: true,
                data: rows, // Returning all fetched records
            };
        } else {
            return {
                success: false,
                error: 'No sections found in the database',
            };
        }
    } catch (error) {
        console.error('Error fetching sections:', error);
        return {
            success: false,
            error: 'Failed to fetch sections from the database',
        };
    }
};
module.exports.update_category = async (req) => {
    const { id, name } = req.body;

    if (!id || !name) {
        return {
            success: false,
            error: "Section ID and name are required",
        };
    }

    try {
        // Update the section by ID
        const [{ affectedRows }] = await pool.query(
            `UPDATE category_table SET _name = ? WHERE id = ?`,
            [name, id]
        );

        if (affectedRows > 0) {
            return {
                success: true,
                data: "Section updated successfully",
            };
        } else {
            return {
                success: false,
                error: "No section found with the given ID",
            };
        }
    } catch (error) {
        console.error("Error updating section:", error);
        return {
            success: false,
            error: "Failed to update section",
        };
    }
};

module.exports.add_subCategory = async (req) => {
    const { name, categoryId, image } = req.body;

    if (!name || !categoryId || !image) {
        return {
            success: false,
            error: "Parameters are not complete",
        };
    }

    try {
        // Check if the category exists
        const [categoryRows] = await pool.query(
            `SELECT id FROM category_table WHERE id = ?`,
            [categoryId]
        );

        if (categoryRows.length === 0) {
            return {
                success: false,
                error: "Category with the provided ID does not exist",
            };
        }

        // Check if the sub-category already exists under the category
        const [existingSubCategory] = await pool.query(
            `SELECT id FROM subcategory_table WHERE _name = ? AND _categoryId = ?`,
            [name, categoryId]
        );

        if (existingSubCategory.length > 0) {
            return {
                success: false,
                error: "Sub-category already exists under the specified category",
            };
        }

        // Insert the new sub-category
        const [{ affectedRows }] = await pool.query(
            `INSERT INTO subcategory_table (_name, _categoryId, _image) VALUES (?, ?, ?)`,
            [name, categoryId, image]
        );

        if (affectedRows > 0) {
            return {
                success: true,
                data: "New sub-category added successfully",
            };
        } else {
            return {
                success: false,
                error: "Failed to insert sub-category into the database",
            };
        }
    } catch (error) {
        console.error("Error adding sub-category:", error);
        return {
            success: false,
            error: "Database operation failed",
        };
    }
};

module.exports.fetch_subCategory = async (req) => {
    const { categoryId } = req.query;

    try {
        // Fetch all records from the section_table
        const [rows] = await pool.query(`
            SELECT * FROM subcategory_table WHERE _categoryId = ?
        `, [categoryId]);

        if (rows.length > 0) {
            return {
                success: true,
                data: rows, // Returning all fetched records
            };
        } else {
            return {
                success: false,
                error: 'No sub-category items found in the database',
            };
        }
    } catch (error) {
        console.error('Error fetching sub-category:', error);
        return {
            success: false,
            error: 'Failed to fetch sub-category from the database',
        };
    }
};

module.exports.update_subCategory = async (req) => {
    const { id, name } = req.body;

    if (!id || !name) {
        return {
            success: false,
            error: "Section ID and name are required",
        };
    }

    try {
        // Update the section by ID
        const [{ affectedRows }] = await pool.query(
            `UPDATE subcategory_table SET _name = ? WHERE id = ?`,
            [name, id]
        );

        if (affectedRows > 0) {
            return {
                success: true,
                data: "sub-category updated successfully",
            };
        } else {
            return {
                success: false,
                error: "No sub-category found with the given ID",
            };
        }
    } catch (error) {
        console.error("Error updating sub-category:", error);
        return {
            success: false,
            error: "Failed to update sub-category",
        };
    }
};

module.exports.add_product = async (req) => {

    const { sId, sCharge, sStatus } = req.body

    if (!sId) {

        return {
            success: false,
            error: "Parameters are not complete"
        }
    }

    let connection;

    try {
        // Get a connection from the pool
        connection = await pool.getConnection();

        // Begin a transaction
        await connection.beginTransaction();

        try {

            const encS_Id = encryptStaticFunction(sId.trim().toLowerCase(), retrievedKeyBuffer)

            const mergedData = {
                _serviceId: encS_Id,
                _charge: JSON.stringify(encryptData(sCharge, secretKey)),
                _status: JSON.stringify(encryptData(sStatus, secretKey))
            };

            const columns = Object.keys(mergedData).join(', ');
            const placeholders = Array(Object.keys(mergedData).length).fill('?').join(', ');
            const values = Object.values(mergedData);

            const [{ affectedRows }] = await connection.query(`
                INSERT INTO products_table (${columns}, _date)
                VALUES (${placeholders}, NOW())
            `, [...values]);

            if (affectedRows > 0) {
                await connection.commit();
                return {
                    success: true
                }

            } else {
                await connection.rollback();
                return {
                    success: false,
                    message: 'Failed to insert data into the database',
                };
            }

        } catch (error) {
            // Rollback the transaction if an error occurs during the transaction
            await connection.rollback();
            console.error('Error adding service user:', error);
            // Return a falsy value to indicate an error occurred
            return null;
        }
    } catch (error) {
        // Handle error
        console.error('Error getting connection from the pool:', error);
        throw new Error('Error getting connection from the pool');
    } finally {
        // Release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};