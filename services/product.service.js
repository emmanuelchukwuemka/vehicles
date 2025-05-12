const { pool } = require("../connection/db");
require('dotenv').config();
const { v4: uuid } = require("uuid")
const axios = require('axios');
const FormData = require('form-data');
const { getStoreReviews, getStoreCreatedAt, fetchProductSample } = require("../helpers/executors");



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

// ////////////////////////////////////////////////////////////////////////////////////
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
        
        // Fetch sample
        const sample = await fetchProductSample(product.id);

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
                sample,
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

module.exports.image_search = async (req) => {
    let connection;

    try {
        if (!req.file) {
            return {
                success: false,
                error: 'No image file provided'
            };
        }

        const form = new FormData();
        form.append('file', req.file.buffer, {
            filename: req.file.originalname || 'image.jpg',
            contentType: req.file.mimetype || 'image/jpeg'
        });

        const response = await axios.post(
            'http://13.60.157.229:5000/image_match/',
            form,
            {
                headers: {
                    ...form.getHeaders()
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            }
        );

        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        console.error('Error forwarding image to Flask server:', error.message);
        return {
            success: false,
            error: error.response?.data || error.message
        };
    }
};

module.exports.voice_search = async (req) => {
    try {
        if (!req.file) {
            return {
                success: false,
                error: 'No voice file provided'
            };
        }

        const form = new FormData();

        form.append('file', req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
            knownLength: req.file.size
        });

        const response = await axios.post(
            'http://18.232.170.225:5000/api/transcribe',
            form,
            {
                headers: {
                    ...form.getHeaders()
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            }
        );

        return {
            success: true,
            data: response.data.data
        };
    } catch (error) {
        console.error('Error forwarding voice to Flask server:', error);
        return {
            success: false,
            error: error.response?.data
        };
    }

}

module.exports.barcode_search = async (req) => {
    try {
        const { barcode } = req.body;

        if (!barcode) {
            return {
                success: false,
                error: 'No barcode provided'
            };
        }

        console.log("code:", barcode)

        const response = await axios.post(
            'http://18.232.170.225:5000/api/barcode-search', // Use the correct Flask route
            { barcode: barcode }, // Send as JSON 3830193093
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            }
        );

        return {
            success: true,
            data: response.data.data
        };
    } catch (error) {
        console.error('Error forwarding barcode to Flask server:', error.response?.data);
        return {
            success: false,
            error: error.response?.data
        };
    }
};

module.exports.fetch_multiple_products = async (req) => {
    const { IDs } = req.body;

    if (!Array.isArray(IDs) || IDs.length === 0) {
        return {
            success: false,
            error: "No product IDs provided"
        };
    }

    try {
        // Sanitize and format the IDs for the SQL query
        const idList = IDs.map(id => Number(id)).filter(Boolean).join(',');

        const payload = {
            sql: `SELECT * FROM products WHERE id IN (${IDs})`
        };

        const response = await axios.post('https://api-bloomzon-com.onrender.com/products', payload);

        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        console.error('Error fetching products:', error.response?.data || error.message);
        return {
            success: false,
            error: "Error fetching products"
        };
    }
};

module.exports.text_search_products = async (req) => {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
        return {
            success: false,
            error: "Search text is required"
        };
    }

    try {
        // Escape percent signs and sanitize the search string
        const searchTerm = text.replace(/[%_]/g, '\\$&');

        const payload = {
            sql: `
                SELECT * FROM products 
                WHERE (title LIKE '%${searchTerm}%' OR description LIKE '%${searchTerm}%')
                LIMIT 50
            `
        };

        const response = await axios.post('https://api-bloomzon-com.onrender.com/products', payload);

        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        console.error('Error searching products:', error.response?.data || error.message);
        return {
            success: false,
            error: error.response?.data
        };
    }
};

