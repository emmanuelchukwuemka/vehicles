const { pool } = require("../connection/db");
require("dotenv").config();
const { v4: uuid } = require("uuid");
const axios = require("axios");
const { getCategoryData } = require("../utility/category/getCategoryData");
const { getProductMedia } = require("../utility/product/getProductMedia");
const { getProductMOQ } = require("../utility/product/getProductMOQ");
const { fetchCapabilities } = require("../moduler/capability/capabilityQuery");
const { getProductMedias } = require("../moduler/medias/mediaQueries");
const {
  getBasicProductSamples,
} = require("../moduler/products/samples/productSampleQueries");
const { getStoreScope } = require("../utility/user/getStoreScope");

// LOAD RETAILER/MANUFACTURERS MODULE
module.exports.sellerMarket = async (req) => {
  try {
    /* -----------------------------------------------------------
       0.  Fetch main‑categories
    ----------------------------------------------------------- */
    const categories = await getCategoryData({ level: "maincategory", pool });

    /* -----------------------------------------------------------
       1.  Get every store_id that has the 'seller' scope
           (using getStoreScope instead of direct SQL)
    ----------------------------------------------------------- */
    const scopeMap = await getStoreScope({
      pool,
      conditions: { scope: "seller" }, // WHERE scope = 'seller'
      fields: ["store_id", "scope"], // we only need scope column
    });

    const sellerIDs = scopeMap.map((r) => r.store_id);

    console.log(sellerIDs);

    if (sellerIDs.length === 0) {
      return { success: true, data: { categories, products: [] } };
    }

    /* -----------------------------------------------------------
       2.  Pull the latest active products for those retailer stores
    ----------------------------------------------------------- */
    const placeholders = sellerIDs.map(() => "?").join(",");
    const [products] = await pool.query(
      `SELECT id, name, price, discount, status
         FROM products_table
        WHERE status = 1
          AND store_id IN (${placeholders})
        ORDER BY created_at DESC
        LIMIT 30`,
      [sellerIDs]
    );

    if (products.length === 0) {
      return { success: true, data: { categories, products: [] } };
    }

    /* -----------------------------------------------------------
       3.  Enrich products with media & MOQ
    ----------------------------------------------------------- */
    const productIds = products.map((p) => p.id);
    const [mediaMap, moqList] = await Promise.all([
      getProductMedia(productIds, pool, ["url"]),
      getProductMOQ(pool, productIds),
    ]);

    const moqMap = {};
    for (const m of moqList) {
      (moqMap[m.product_id] ??= []).push({ min_qty: m.min_qty, ppu: m.ppu });
    }

    const enriched = products.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      discount: p.discount,
      status: p.status,
      medias: mediaMap[p.id] || [],
      moq: moqMap[p.id] || [],
    }));

    /* -----------------------------------------------------------
       4.  Final payload
    ----------------------------------------------------------- */
    return {
      success: true,
      data: { categories, products: enriched },
    };
  } catch (err) {
    console.error("Error in retailerMarket:", err);
    return {
      success: false,
      error: "Failed to load retailer market data",
    };
  }
};

module.exports.loadManufacturer = async (req) => {
  try {
    const params = { level: "maincategory", pool };

    /* -------------------------------------------------------------
       1.  Get all user_ids that have the 'manufacture' scope
           (using the dynamic getStoreScope utility)
    ------------------------------------------------------------- */
    const scopeRows = await getStoreScope({
      pool,
      conditions: { scope: "manufacturer" },
      fields: ["store_id", "scope"],
    });

    const storeIDs = scopeRows.map((r) => r.store_id);

    if (storeIDs.length === 0) {
      return {
        success: true,
        data: { samples: [], categories: [], capabilities: [] },
      };
    }

    /* -------------------------------------------------------------
       2.  Fetch up to 5 latest products from those manufacturers
    ------------------------------------------------------------- */

    const samples = await getBasicProductSamples({
      pool,
      fields: ["*"],
      limit: 20,
      conditions: {
        store_id: storeIDs,
      },
    });

    const productIds = samples.map((s) => s.product_id);

    /* -------------------------------------------------------------
       3.  Attach media for each sample
    ------------------------------------------------------------- */
    // const sampleWithMedia = await Promise.all(
    //   samples.map(async (sample) => {
    //     const media = await getProductMedias(pool, sample.product_id);
    //     return { ...sample, images: media };
    //   })
    // );

    const [mediaMap] = await Promise.all([
      getProductMedia(productIds, pool, ["url"]),
    ]);

    const sampleWithMedia = samples.map((product) => ({
      ...product,
      images: mediaMap[product.product_id] || [],
    }));

    /* -------------------------------------------------------------
       4.  Fetch categories & capabilities
    ------------------------------------------------------------- */
    const categories = await getCategoryData(params);
    const capabilities = await fetchCapabilities(pool, ["id", "name"]);

    /* -------------------------------------------------------------
       5.  Return final payload
    ------------------------------------------------------------- */
    return {
      success: true,
      data: {
        samples: sampleWithMedia, //sampleWithMedia,
        categories,
        capabilities,
      },
    };
  } catch (error) {
    console.error("Error in loadManufacture:", error);
    return {
      success: false,
      error: "An error occurred while loading manufacturer data",
    };
  }
};
