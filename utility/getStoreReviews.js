module.exports.getStoreReviews = async (pool, store_id) => {
  if (isNaN(store_id)) {
    return { success: false, error: "Invalid Store ID" };
  }

  try {
    // Validate if the store exists and is active
    const [storeCheck] = await pool.query(
      `SELECT id FROM stores_table WHERE id = ? AND status = 1 LIMIT 1`,
      [store_id]
    );

    if (storeCheck.length === 0) {
      return {
        success: false,
        error: "Store not found or inactive.",
      };
    }

    // Fetch overall rating and total reviews
    const [reviewStats] = await pool.query(
      `SELECT
                COUNT(id) AS total_reviews,
                IFNULL(AVG((product_quality + supplier_service + on_time_shipment) / 3), 0) AS average_rating
             FROM store_reviews
             WHERE store_id = ? AND status = 1`,
      [store_id]
    );

    const total_reviews = reviewStats[0]?.total_reviews || 0;
    const average_rating = parseFloat(reviewStats[0]?.average_rating) || 0;

    // Rating label classification
    let rating_label;
    if (average_rating >= 4.5) {
      rating_label = "Excellent";
    } else if (average_rating >= 4.0) {
      rating_label = "Very Good";
    } else if (average_rating >= 3.0) {
      rating_label = "Good";
    } else if (average_rating >= 2.0) {
      rating_label = "Fair";
    } else if (average_rating > 0) {
      rating_label = "Poor";
    } else {
      rating_label = "No Ratings Yet";
    }

    // Fetch category-specific ratings
    const [categoryRatings] = await pool.query(
      `SELECT 
                AVG(product_quality) AS avg_product_quality,
                AVG(supplier_service) AS avg_supplier_service,
                AVG(on_time_shipment) AS avg_on_time_shipment
             FROM store_reviews 
             WHERE store_id = ? AND status = 1`,
      [store_id]
    );

    const categoryData = categoryRatings[0] || {};

    // Ensure values are numbers before applying .toFixed(1)
    const product_quality =
      categoryData.avg_product_quality !== null
        ? parseFloat(categoryData.avg_product_quality).toFixed(1)
        : null;
    const supplier_service =
      categoryData.avg_supplier_service !== null
        ? parseFloat(categoryData.avg_supplier_service).toFixed(1)
        : null;
    const on_time_shipment =
      categoryData.avg_on_time_shipment !== null
        ? parseFloat(categoryData.avg_on_time_shipment).toFixed(1)
        : null;

    // Fetch user reviews
    const [userReviews] = await pool.query(
      `SELECT 
                sr.id, sr.user_id, u.first_name, sr.rating, sr.review_text, 
                sr.product_quality, sr.supplier_service, sr.on_time_shipment, sr.created_at
             FROM store_reviews sr
             JOIN users_table u ON sr.user_id = u.id
             WHERE sr.store_id = ? AND sr.status = 1
             ORDER BY sr.created_at DESC LIMIT 4`,
      [store_id]
    );

    return {
      success: true,
      data: {
        average_rating: parseFloat(average_rating.toFixed(1)), // Convert to 1 decimal place
        total_reviews,
        rating_label,
        category_ratings: {
          product_quality,
          supplier_service,
          on_time_shipment,
        },
        user_reviews: userReviews.map((review) => ({
          id: review.id,
          user_id: review.user_id,
          user_name: review.first_name,
          rating: review.rating,
          review_text: review.review_text,
          product_quality: review.product_quality,
          supplier_service: review.supplier_service,
          on_time_shipment: review.on_time_shipment,
          created_at: review.created_at,
        })),
      },
    };
  } catch (error) {
    console.log("Error fetching store reviews:", error);
    return {
      success: false,
      error: "An error occurred while fetching store reviews.",
    };
  }
};
