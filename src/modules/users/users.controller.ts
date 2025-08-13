import { Request, Response, NextFunction } from "express";
import * as usersService from "../users/users.service";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newProduct = await usersService.getProfile(req.body);
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    next(error);
  }
};
