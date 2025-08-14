"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReview = exports.getReviews = void 0;
const db_1 = __importDefault(require("../../../config/database/db"));
const apiResponse_1 = require("../../../globals/utility/apiResponse");
// Get all reviews
const getReviews = async (id) => {
    if (!id) {
        return (0, apiResponse_1.errorResponse)("Store ID is required", 400);
    }
    const [result] = await db_1.default.execute("SELECT * FROM interactions WHERE target_id = ? LIMIT 1", [id]);
    const storeReviews = result.length;
    if (!storeReviews) {
        return (0, apiResponse_1.errorResponse)("No reviews available for this store", 400);
    }
    return (0, apiResponse_1.successResponse)("Retrieved successful", storeReviews);
};
exports.getReviews = getReviews;
// Get a single review
const getReview = async (reviewId) => {
    if (!reviewId) {
        return (0, apiResponse_1.errorResponse)("Review ID is required", 400);
    }
    const [result] = await db_1.default.execute("SELECT * FROM interactions WHERE id = ? LIMIT 1", [reviewId]);
    const reviewData = result.length ? result[0] : null;
    if (!reviewData) {
        return (0, apiResponse_1.errorResponse)("Review with this ID could not be found", 400);
    }
    return (0, apiResponse_1.successResponse)("Retrieved successful", reviewData);
};
exports.getReview = getReview;
