import { Request, Response } from 'express';
import * as services from './vehicles.services';
import { registerSchema, loginSchema, refreshSchema, logoutSchema, updateUserSchema, forgotPasswordSchema, resetPasswordSchema, createVehicleSchema, updateVehicleSchema, addFavoriteSchema, createListingSchema, updateListingSchema, addFeaturesSchema, createDiscountSchema } from './vehicles.types';
import { successResponse, errorResponse } from '../../globals/utility/apiResponse';

export const register = async (req: Request, res: Response) => {
  try {
    const validated = registerSchema.parse(req.body);
    const result = await services.register(validated);
    if (!result.success) {
      return errorResponse(res, { statusCode: 400, message: result.message });
    }
    return successResponse(res, { message: result.message, data: result.data });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 400, message: 'Validation error', details: error.issues });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validated = loginSchema.parse(req.body);
    const result = await services.login(validated);
    if (!result.success) {
      return errorResponse(res, { statusCode: 401, message: result.message });
    }
    res.cookie('accessToken', result.data!.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });
    res.cookie('refreshToken', result.data!.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return successResponse(res, { message: result.message, data: result.data });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 400, message: 'Validation error', details: error.issues });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const validated = refreshSchema.parse(req.body);
    const result = await services.refresh(validated.refreshToken);
    if (!result.success) {
      return errorResponse(res, { statusCode: 401, message: result.message });
    }
    res.cookie('accessToken', result.data!.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });
    res.cookie('refreshToken', result.data!.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return successResponse(res, { message: result.message, data: result.data });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 400, message: 'Validation error', details: error.issues });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const validated = logoutSchema.parse(req.body);
    const result = await services.logout(validated.refreshToken);
    if (!result.success) {
      return errorResponse(res, { statusCode: 400, message: result.message });
    }
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return successResponse(res, { message: result.message });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 400, message: 'Validation error', details: error.issues });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const result = await services.getUserProfile(userId);
    if (!result.success) {
      return errorResponse(res, { statusCode: 404, message: result.message });
    }
    return successResponse(res, { message: 'Profile retrieved', data: result.data });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 500, message: 'Unexpected error' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const validated = updateUserSchema.parse(req.body);
    const userId = (req as any).user.id;
    const result = await services.updateUserProfile(userId, validated);
    if (!result.success) {
      return errorResponse(res, { statusCode: 400, message: result.message });
    }
    return successResponse(res, { message: 'Profile updated', data: result.data });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 400, message: 'Validation error', details: error.issues });
  }
};

// Vehicle controllers
export const createVehicle = async (req: Request, res: Response) => {
  try {
    const validated = createVehicleSchema.parse(req.body);
    const userId = (req as any).user.id;
    const result = await services.createVehicle(userId, validated);
    if (!result.success) {
      return errorResponse(res, { statusCode: 400, message: result.message });
    }
    return successResponse(res, { message: result.message, data: result.data });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 400, message: 'Validation error', details: error.issues });
  }
};

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await services.getVehicles(req.query);
    if (!result.success) {
      return errorResponse(res, { statusCode: 500, message: result.message });
    }
    return successResponse(res, { message: 'Vehicles retrieved', data: result.data });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 500, message: 'Unexpected error' });
  }
};

export const getVehicle = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await services.getVehicleById(id);
    if (!result.success) {
      return errorResponse(res, { statusCode: 404, message: result.message });
    }
    return successResponse(res, { message: 'Vehicle retrieved', data: result.data });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 500, message: 'Unexpected error' });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  try {
    const validated = updateVehicleSchema.parse(req.body);
    const id = parseInt(req.params.id);
    const userId = (req as any).user.id;
    const isAdmin = (req as any).user.role === 'admin';
    const result = await services.updateVehicle(userId, id, validated, isAdmin);
    if (!result.success) {
      return errorResponse(res, { statusCode: 400, message: result.message });
    }
    return successResponse(res, { message: result.message, data: result.data });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 400, message: 'Validation error', details: error.issues });
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const userId = (req as any).user.id;
    const isAdmin = (req as any).user.role === 'admin';
    const result = await services.deleteVehicle(userId, id, isAdmin);
    if (!result.success) {
      return errorResponse(res, { statusCode: 400, message: result.message });
    }
    return successResponse(res, { message: result.message });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 500, message: 'Unexpected error' });
  }
};

// Upload controllers
export const uploadImages = async (req: Request, res: Response) => {
  try {
    const files = (req as any).files;
    const vehicleId = req.body.vehicleId ? parseInt(req.body.vehicleId) : undefined;
    const result = await services.uploadImages(files, vehicleId);
    if (!result.success) {
      return errorResponse(res, { statusCode: 400, message: result.message });
    }
    return successResponse(res, { message: 'Images uploaded', data: result.data });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 500, message: 'Unexpected error' });
  }
};

// Favorites controllers
export const addFavorite = async (req: Request, res: Response) => {
  try {
    const validated = addFavoriteSchema.parse(req.body);
    const userId = (req as any).user.id;
    const result = await services.addFavorite(userId, validated.vehicleId);
    if (!result.success) {
      return errorResponse(res, { statusCode: 400, message: result.message });
    }
    return successResponse(res, { message: result.message, data: result.data });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 400, message: 'Validation error', details: error.issues });
  }
};

export const getFavorites = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const result = await services.getFavorites(userId);
    if (!result.success) {
      return errorResponse(res, { statusCode: 500, message: result.message });
    }
    return successResponse(res, { message: 'Favorites retrieved', data: result.data });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 500, message: 'Unexpected error' });
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const userId = (req as any).user.id;
    const result = await services.removeFavorite(userId, id);
    if (!result.success) {
      return errorResponse(res, { statusCode: 400, message: result.message });
    }
    return successResponse(res, { message: result.message });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 500, message: 'Unexpected error' });
  }
};

