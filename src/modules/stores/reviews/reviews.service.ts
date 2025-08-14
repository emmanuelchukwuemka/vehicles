import pool from "../../../config/database/db";
import {
  errorResponse,
  successResponse,
} from "../../../globals/utility/apiResponse";

// Get all reviews
export const getReviews = async (id: number) => {
  if (!id) {
    return errorResponse("Store ID is required", 400);
  }
  const [result]: any = await pool.execute(
    "SELECT * FROM interactions WHERE target_id = ? LIMIT 1",
    [id],
  );

  const storeReviews = result.length;
  if (!storeReviews) {
    return errorResponse("No reviews available for this store", 400);
  }

  return successResponse("Retrieved successful", storeReviews);
};

// Get a single review
export const getReview = async (reviewId: number) => {
  if (!reviewId) {
    return errorResponse("Review ID is required", 400);
  }
  const [result]: any = await pool.execute(
    "SELECT * FROM interactions WHERE id = ? LIMIT 1",
    [reviewId],
  );

  const reviewData = result.length ? result[0] : null;
  if (!reviewData) {
    return errorResponse("Review with this ID could not be found", 400);
  }

  return successResponse("Retrieved successful", reviewData);
};