module.exports.fetch_live_products = async (req) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
          lt.product_id,
          lt.is_live,
          p.name,
          p.store_id,
          c.name AS collection_name,
          GROUP_CONCAT(m.url) AS images
      FROM live_table lt
      JOIN products_table p ON lt.product_id = p.id AND p.status = 1
      LEFT JOIN media_table m ON m.product_id = p.id
      LEFT JOIN stores_table s ON p.store_id = s.id
      LEFT JOIN collections_table c ON p.collection_id = c.id
      WHERE lt.product_id IS NOT NULL 
      GROUP BY lt.product_id, lt.is_live, p.name, p.store_id, s.created_at, c.name`
    );

    const data = await Promise.all(rows.map(async (row) => {
      const store_reviews = await getStoreReviews(row.store_id);
      const createdAt = await getStoreCreatedAt(row.store_id);

      return {
        productId: row.product_id,
        isLive: row.is_live,
        name: row.name,
        store_reviews,
        storeCreatedAt: createdAt,
        collectionName: row.collection_name,
        images: row.images ? row.images.split(',') : []
      };
    }));

    return {
      success: true,
      data
    };

  } catch (error) {
    console.error('Error fetching live products:', error);
    return {
      success: false,
      error: "Error fetching live products"
    };
  }
};


module.exports.fetch_single_live_products = async (req) => {
    const { product_id } = req.body;

    if (!product_id) {
        return {
            success: false,
            error: "Product id is required"
        };
    }

    try {
        const [rows] = await pool.query(
            `SELECT 
                lt.id AS video_id,
                lt.product_id,
                lt.is_live,
                lt.stream_url,
                lt.recorded_video_url,
                p.name AS product_name,
                p.sku AS product_sku,
                s.id AS store_id,
                s.name AS store_name,
                s.logo AS store_logo,
                GROUP_CONCAT(m.url) AS images
            FROM live_table lt
            JOIN products_table p ON lt.product_id = p.id AND p.status = 1
            JOIN stores_table s ON p.store_id = s.id AND s.status = 1
            LEFT JOIN media_table m ON m.product_id = p.id
            WHERE lt.product_id = ?
            GROUP BY lt.product_id, lt.is_live, p.name, s.name, s.logo LIMIT 1`,
            [product_id]
        );

        const row = rows[0];

        if (!row) {
            return {
                success: false,
                error: "Product not found"
            };
        }

        const data = {
            ...row,
            images: row.images ? row.images.split(',') : []
        };

        return {
            success: true,
            data
        };

    } catch (error) {
        console.error('Error fetching live product:', error);
        return {
            success: false,
            error: "Error fetching live product"
        };
    }
};

module.exports.like_product = async (req) => {
    const { user_id, product_id, action } = req.body;

    if (!user_id || !product_id || !["like", "follow"].includes(action)) {
        return { success: false, error: "Invalid input" };
    }

    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        // Check if the user exists and is active
        const [userRows] = await conn.query(
            "SELECT id FROM users_table WHERE id = ? AND status = 1",
            [user_id]
        );
        if (userRows.length === 0) {
            await conn.rollback();
            return { success: false, error: "User not found or inactive" };
        }

        // Check if the product exists and is active
        const [productRows] = await conn.query(
            "SELECT id FROM products_table WHERE id = ? AND status = 1",
            [product_id]
        );
        if (productRows.length === 0) {
            await conn.rollback();
            return { success: false, error: "Product not found or inactive" };
        }

        const target_type = 'product';

        // Check if interaction already exists
        const [existing] = await conn.query(
            "SELECT id FROM interactions WHERE user_id = ? AND target_type = ? AND target_id = ? AND action = ?",
            [user_id, target_type, product_id, action]
        );

        if (existing.length > 0) {
            // If exists, remove interaction (unlike/unfollow)
            await conn.query(
                "DELETE FROM interactions WHERE user_id = ? AND target_type = ? AND target_id = ? AND action = ?",
                [user_id, target_type, product_id, action]
            );
            await conn.commit();
            return { success: true, data: 0 }; // 0 means removed
        } else {
            // If not exists, add interaction (like/follow)
            await conn.query(
                "INSERT INTO interactions (user_id, target_type, target_id, action) VALUES (?, ?, ?, ?)",
                [user_id, target_type, product_id, action]
            );
            await conn.commit();
            return { success: true, data: 1 }; // 1 means added
        }
    } catch (error) {
        await conn.rollback();
        console.error("Error in product interaction:", error);
        return { success: false, error: "Internal server error" };
    } finally {
        conn.release();
    }
};

module.exports.fetch_store_products = async (req) => {
    const { store_id } = req.body;
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




module.exports.set_product_sample = async (req) => {
    const {store_id, product_id, ppu, min_qty } = req.body;

    if (!store_id || !product_id || typeof ppu !== 'number' || typeof min_qty !== 'number') {
        return {
            success: false,
            error: "Missing or invalid parameters"
        };
    }

    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Check if product exists and is active
        const [product] = await connection.query(
            `SELECT id FROM products_table WHERE id = ? AND status = 1`,
            [product_id]
        );

        if (product.length === 0) {
            await connection.rollback();
            return {
                success: false,
                error: "Product does not exist"
            };
        }

        // Insert or update the sample record
        await connection.query(
            `INSERT INTO product_sample (store_id, product_id, ppu, min_qty)
             VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE ppu = VALUES(ppu), min_qty = VALUES(min_qty)`,
            [store_id, product_id, ppu, min_qty]
        );

        await connection.commit();
        return {
            success: true,
            data: "Sample set successfully"
        };
    } catch (error) {
        await connection.rollback();
        console.error("Error setting product sample:", error);
        return {
            success: false,
            error: "Failed to set product sample"
        };
    } finally {
        connection.release();
    }
};

module.exports.get_all_product_samples = async () => {
    try {
        const [samples] = await pool.query(`
            SELECT ps.product_id, ps.ppu, ps.min_qty, p.store_id, p.name, s.is_verified, s.created_at
            FROM product_sample ps
            JOIN products_table p ON ps.product_id = p.id
            JOIN stores_table s ON p.store_id = s.id
        `);

        if (samples.length === 0) {
            return {
                success: false,
                error: "No product samples found"
            };
        }

        const enrichedSamples = await Promise.all(samples.map(async (sample) => {
            const [mediaRows] = await pool.query(
                `SELECT url FROM media_table WHERE product_id = ?`,
                [sample.product_id]
            );

            const images = mediaRows.map(row => row.url);
            const reviews = await getStoreReviews(sample.store_id);
            const createdAt = await getStoreCreatedAt(sample.store_id);

            return {
                product_id: sample.product_id,
                product_name: sample.name,
                ppu: sample.ppu,
                min_qty: sample.min_qty,
                images,
                store_id: sample.store_id,
                is_verified: sample.is_verified === 1,
                created_at: createdAt,
                reviews
            };
        }));

        return {
            success: true,
            data: enrichedSamples
        };

    } catch (error) {
        console.error("Error fetching all product samples:", error);
        return {
            success: false,
            error: "Failed to fetch product samples"
        };
    }
};

