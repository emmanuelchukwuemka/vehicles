import { Router } from "express";
import * as reviewsController from "../reviews/reviews.controller";

const router = Router();

// Get /api/stores/reviews/id
router.post("/", reviewsController.getReview);

// POST /api/stores/reviews
router.post("/store", reviewsController.getReviews);

export default router;
