const { pool } = require("../connection/db");
require('dotenv').config();
const { v4: uuid } = require("uuid")
const axios = require('axios');
const { staticEncrypt, dynamicEncrypt } = require("../helpers/hasher");
const { dynamicKey, staticKey } = require("../helpers/keyVolt")


module.exports.add_mainCategory = async (req) => {

    const { name, image } = req.body;

    if (!name || !image) {
        return {
            success: false,
            error: "One or more is required field(s) are missing",
        };
    }

    const enc_name = staticEncrypt(name.trim(), staticKey)
    const enc_image = JSON.stringify(dynamicEncrypt(image.trim(), dynamicKey))
    const enc_status = staticEncrypt('1', staticKey)


    try {
        // Check if the section already exists
        const [[sectionData]] = await pool.query(
            `SELECT * FROM maincategory WHERE _name = ?`,
            [enc_name]
        );

        if (sectionData && sectionData.id) {
            return {
                success: false,
                error: "This main-category already exists",
            };
        }

        // Insert the new section
        const [{ affectedRows }] = await pool.query(
            `INSERT INTO maincategory (_name, _image, _status, _date) VALUES (?, ?, ?, NOW())`,
            [enc_name, enc_image, enc_status]
        );

        if (affectedRows > 0) {
            return {
                success: true,
                data: "main-category added successfully",
            };
        } else {
            return {
                success: false,
                error: "Failed to add the main-category",
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
module.exports.fetch_mainCategory = async (req) => {

    try {
        // Fetch all records from the section_table
        const [rows] = await pool.query(`
            SELECT * FROM maincategory WHERE _status = ?
        `, [1]);

        if (rows.length > 0) {
            return {
                success: true,
                data: rows, // Returning all fetched records
            };
        } else {
            return {
                success: false,
                error: 'No record found',
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
module.exports.update_mainCategory = async (req) => {
    const { id, name, image, status } = req.body;

    if (!id) {
        return {
            success: false,
            error: "Main category ID is required to perform this operation",
        };
    }

    // Create an array for fields to update and values to bind
    let updates = [];
    let values = [];

    if (name) {
        updates.push("_name = ?");
        values.push(staticEncrypt(name.trim(), staticKey));
    }

    if (image) {
        updates.push("_image = ?");
        values.push(JSON.stringify(dynamicEncrypt(image.trim(), dynamicKey)));
    }

    if (status) {
        updates.push("_status = ?");
        values.push(staticEncrypt(status.toString(), staticKey));
    }

    // If no valid fields were provided
    if (updates.length === 0) {
        return {
            success: false,
            error: "No fields provided for update",
        };
    }

    // Add ID to values array
    values.push(id);

    try {
        // Construct the SQL query dynamically
        const query = `UPDATE maincategory SET ${updates.join(", ")} WHERE id = ?`;
        const [{ affectedRows }] = await pool.query(query, values);

        if (affectedRows > 0) {
            return {
                success: true,
                data: "Record updated successfully",
            };
        } else {
            return {
                success: false,
                error: "No record found with the given ID",
            };
        }
    } catch (error) {
        console.error("Error updating record:", error);
        return {
            success: false,
            error: "Failed to update record",
        };
    }
};


module.exports.add_category = async (req) => {

    const { name, main_id } = req.body;

    if (!name || !main_id) {
        return {
            success: false,
            error: "Parameters are not complete",
        };
    }

    const enc_name = staticEncrypt(name.trim(), staticKey)
    const enc_status = staticEncrypt('1', staticKey)

    try {
        // Check if the section exists
        const [section] = await pool.query(
            `SELECT id FROM maincategory WHERE id = ?`,
            [main_id]
        );

        if (section.length === 0) {
            return {
                success: false,
                error: "The main-category you provided could not be found",
            };
        }

        // Check if the category already exists in the section
        const [existingCategory] = await pool.query(
            `SELECT id FROM category WHERE _name = ? AND _maincategory = ?`,
            [enc_name, main_id]
        );

        if (existingCategory.length > 0) {
            return {
                success: false,
                error: "This category already exists under the specified section",
            };
        }

        // Insert the new category
        const [{ affectedRows }] = await pool.query(
            `INSERT INTO category (_name, _maincategory, _status, _date) VALUES (?, ?, ?, NOW())`,
            [enc_name, main_id, enc_status]
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
    const { main_id } = req.query;

    if (!main_id) {
        return {
            success: false,
            error: "Your request is missing a required parameter"
        }
    }

    try {
        // Fetch all records from the section_table
        const [rows] = await pool.query(`
            SELECT * FROM category WHERE _maincategory = ? AND _status = 1
        `, [main_id]);

        if (rows.length > 0) {
            return {
                success: true,
                data: rows, // Returning all fetched records
            };
        } else {
            return {
                success: false,
                error: 'No record found',
            };
        }
    } catch (error) {
        console.error('Error fetching category:', error);
        return {
            success: false,
            error: 'Failed to fetch category from the database',
        };
    }
};
module.exports.update_category = async (req) => {
    const { id, main_id, name, image, status } = req.body;

    if (!id) {
        return {
            success: false,
            error: "Main category ID is required to perform this operation",
        };
    }

    // Create an array for fields to update and values to bind
    let updates = [];
    let values = [];

    if (name) {
        updates.push("_name = ?");
        values.push(staticEncrypt(name.trim(), staticKey));
    }

    if (main_id) {
        updates.push("_maincategory = ?");
        values.push(main_id);
    }

    if (image) {
        updates.push("_image = ?");
        values.push(JSON.stringify(dynamicEncrypt(image.trim(), dynamicKey)));
    }

    if (status) {
        updates.push("_status = ?");
        values.push(staticEncrypt(status.toString(), staticKey));
    }

    // If no valid fields were provided
    if (updates.length === 0) {
        return {
            success: false,
            error: "No fields provided for update",
        };
    }

    // Add ID to values array
    values.push(id);

    try {
        // Construct the SQL query dynamically
        const query = `UPDATE category SET ${updates.join(", ")} WHERE id = ?`;
        const [{ affectedRows }] = await pool.query(query, values);

        if (affectedRows > 0) {
            return {
                success: true,
                data: "Record updated successfully",
            };
        } else {
            return {
                success: false,
                error: "No record found with the given ID",
            };
        }
    } catch (error) {
        console.error("Error updating record:", error);
        return {
            success: false,
            error: "Failed to update record",
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

    const enc_name = staticEncrypt(name.trim(), staticKey)
    const enc_status = staticEncrypt('1', staticKey)
    const enc_image = JSON.stringify(dynamicEncrypt(image, dynamicKey))

    try {
        // Check if the category exists
        const [categoryRows] = await pool.query(
            `SELECT id FROM category WHERE id = ?`,
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
            `SELECT id FROM subcategory WHERE _name = ? AND _category = ?`,
            [enc_name, categoryId]
        );

        if (existingSubCategory.length > 0) {
            return {
                success: false,
                error: "Sub-category already exists under the specified category",
            };
        }

        // Insert the new sub-category
        const [{ affectedRows }] = await pool.query(
            `INSERT INTO subcategory (_name, _category, _image, _status, _date) VALUES (?, ?, ?, ?, NOW())`,
            [enc_name, categoryId, enc_image, enc_status]
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

    if (!categoryId) {
        return {
            success: false,
            error: "CategoryId is required to perform this operation"
        }
    }

    try {
        // Fetch all records from the section_table
        const [rows] = await pool.query(`
            SELECT * FROM subcategory WHERE _category = ?
        `, [categoryId]);

        if (rows.length > 0) {
            return {
                success: true,
                data: rows, // Returning all fetched records
            };
        } else {
            return {
                success: false,
                error: 'No record found',
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
    const { id, categoryId, name, image, status } = req.body;

    if (!id) {
        return {
            success: false,
            error: "Main category ID is required to perform this operation",
        };
    }

    // Create an array for fields to update and values to bind
    let updates = [];
    let values = [];

    if (categoryId) {
        updates.push("_category = ?");
        values.push(categoryId);
    }

    if (name) {
        updates.push("_name = ?");
        values.push(staticEncrypt(name.trim(), staticKey));
    }

    if (image) {
        updates.push("_image = ?");
        values.push(JSON.stringify(dynamicEncrypt(image.trim(), dynamicKey)));
    }

    if (status) {
        updates.push("_status = ?");
        values.push(staticEncrypt(status.toString(), staticKey));
    }

    // If no valid fields were provided
    if (updates.length === 0) {
        return {
            success: false,
            error: "No fields provided for update",
        };
    }

    // Add ID to values array
    values.push(id);

    try {
        // Construct the SQL query dynamically
        const query = `UPDATE subcategory SET ${updates.join(", ")} WHERE id = ?`;
        const [{ affectedRows }] = await pool.query(query, values);

        if (affectedRows > 0) {
            return {
                success: true,
                data: "sub-category updated successfully",
            };
        } else {
            return {
                success: false,
                error: "No record found with the given ID",
            };
        }
    } catch (error) {
        console.error("Error updating record:", error);
        return {
            success: false,
            error: "Failed to update record",
        };
    }
};


module.exports.sub_extractor = async (req) => {
    const { id } = req.query;

    if (!id) {
        return {
            success: false,
            error: "Section ID is required",
        };
    }

    const url = `https://api-bloomzon-com.onrender.com/subcategories`;

    try {
        // Make the POST request
        const { data } = await axios.post(url);

        // Filter response to match `parent_id` with `id`
        const filteredSubcategories = data.filter(subcategory => String(subcategory.parent_id) === String(id));

        return {
            success: true,
            data: filteredSubcategories,
        };

    } catch (error) {
        console.log("Error fetching sub-categories:", error.response ? error.response.data : error.message);
        return {
            success: false,
            error: "Failed to fetch sub-categories",
        };
    }
};

module.exports.multi_insertion = async (req) => {
    const { id, data } = req.body;

    // Validate input
    if (!id || !Array.isArray(data) || data.length === 0) {
        return {
            success: false,
            error: "Invalid request: Category ID and a non-empty data array are required",
        };
    }

    try {
        // Check if category exists
        const [categoryRows] = await pool.query(
            `SELECT id FROM category WHERE id = ?`,
            [id]
        );

        if (categoryRows.length === 0) {
            return {
                success: false,
                error: "Category with the provided ID does not exist",
            };
        }

        let insertedCount = 0;
        let skippedCount = 0;
        let errorCount = 0;

        for (const item of data) {
            const { name, image } = item;

            if (!name || !image) {
                skippedCount++;
                continue; // Skip if required fields are missing
            }

            const enc_name = staticEncrypt(name.trim(), staticKey);
            const enc_status = staticEncrypt("1", staticKey);
            const enc_image = JSON.stringify(dynamicEncrypt(image, dynamicKey));

            // Check if sub-category already exists
            const [existingSubCategory] = await pool.query(
                `SELECT id FROM subcategory WHERE _name = ? AND _category = ?`,
                [enc_name, id]
            );

            if (existingSubCategory.length > 0) {
                skippedCount++;
                continue; // Skip if sub-category already exists
            }

            // Insert new sub-category
            const [{ affectedRows }] = await pool.query(
                `INSERT INTO subcategory (_name, _category, _image, _status, _date) VALUES (?, ?, ?, ?, NOW())`,
                [enc_name, id, enc_image, enc_status]
            );

            if (affectedRows > 0) {
                insertedCount++;
            } else {
                errorCount++;
            }
        }

        return {
            success: true,
            data: `${insertedCount} subcategories added, ${skippedCount} skipped, ${errorCount} failed.`,
        };
    } catch (error) {
        console.error("Error processing subcategories:", error);
        return {
            success: false,
            error: "Database operation failed",
        };
    }
};

