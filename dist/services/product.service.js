"use strict";
const { pool } = require("../connection/db");
require("dotenv").config();
const { v4: uuid } = require("uuid");
const axios = require("axios");
const FormData = require("form-data");
const { getBestSellingProductIds } = require("../utility/productRanking");
const { getRankedProductsByStore, } = require("../utility/getRankedProductsByStore");
const { fetchStoreGallery } = require("../utility/getStoreGallery");
const { getStoreReviews } = require("../utility/getStoreReviews");
const { getVariationAttributes, } = require("../utility/product/getProductAttributes");
const { getProductTotalOrder, } = require("../utility/product/getProductTotalOrder");
const { getStoreCreatedAt } = require("../utility/store/getStoreCreatedAt");
const { getProductSample } = require("../utility/product/getProductSample");
const { productsSearch, product_search_by_collections, } = require("../utility/product/productSearch");
const { getCategoryData } = require("../utility/category/getCategoryData");
const { getProductMOQ } = require("../utility/product/getProductMOQ");
const { getStoresByIds } = require("../utility/product/getProductStoresByIds");
const { getProductMedia } = require("../utility/product/getProductMedia");
const { searchStore } = require("../utility/store/searchStore");
const { getSimilarProducts } = require("../utility/store/getSimilarProducts");
const { getBestSellingProducts, } = require("../utility/store/getBestSellingProducts");
const getRecommendedProducts = require("../utility/store/getRecommendedProducts");
const { getProductVariations, } = require("../utility/product/getProductVariations");
const { fetchEnrichedStoreProducts, } = require("../utility/store/fetchEnrichedStoreProducts");
module.exports.fetch_single_product = async (req) => {
    const { product_id } = req.params;
    if (isNaN(product_id)) {
        return { success: false, error: "Invalid Product ID" };
    }
    try {
        // Fetch product details
        const [productRows] = await pool.query(`
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
        const sample = await getProductSample(product.id);
        const { data: total_order } = await getProductTotalOrder(pool, product_id);
        // Fetch product media
        const [media] = await pool.query(`
            SELECT url, type FROM media_table WHERE product_id = ? AND variation_id IS NULL
        `, [product_id]);
        // Fetch MOQ (Minimum Order Quantity)
        const [moq] = await pool.query(`
            SELECT min_qty, ppu FROM product_moq WHERE product_id = ?
        `, [product_id]);
        // Fetch product specifications
        const [specifications] = await pool.query(`
            SELECT name, value FROM product_specifications WHERE product_id = ?
        `, [product_id]);
        // Fetch product reviews (average rating & total count)
        const [productReviews] = await pool.query(`
            SELECT COUNT(*) AS total_reviews, AVG(rating) AS avg_rating 
            FROM product_reviews 
            WHERE product_id = ? AND status = 1
        `, [product_id]);
        // Fetch store reviews (average rating & total count)
        const [storeReviews] = await pool.query(`
            SELECT COUNT(*) AS total_reviews, AVG(rating) AS avg_rating 
            FROM store_reviews 
            WHERE store_id = ? AND status = 1
        `, [product.store_id]);
        // Fetch product variations
        const [variations] = await pool.query(`
            SELECT * FROM variations_table 
            WHERE product_id = ? AND status = 1
        `, [product_id]);
        // Attach attributes & media to each variation
        for (const variation of variations) {
            const v_attributes = await getVariationAttributes(pool, variation.id);
            const [variationMedia] = await pool.query(`
                SELECT url, type FROM media_table WHERE variation_id = ?
            `, [variation.id]);
            variation.store_id = product.store_id;
            variation.attributes = v_attributes;
            variation.media = variationMedia;
        }
        return {
            success: true,
            data: {
                store_id: product.store_id,
                ...product,
                sample,
                total_order,
                media,
                moq,
                specifications,
                product_reviews: {
                    total_reviews: productReviews[0].total_reviews || 0,
                    avg_rating: parseFloat(productReviews[0].avg_rating) || 0,
                },
                store_reviews: {
                    total_reviews: storeReviews[0].total_reviews || 0,
                    avg_rating: parseFloat(storeReviews[0].avg_rating) || 0,
                },
                variations,
            },
        };
    }
    catch (error) {
        console.error("Error fetching product:", error);
        return {
            success: false,
            error: "An error occurred while fetching product",
        };
    }
};
module.exports.productInquiry = async (req) => {
    const { product_id, store_id, user_id, payload } = req.body;
    if (!store_id || !user_id || !payload) {
        return {
            success: false,
            error: "One or more required fields are empty, please check your inputs",
        };
    }
    const { msg, images = [] } = payload;
    if (!msg || msg.trim() === "") {
        return { success: false, error: "Inquiry message cannot be empty" };
    }
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        // Validate product
        // const [productRows] = await connection.query(
        //     "SELECT id, store_id FROM products_table WHERE id = ? AND status = 1",
        //     [product_id]
        // );
        // if (productRows.length === 0) {
        //     return { success: false, error: "Product not found or inactive" };
        // }
        // Confirm the product belongs to the store
        // if (productRows[0].store_id !== store_id) {
        //     return { success: false, error: "Product does not belong to the specified store" };
        // }
        // Validate store
        const [storeRows] = await connection.query("SELECT id FROM stores_table WHERE id = ? AND status = 1", [store_id]);
        if (storeRows.length === 0) {
            return { success: false, error: "Store not found or inactive" };
        }
        // Validate user
        const [userRows] = await connection.query("SELECT id FROM users_table WHERE id = ? AND status = 1", [user_id]);
        if (userRows.length === 0) {
            return { success: false, error: "User not found or inactive" };
        }
        // Insert attachments and collect their IDs
        const attachmentIds = [];
        for (const img of images) {
            const [result] = await connection.query("INSERT INTO attachment_table (attachment) VALUES (?)", [img]);
            attachmentIds.push(result.insertId);
        }
        // If there are no attachments, insert a dummy row (optional)
        const attachmentId = attachmentIds.length > 0 ? attachmentIds[0] : null;
        if (!attachmentId) {
            const [result] = await connection.query("INSERT INTO attachment_table (attachment) VALUES ('')");
            attachmentIds.push(result.insertId);
        }
        // Save the inquiry
        await connection.query(`INSERT INTO inquiry_table (user_id, store_id, attachment_id, message)
             VALUES (?, ?, ?, ?)`, [user_id, store_id, attachmentIds[0], msg]);
        await connection.commit();
        return {
            success: true,
            data: "Inquiry submitted successfully",
        };
    }
    catch (error) {
        await connection.rollback();
        console.error("Inquiry Error =>", error);
        return { success: false, error: "Unable to send your inquiry" };
    }
    finally {
        if (connection)
            connection.release();
    }
};
module.exports.image_search = async (req) => {
    let connection;
    try {
        if (!req.file) {
            return {
                success: false,
                error: "No image file provided",
            };
        }
        const form = new FormData();
        form.append("file", req.file.buffer, {
            filename: req.file.originalname || "image.jpg",
            contentType: req.file.mimetype || "image/jpeg",
        });
        const response = await axios.post("http://13.60.157.229:5000/image_match/", form, {
            headers: {
                ...form.getHeaders(),
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        });
        return {
            success: true,
            data: response.data,
        };
    }
    catch (error) {
        console.error("Error forwarding image to Flask server:", error.message);
        return {
            success: false,
            error: error.response?.data || error.message,
        };
    }
};
// TODO: Review and check if this is still in use
module.exports.voice_search = async (req) => {
    try {
        if (!req.file) {
            return {
                success: false,
                error: "No voice file provided",
            };
        }
        const form = new FormData();
        form.append("file", req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype,
            knownLength: req.file.size,
        });
        const response = await axios.post("http://18.232.170.225:5000/api/transcribe", form, {
            headers: {
                ...form.getHeaders(),
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        });
        return {
            success: true,
            data: response.data.data,
        };
    }
    catch (error) {
        console.error("Error forwarding voice to Flask server:", error);
        return {
            success: false,
            error: error.response?.data,
        };
    }
};
// TODO: Review and check if this is still in use
module.exports.barcode_search = async (req) => {
    try {
        const { barcode } = req.body;
        if (!barcode) {
            return {
                success: false,
                error: "No barcode provided",
            };
        }
        console.log("code:", barcode);
        const response = await axios.post("http://18.232.170.225:5000/api/barcode-search", // Use the correct Flask route
        { barcode: barcode }, // Send as JSON 3830193093
        {
            headers: {
                "Content-Type": "application/json",
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        });
        return {
            success: true,
            data: response.data.data,
        };
    }
    catch (error) {
        console.error("Error forwarding barcode to Flask server:", error.response?.data);
        return {
            success: false,
            error: error.response?.data,
        };
    }
};
module.exports.fetch_multiple_products = async (req) => {
    const { IDs } = req.body;
    if (!Array.isArray(IDs) || IDs.length === 0) {
        return {
            success: false,
            error: "No product IDs provided",
        };
    }
    try {
        // Sanitize and format the IDs for the SQL query
        const idList = IDs.map((id) => Number(id))
            .filter(Boolean)
            .join(",");
        const payload = {
            sql: `SELECT * FROM products WHERE id IN (${IDs})`,
        };
        const response = await axios.post("https://api-bloomzon-com.onrender.com/products", payload);
        return {
            success: true,
            data: response.data,
        };
    }
    catch (error) {
        console.error("Error fetching products:", error.response?.data || error.message);
        return {
            success: false,
            error: "Error fetching products",
        };
    }
};
// From Bloomzon database
module.exports.text_search_products = async (req) => {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
        return {
            success: false,
            error: "Search text is required",
        };
    }
    try {
        // Escape percent signs and sanitize the search string
        const searchTerm = text.replace(/[%_]/g, "\\$&");
        const payload = {
            sql: `
                SELECT * FROM products 
                WHERE (title LIKE '%${searchTerm}%' OR description LIKE '%${searchTerm}%')
                LIMIT 50
            `,
        };
        const response = await axios.post("https://api-bloomzon-com.onrender.com/products", payload);
        return {
            success: true,
            data: response.data,
        };
    }
    catch (error) {
        console.error("Error searching products:", error.response?.data || error.message);
        return {
            success: false,
            error: error.response?.data,
        };
    }
};
module.exports.search = async (req) => {
    const { keyword } = req.body;
    if (!keyword || typeof keyword !== "string") {
        return {
            success: false,
            error: "Search keyword is required",
        };
    }
    const productFields = ["name", "store_id"];
    const storeFields = [
        "name",
        "floor_space",
        "country",
        "logo",
        "net_worth",
        "staff_count",
        "is_verified",
        "verified_date",
        "created_at",
    ];
    const mediaFields = ["url"];
    try {
        const products = await productsSearch(keyword, pool, productFields);
        if (!products.data.length) {
            return {
                success: false,
                error: "No product found",
            };
        }
        const productIds = products.data.map((p) => p.id);
        const storeIds = products.data.map((p) => p.store_id);
        const [moqList, storeMap, medias] = await Promise.all([
            getProductMOQ(pool, productIds),
            getStoresByIds(storeIds, pool, storeFields),
            //getProductTotalOrder(productIds),
            getProductMedia(productIds, pool, mediaFields),
        ]);
        //Convert MOQ list to map
        const moqMap = {};
        for (const moq of moqList) {
            if (!moqMap[moq.product_id])
                moqMap[moq.product_id] = [];
            moqMap[moq.product_id].push({
                min_qty: moq.min_qty,
                ppu: moq.ppu,
            });
        }
        const enrichedProducts = products.data.map((product) => ({
            ...product,
            moq: moqMap[product.id] || [],
            medias: medias[product.id] || [],
            store: storeMap[product.store_id] || null,
        }));
        return {
            success: true,
            data: enrichedProducts,
        };
    }
    catch (error) {
        console.log("Error in search:", error);
        return {
            success: false,
            error: "Failed to perform search",
        };
    }
};
module.exports.search_products_in_stores = async (req) => {
    const { keyword } = req.body;
    if (!keyword || typeof keyword !== "string") {
        return {
            success: false,
            error: "Search keyword is required",
        };
    }
    const productFields = ["id", "name", "store_id"];
    const storeFields = [
        "id",
        "name",
        "floor_space",
        "country",
        "logo",
        "net_worth",
        "staff_count",
        "is_verified",
        "verified_date",
        "created_at",
    ];
    const mediaFields = ["url"];
    try {
        const productsResult = await productsSearch(keyword, pool, productFields);
        if (!productsResult.success || !productsResult.data.length) {
            return {
                success: false,
                error: "No product found",
            };
        }
        const products = productsResult.data;
        const productIds = products.map((p) => p.id);
        const storeIds = [...new Set(products.map((p) => p.store_id))];
        const [moqList, storeMap, mediaMap] = await Promise.all([
            getProductMOQ(pool, productIds),
            getStoresByIds(storeIds, pool, storeFields),
            getProductMedia(productIds, pool, mediaFields),
        ]);
        // Convert MOQ list to map
        const moqMap = {};
        for (const moq of moqList) {
            if (!moqMap[moq.product_id])
                moqMap[moq.product_id] = [];
            moqMap[moq.product_id].push({
                min_qty: moq.min_qty,
                ppu: moq.ppu,
            });
        }
        // Group products under their store
        const storeGrouped = {};
        for (const product of products) {
            const storeId = product.store_id;
            if (!storeGrouped[storeId]) {
                storeGrouped[storeId] = {
                    store: storeMap[storeId] || null,
                    products: [],
                };
            }
            storeGrouped[storeId].products.push({
                ...product,
                moq: moqMap[product.id] || [],
                medias: mediaMap[product.id] || [],
            });
        }
        const storeResults = Object.values(storeGrouped);
        return {
            success: true,
            data: storeResults,
        };
    }
    catch (error) {
        console.error("Error in search_for_store:", error);
        return {
            success: false,
            error: "Failed to perform search",
        };
    }
};
module.exports.search_store_products = async (req) => {
    const { store_id, level, level_id, search, sort_by_moq } = req.body;
    // Validate store_id
    if (!store_id || typeof store_id !== "number") {
        return {
            success: false,
            error: "store_id is required and must be a number",
        };
    }
    try {
        // Search for products using helper
        const { products, level_name } = await searchStore({ store_id, level, level_id, search }, pool, ["name"]);
        if (!products.length) {
            return {
                success: false,
                error: "No products found",
            };
        }
        const productIds = products.map((p) => p.id);
        // Fetch MOQ and media in parallel
        const [moqList, mediaMap] = await Promise.all([
            getProductMOQ(pool, productIds),
            getProductMedia(productIds, pool, ["url"]),
        ]);
        // Create map for MOQ
        const moqMap = {};
        for (const moq of moqList) {
            if (!moqMap[moq.product_id])
                moqMap[moq.product_id] = [];
            moqMap[moq.product_id].push({
                min_qty: moq.min_qty,
                ppu: moq.ppu,
            });
        }
        // Construct final products array
        let finalProducts = products.map((product) => ({
            ...product,
            moq: moqMap[product.id] || [],
            media: mediaMap[product.id] || [],
        }));
        // Optional sorting by MOQ
        if (sort_by_moq === "ppu") {
            finalProducts.sort((a, b) => {
                const aPpu = a.moq[0]?.ppu ?? Infinity;
                const bPpu = b.moq[0]?.ppu ?? Infinity;
                return aPpu - bPpu;
            });
        }
        else if (sort_by_moq === "min_qty") {
            finalProducts.sort((a, b) => {
                const aQty = a.moq[0]?.min_qty ?? Infinity;
                const bQty = b.moq[0]?.min_qty ?? Infinity;
                return aQty - bQty;
            });
        }
        return {
            success: true,
            data: {
                level_name,
                products: finalProducts,
            },
        };
    }
    catch (err) {
        console.error("search_store_products error:", err);
        return {
            success: false,
            error: "Failed to fetch products for store",
        };
    }
};
module.exports.fetch_live_products = async (req) => {
    try {
        const [rows] = await pool.query(`SELECT 
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
      GROUP BY lt.product_id, lt.is_live, p.name, p.store_id, s.created_at, c.name`);
        const data = await Promise.all(rows.map(async (row) => {
            const store_reviews = await getStoreReviews(pool, row.store_id);
            const createdAt = await getStoreCreatedAt(pool, row.store_id);
            return {
                productId: row.product_id,
                isLive: row.is_live,
                name: row.name,
                store_reviews,
                storeCreatedAt: createdAt,
                collectionName: row.collection_name,
                images: row.images ? row.images.split(",") : [],
            };
        }));
        return {
            success: true,
            data,
        };
    }
    catch (error) {
        console.error("Error fetching live products:", error);
        return {
            success: false,
            error: "Error fetching live products",
        };
    }
};
module.exports.fetch_single_live_products = async (req) => {
    const { product_id } = req.body;
    if (!product_id) {
        return {
            success: false,
            error: "Product id is required",
        };
    }
    try {
        const [rows] = await pool.query(`SELECT 
                lt.id AS video_id,
                lt.product_id,
                lt.is_live,
                lt.stream_url,
                lt.recorded_video_url,
                p.name AS product_name,
                s.id AS store_id,
                s.name AS store_name,
                s.logo AS store_logo,
                GROUP_CONCAT(m.url) AS images
            FROM live_table lt
            JOIN products_table p ON lt.product_id = p.id AND p.status = 1
            JOIN stores_table s ON p.store_id = s.id AND s.status = 1
            LEFT JOIN media_table m ON m.product_id = p.id
            WHERE lt.product_id = ?
            GROUP BY lt.product_id, lt.is_live, p.name, s.name, s.logo LIMIT 1`, [product_id]);
        const row = rows[0];
        if (!row) {
            return {
                success: false,
                error: "Product not found",
            };
        }
        const data = {
            ...row,
            images: row.images ? row.images.split(",") : [],
        };
        return {
            success: true,
            data,
        };
    }
    catch (error) {
        console.error("Error fetching live product:", error);
        return {
            success: false,
            error: "Error fetching live product",
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
        const [userRows] = await conn.query("SELECT id FROM users_table WHERE id = ? AND status = 1", [user_id]);
        if (userRows.length === 0) {
            await conn.rollback();
            return { success: false, error: "User not found or inactive" };
        }
        // Check if the product exists and is active
        const [productRows] = await conn.query("SELECT id FROM products_table WHERE id = ? AND status = 1", [product_id]);
        if (productRows.length === 0) {
            await conn.rollback();
            return { success: false, error: "Product not found or inactive" };
        }
        const target_type = "product";
        // Check if interaction already exists
        const [existing] = await conn.query("SELECT id FROM interactions WHERE user_id = ? AND target_type = ? AND target_id = ? AND action = ?", [user_id, target_type, product_id, action]);
        if (existing.length > 0) {
            // If exists, remove interaction (unlike/unfollow)
            await conn.query("DELETE FROM interactions WHERE user_id = ? AND target_type = ? AND target_id = ? AND action = ?", [user_id, target_type, product_id, action]);
            await conn.commit();
            return { success: true, data: 0 }; // 0 means removed
        }
        else {
            // If not exists, add interaction (like/follow)
            await conn.query("INSERT INTO interactions (user_id, target_type, target_id, action) VALUES (?, ?, ?, ?)", [user_id, target_type, product_id, action]);
            await conn.commit();
            return { success: true, data: 1 }; // 1 means added
        }
    }
    catch (error) {
        await conn.rollback();
        console.error("Error in product interaction:", error);
        return { success: false, error: "Internal server error" };
    }
    finally {
        conn.release();
    }
};
module.exports.fetch_store_products = async (req) => {
    const { store_id } = req.body;
    const { isCustomizable, activeCollection, selectedFilter, grouped = false, } = req.query;
    try {
        const allProducts = await fetchEnrichedStoreProducts(pool, store_id);
        // Apply filters if necessary
        let filtered = [...allProducts];
        if (isCustomizable === "true") {
            filtered = filtered.filter((p) => p.customizable === 1);
        }
        if (activeCollection) {
            filtered = filtered.filter((p) => p.collection.id === parseInt(activeCollection));
        }
        if (selectedFilter) {
            const filterId = parseInt(selectedFilter);
            if (filterId === 5) {
                // Best Price: Ignore p.filters, just apply price logic
                filtered = filtered
                    .filter((p) => p.moq.length && p.moq[0].ppu <= 50)
                    .sort((a, b) => (a.moq[0]?.ppu || 0) - (b.moq[0]?.ppu || 0));
            }
            else {
                // For other filters, match by filter ID
                filtered = filtered.filter((p) => p.filters.includes(filterId));
            }
        }
        if (grouped === "true") {
            const groupedProducts = {
                new_arrivals: [],
                best_selling: [],
                recommended: [],
                customizable: [],
                by_collection: {},
                by_subcategory: {},
                mainCategory: [],
                ranked: [],
                gallery: [],
                reviews: [],
            };
            const bestSellingIds = await getBestSellingProductIds(store_id);
            const rankedIds = await getRankedProductsByStore(store_id);
            groupedProducts.ranked = allProducts
                .filter((p) => rankedIds.includes(p.id))
                .sort((a, b) => rankedIds.indexOf(a.id) - rankedIds.indexOf(b.id));
            const galleryRes = await fetchStoreGallery(store_id);
            if (galleryRes.success) {
                groupedProducts.gallery = galleryRes.data;
            }
            const storeReviews = await getStoreReviews(pool, store_id);
            if (storeReviews.success) {
                groupedProducts.reviews = storeReviews.data;
            }
            const collectionMapBySub = {};
            allProducts.forEach((p) => {
                if (p.filters.includes(1))
                    groupedProducts.new_arrivals.push(p);
                if (bestSellingIds.includes(p.id))
                    groupedProducts.best_selling.push(p);
                if (p.filters.includes(3))
                    groupedProducts.recommended.push(p);
                if (p.customizable === 1)
                    groupedProducts.customizable.push(p);
                const colName = p.collection?.name || "Uncategorized";
                if (!groupedProducts.by_collection[colName])
                    groupedProducts.by_collection[colName] = [];
                groupedProducts.by_collection[colName].push(p);
                const subId = p.subcategory?.id || 0;
                const subName = p.subcategory?.name || "Others";
                if (!groupedProducts.by_subcategory[subName]) {
                    groupedProducts.by_subcategory[subName] = {
                        id: subId,
                        products: [],
                        collection: [],
                    };
                }
                groupedProducts.by_subcategory[subName].products.push(p);
                // Track collection counts by subcategory
                const collection = p.collection;
                if (collection && collection.id) {
                    console.log("collection=>", collection);
                    if (!collectionMapBySub[subName])
                        collectionMapBySub[subName] = {};
                    if (!collectionMapBySub[subName][collection.id]) {
                        collectionMapBySub[subName][collection.id] = {
                            id: collection.id,
                            name: collection.name,
                            total: 0,
                        };
                    }
                    collectionMapBySub[subName][collection.id].total += 1;
                }
            });
            // Attach collection counts to each subcategory
            Object.keys(collectionMapBySub).forEach((subName) => {
                const collectionList = Object.values(collectionMapBySub[subName]);
                if (groupedProducts.by_subcategory[subName]) {
                    groupedProducts.by_subcategory[subName].collection = collectionList;
                }
            });
            // Step: Extract distinct subcategories used in the store
            const mainCategoryMap = {};
            allProducts.forEach((p) => {
                const sub = p.subcategory;
                if (sub && sub.name && !mainCategoryMap[sub.name]) {
                    mainCategoryMap[sub.name] = {
                        name: sub.name,
                        image: sub.image || null,
                    };
                }
            });
            groupedProducts.mainCategory = Object.values(mainCategoryMap);
            return { success: true, data: groupedProducts };
        }
        return { success: true, data: filtered };
    }
    catch (err) {
        console.error("Error in fetch_store_products:", err);
        return { success: false, error: err.message };
    }
};
// TODO: Implement this to product creation and remove it from here
module.exports.set_product_sample = async (req) => {
    const { store_id, product_id, ppu, min_qty } = req.body;
    if (!store_id ||
        !product_id ||
        typeof ppu !== "number" ||
        typeof min_qty !== "number") {
        return {
            success: false,
            error: "Missing or invalid parameters",
        };
    }
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        // Check if product exists and is active
        const [product] = await connection.query(`SELECT id FROM products_table WHERE id = ? AND status = 1`, [product_id]);
        if (product.length === 0) {
            await connection.rollback();
            return {
                success: false,
                error: "Product does not exist",
            };
        }
        // Insert or update the sample record
        await connection.query(`INSERT INTO product_sample (store_id, product_id, ppu, min_qty)
             VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE ppu = VALUES(ppu), min_qty = VALUES(min_qty)`, [store_id, product_id, ppu, min_qty]);
        await connection.commit();
        return {
            success: true,
            data: "Sample set successfully",
        };
    }
    catch (error) {
        await connection.rollback();
        console.error("Error setting product sample:", error);
        return {
            success: false,
            error: "Failed to set product sample",
        };
    }
    finally {
        if (connection)
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
                error: "No product samples found",
            };
        }
        const enrichedSamples = await Promise.all(samples.map(async (sample) => {
            const [mediaRows] = await pool.query(`SELECT url FROM media_table WHERE product_id = ?`, [sample.product_id]);
            const images = mediaRows.map((row) => row.url);
            const reviews = await getStoreReviews(pool, sample.store_id);
            const createdAt = await getStoreCreatedAt(pool, sample.store_id);
            return {
                product_id: sample.product_id,
                product_name: sample.name,
                ppu: sample.ppu,
                min_qty: sample.min_qty,
                images,
                store_id: sample.store_id,
                is_verified: sample.is_verified === 1,
                created_at: createdAt,
                reviews,
            };
        }));
        return {
            success: true,
            data: enrichedSamples,
        };
    }
    catch (error) {
        console.error("Error fetching all product samples:", error);
        return {
            success: false,
            error: "Failed to fetch product samples",
        };
    }
};
module.exports.fetch_product_suggestions = async (req) => {
    const { product_id, collection_id, store_id } = req.body;
    // Validate input IDs
    if (isNaN(collection_id) || isNaN(product_id) || isNaN(store_id)) {
        return {
            success: false,
            error: "One or more supplied IDs are invalid",
        };
    }
    try {
        // Fetch 3 types of suggestions in parallel
        const [similar, bestSelling, recommended] = await Promise.all([
            getSimilarProducts(pool, store_id, collection_id, product_id),
            getBestSellingProducts(pool, store_id),
            getRecommendedProducts(pool, store_id),
        ]);
        //console.log("body=>", { similar, bestSelling, recommended });
        // return {
        //   success: true,
        //   data: {
        //     similar: [],
        //     bestSelling: [],
        //     recommended: [],
        //   },
        // };
        // Combine all product suggestions and extract unique product IDs
        const allProducts = [...similar, ...bestSelling, ...recommended];
        const productIds = [
            ...new Set(allProducts.map((p) => p.id || p.product_id)),
        ];
        // Fetch MOQ and Media for all involved products
        const [moqList, mediaMap] = await Promise.all([
            getProductMOQ(pool, productIds),
            getProductMedia(productIds, pool, ["url"]),
        ]);
        // Build product_id => MOQ[] map
        const moqMap = {};
        for (const moq of moqList) {
            if (!moqMap[moq.product_id])
                moqMap[moq.product_id] = [];
            moqMap[moq.product_id].push({
                min_qty: moq.min_qty,
                ppu: moq.ppu,
            });
        }
        console.log("rec=>", recommended);
        // Fetch all product variations
        const variations = await getProductVariations(pool, productIds);
        // Extract variation IDs
        const variationIds = variations.map((v) => v.id);
        // Fetch all variation attributes in parallel
        const attributeGroups = await Promise.all(variationIds.map(async (variationId) => {
            const attrs = await getVariationAttributes(pool, variationId);
            return { variationId, attributes: attrs };
        }));
        // Map: variation_id => attributes[]
        const variationAttrMap = {};
        for (const { variationId, attributes } of attributeGroups) {
            variationAttrMap[variationId] = attributes;
        }
        // Map: product_id => enriched variation[]
        const variationMap = {};
        for (const variation of variations) {
            const productId = variation.product_id;
            const enrichedVariation = {
                ...variation,
                attributes: variationAttrMap[variation.id] || [],
            };
            if (!variationMap[productId])
                variationMap[productId] = [];
            variationMap[productId].push(enrichedVariation);
        }
        // Helper function to enrich any product list with moq, media, and variations
        const enrich = (products) => products.map((product) => {
            const id = product.id || product.product_id;
            return {
                ...product,
                moq: moqMap[id] || [],
                medias: mediaMap[id] || [],
                variations: variationMap[id] || [],
            };
        });
        // Return structured response with enriched suggestions
        return {
            success: true,
            data: {
                similar: enrich(similar),
                bestSelling: enrich(bestSelling),
                recommended: enrich(recommended),
            },
        };
    }
    catch (error) {
        console.error("Error fetching product suggestions:", error);
        return {
            success: false,
            error: "An error occurred while fetching product suggestions",
        };
    }
};
