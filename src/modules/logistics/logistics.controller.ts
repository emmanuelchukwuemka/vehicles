import { Request, Response, NextFunction } from "express";
import * as logisticsService from "./logistics.service";

export const addCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newProduct = await logisticsService.testMethod(req.body);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    next(error);
  }
};
