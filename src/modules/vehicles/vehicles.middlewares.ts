import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; email: string; role: string };
    (req as any).user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid access token' });
  }
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req as any).user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  return next();
};

// Rate limiting
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 auth requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
