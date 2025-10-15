import { NextFunction, Response } from "express";

export const checkPayload = (err: any, res: Response, next: NextFunction): void => {
  console.error("Payload Error:", err);
  if (err.type === "entity.too.large") {
    res
      .status(413)
      .json({ success: false, error: "Request payload size is too large" });
    return;
  }
  next(err);
};
