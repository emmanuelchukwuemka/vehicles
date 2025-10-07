import { Request, Response, NextFunction } from "express";

export const morelikeSecure = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("Middleware executed for morelike module");

    next();
  } catch (err) {
    next(err); // Here am just passing the error to global errorHandler
  }
};
