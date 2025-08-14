import { Request, Response } from "express";
import * as reviewsService from "./reviews.service";

export const getReview = async (req: Request, res: Response) => {
  const reviewId = Number(req.body.id);

  const result = await reviewsService.getReview(reviewId);

  return res
    .status(result.statusCode || (result.success ? 200 : 400))
    .json(result);
};

export const getReviews = async (req: Request, res: Response) => {
  const storeId = Number(req.body.id);

  const result = await reviewsService.getReviews(storeId);

  return res
    .status(result.statusCode || (result.success ? 200 : 400))
    .json(result);
};
