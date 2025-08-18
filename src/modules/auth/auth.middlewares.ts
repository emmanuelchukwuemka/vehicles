import { Request, Response, NextFunction } from "express";
import { loginSchema } from "./auth.validations";

export const authSecure = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Middleware executed for auth module");

    // validate request body
    req.body = loginSchema.parse(req.body);

    next();
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      details: err.errors ?? err.issues,
    });
  }
};
