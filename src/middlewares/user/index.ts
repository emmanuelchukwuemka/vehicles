import { Request, Response, NextFunction } from "express";

export const checkUserStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as { status?: number };

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
      statusCode: 401,
    });
  }

  if (user.status !== 1) {
    return res.status(403).json({
      success: false,
      message: "Account inactive or blocked",
      statusCode: 403,
    });
  }

  next();
};

export const checkUserMatch = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedInUser = req.user as { id: number };

  if (!loggedInUser) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized lara",
      statusCode: 401,
    });
  }

  // Safely read ids
  const paramId = req.params.id ? Number(req.params.id) : undefined;
  const bodyId = req.body?.user_id ? Number(req.body.user_id) : undefined;
  const queryId = req.query?.user_id ? Number(req.query.user_id) : undefined;

  // Pick whichever exists (priority: params > body > query)
  const userId = paramId ?? bodyId ?? queryId;

  if (userId === undefined || isNaN(userId)) {
    return res.status(400).json({
      success: false,
      message: "User ID not provided in request",
      statusCode: 400,
    });
  }

  if (userId !== loggedInUser.id) {
    return res.status(403).json({
      success: false,
      message: "Access denied: user mismatch",
      statusCode: 403,
    });
  }

  next();
};
