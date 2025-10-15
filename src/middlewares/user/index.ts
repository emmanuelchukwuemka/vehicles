import { Request, Response, NextFunction } from "express";

export const checkUserStatus = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const user = req.user as { status?: number };

  if (!user) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
      statusCode: 401,
    });
    return;
  }

  if (user.status !== 1) {
    res.status(403).json({
      success: false,
      message: "Account inactive or blocked",
      statusCode: 403,
    });
    return;
  }

  next();
};

export const checkUserMatch = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const loggedInUser = req.user as { id: number };

  if (!loggedInUser) {
    res.status(401).json({
      success: false,
      message: "Unauthorized lara",
      statusCode: 401,
    });
    return;
  }

  // Safely read ids
  const paramId = req.params.id ? Number(req.params.id) : undefined;
  const bodyId = req.body?.user_id ? Number(req.body.user_id) : undefined;
  const queryId = req.query?.user_id ? Number(req.query.user_id) : undefined;

  // Pick whichever exists (priority: params > body > query)
  const userId = paramId ?? bodyId ?? queryId;

  if (userId === undefined || isNaN(userId)) {
    res.status(400).json({
      success: false,
      message: "User ID not provided in request",
      statusCode: 400,
    });
    return;
  }

  if (userId !== loggedInUser.id) {
    res.status(403).json({
      success: false,
      message: "Access denied: user mismatch",
      statusCode: 403,
    });
    return;
  }

  next();
};
