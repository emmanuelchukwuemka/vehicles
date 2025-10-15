import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../modules/user/user.models";

export const verifyCookie = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.accessToken;
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
      statusCode: 401,
    });
    return;
  }

  try {
    //-> Verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
    };

    //-> Fetch user from DB
    const user = await User.findByPk(payload.id);

    if (!user) {
      res.status(401).json({
        success: false,
        message: "User not found",
        statusCode: 401,
      });
      return;
    }

    //-> Attach full user object to request
    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
      statusCode: 401,
    });
    return;
  }
};