// Admin controllers
export const getAdminVehicles = async (req: Request, res: Response) => {
  try {
    const result = await services.getAdminVehicles(req.query);
    if (!result.success) {
      return errorResponse(res, { statusCode: 500, message: result.message });
    }
    return successResponse(res, { message: 'Admin vehicles retrieved', data: result.data });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 500, message: 'Unexpected error' });
  }
};

export const updateVehicleStatus = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const result = await services.updateVehicleStatus(id, status);
    if (!result.success) {
      return errorResponse(res, { statusCode: 400, message: result.message });
    }
    return successResponse(res, { message: result.message });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 500, message: 'Unexpected error' });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const result = await services.getStats();
    if (!result.success) {
      return errorResponse(res, { statusCode: 500, message: result.message });
    }
    return successResponse(res, { message: 'Stats retrieved', data: result.data });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 500, message: 'Unexpected error' });
  }
};

// Health check
export const healthCheck = async (req: Request, res: Response) => {
  return successResponse(res, { message: 'Service is healthy', data: { timestamp: new Date().toISOString() } });
};

// Password reset controllers
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const validated = forgotPasswordSchema.parse(req.body);
    const result = await services.forgotPassword(validated.email);
    if (!result.success) {
      return errorResponse(res, { statusCode: 400, message: result.message });
    }
    return successResponse(res, { message: result.message });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 400, message: 'Validation error', details: error.issues });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const validated = resetPasswordSchema.parse(req.body);
    const result = await services.resetPassword(validated.token, validated.password);
    if (!result.success) {
      return errorResponse(res, { statusCode: 400, message: result.message });
    }
    return successResponse(res, { message: result.message });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 400, message: 'Validation error', details: error.issues });
  }
};

// Listing controllers
export const createListingController = async (req: Request, res: Response) => {
  try {
    const validated = createListingSchema.parse(req.body);
    const userId = (req as any).user.id;
    const files = (req as any).files;
    const result = await services.createListing(userId, { ...validated, files });
    if (!result.success) {
      return errorResponse(res, { statusCode: 400, message: result.message });
    }
    return successResponse(res, { message: result.message, data: result.data });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 400, message: 'Validation error', details: error.issues });
  }
};

export const updateListingController = async (req: Request, res: Response) => {
  try {
    const validated = updateListingSchema.parse(req.body);
    const listingId = parseInt(req.params.id);
    const userId = (req as any).user.id;
    const files = (req as any).files;
    const result = await services.updateListing(userId, listingId, { ...validated, files });
    if (!result.success) {
      return errorResponse(res, { statusCode: 400, message: result.message });
    }
    return successResponse(res, { message: result.message, data: result.data });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 400, message: 'Validation error', details: error.issues });
  }
};

export const getListingsController = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const result = await services.getAllListings(query);
    if (!result.success) {
      return errorResponse(res, { statusCode: 500, message: result.message });
    }
    return successResponse(res, { message: 'Listings retrieved', data: result.data });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 500, message: 'Unexpected error' });
  }
};

export const getListingController = async (req: Request, res: Response) => {
  try {
    const listingId = parseInt(req.params.id);
    const includeOwner = (req as any).user?.role === 'admin';
    const result = await services.getListingById(listingId, includeOwner);
    if (!result.success) {
      return errorResponse(res, { statusCode: 404, message: result.message });
    }
    return successResponse(res, { message: 'Listing retrieved', data: result.data });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 500, message: 'Unexpected error' });
  }
};

export const deleteListingController = async (req: Request, res: Response) => {
  try {
    const listingId = parseInt(req.params.id);
    const userId = (req as any).user.id;
    const result = await services.deleteListing(userId, listingId);
    if (!result.success) {
      return errorResponse(res, { statusCode: 400, message: result.message });
    }
    return successResponse(res, { message: result.message });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 500, message: 'Unexpected error' });
  }
};

export const addFeaturesController = async (req: Request, res: Response) => {
  try {
    const validated = addFeaturesSchema.parse(req.body);
    const listingId = parseInt(req.params.id);
    const result = await services.addListingFeatures(listingId, validated.features);
    if (!result.success) {
      return errorResponse(res, { statusCode: 400, message: result.message });
    }
    return successResponse(res, { message: result.message });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 400, message: 'Validation error', details: error.issues });
  }
};

export const uploadMediaController = async (req: Request, res: Response) => {
  try {
    const files = (req as any).files;
    const listingId = parseInt(req.params.id);
    const result = await services.addListingMedia(listingId, files);
    if (!result.success) {
      return errorResponse(res, { statusCode: 400, message: result.message });
    }
    return successResponse(res, { message: result.message, data: result.data });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 500, message: 'Unexpected error' });
  }
};

export const createDiscountController = async (req: Request, res: Response) => {
  try {
    const validated = createDiscountSchema.parse(req.body);
    const listingId = parseInt(req.params.id);
    const result = await services.createListingDiscount(listingId, validated);
    if (!result.success) {
      return errorResponse(res, { statusCode: 400, message: result.message });
    }
    return successResponse(res, { message: result.message, data: result.data });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 400, message: 'Validation error', details: error.issues });
  }
};

export const submitListingController = async (req: Request, res: Response) => {
  try {
    const listingId = parseInt(req.params.id);
    const userId = (req as any).user.id;
    const result = await services.submitListing(listingId, userId);
    if (!result.success) {
      return errorResponse(res, { statusCode: 400, message: result.message });
    }
    return successResponse(res, { message: result.message });
  } catch (error: any) {
    return errorResponse(res, { statusCode: 500, message: 'Unexpected error' });
  }
};
