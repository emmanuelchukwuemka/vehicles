import { Request, Response, NextFunction } from "express";

export const paymentSecure = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Middleware executed for payment module");

    next();
  } catch (err) {
    next(err); // Here am just passing the error to global errorHandler
  }
};
