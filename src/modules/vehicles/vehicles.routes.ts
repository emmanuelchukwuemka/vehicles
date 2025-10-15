import { Router } from 'express';
import * as controllers from './vehicles.controllers';
import { authenticate, authorizeAdmin, authLimiter, generalLimiter } from './vehicles.middlewares';
import multer from 'multer';

const router = Router();

// Apply general rate limiting
router.use(generalLimiter);

// Health check
router.get('/health', controllers.healthCheck);

// Configure multer for uploads
const upload = multer({
  dest: process.env.UPLOAD_DIR || 'uploads',
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880') },
  fileFilter: (req, file, cb) => {
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp,video/mp4,video/avi').split(',');
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

// Configure multer for listings (higher limits)
const listingUpload = multer({
  dest: process.env.UPLOAD_DIR || 'uploads',
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'), files: 20 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp,video/mp4,video/avi').split(',');
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

// Auth routes
router.post('/auth/register', authLimiter, controllers.register);
router.post('/auth/login', authLimiter, controllers.login);
router.post('/auth/refresh', authLimiter, controllers.refresh);
router.post('/auth/logout', controllers.logout);
router.post('/auth/forgot-password', authLimiter, controllers.forgotPassword);
router.post('/auth/reset-password', controllers.resetPassword);

// User routes
router.get('/users/me', authenticate, controllers.getProfile);
router.put('/users/me', authenticate, controllers.updateProfile);

// Vehicle routes
router.post('/vehicles', authenticate, controllers.createVehicle);
router.get('/vehicles', controllers.getVehicles);
router.get('/vehicles/:id', controllers.getVehicle);
router.put('/vehicles/:id', authenticate, controllers.updateVehicle);
router.delete('/vehicles/:id', authenticate, controllers.deleteVehicle);

// Upload routes
router.post('/upload', authenticate, upload.array('images', 10), controllers.uploadImages);

// Favorites routes
router.post('/favorites', authenticate, controllers.addFavorite);
router.get('/favorites', authenticate, controllers.getFavorites);
router.delete('/favorites/:id', authenticate, controllers.removeFavorite);

// Listing routes
router.post('/listings', authenticate, listingUpload.array('media', 20), controllers.createListingController);
router.put('/listings/:id', authenticate, listingUpload.array('media', 10), controllers.updateListingController);
router.get('/listings', controllers.getListingsController);
router.get('/listings/:id', controllers.getListingController);
router.delete('/listings/:id', authenticate, controllers.deleteListingController);
router.post('/listings/:id/features', authenticate, controllers.addFeaturesController);
router.post('/listings/:id/media', authenticate, upload.array('media', 10), controllers.uploadMediaController);
router.post('/listings/:id/discounts', authenticate, controllers.createDiscountController);
router.post('/listings/:id/submit', authenticate, controllers.submitListingController);

// Admin routes
router.get('/admin/vehicles', authenticate, authorizeAdmin, controllers.getAdminVehicles);
router.put('/admin/vehicles/:id/status', authenticate, authorizeAdmin, controllers.updateVehicleStatus);
router.get('/admin/stats', authenticate, authorizeAdmin, controllers.getStats);

export default router;
