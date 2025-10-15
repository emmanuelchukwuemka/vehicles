"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers = __importStar(require("./vehicles.controllers"));
const vehicles_middlewares_1 = require("./vehicles.middlewares");
const multer_1 = __importDefault(require("multer"));
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const vehicles_types_1 = require("./vehicles.types");
const router = (0, express_1.Router)();
router.use(vehicles_middlewares_1.generalLimiter);
router.get('/health', controllers.healthCheck);
const upload = (0, multer_1.default)({
    dest: process.env.UPLOAD_DIR || 'uploads',
    limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880') },
    fileFilter: (req, file, cb) => {
        const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp,video/mp4,video/avi').split(',');
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type'));
        }
    },
});
const listingUpload = (0, multer_1.default)({
    dest: process.env.UPLOAD_DIR || 'uploads',
    limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'), files: 20 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp,video/mp4,video/avi').split(',');
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type'));
        }
    },
});
router.post('/auth/register', vehicles_middlewares_1.authLimiter, controllers.register);
router.post('/auth/login', vehicles_middlewares_1.authLimiter, controllers.login);
router.post('/auth/refresh', vehicles_middlewares_1.authLimiter, controllers.refresh);
router.post('/auth/logout', controllers.logout);
router.post('/auth/forgot-password', vehicles_middlewares_1.authLimiter, controllers.forgotPassword);
router.post('/auth/reset-password', controllers.resetPassword);
router.get('/users/me', vehicles_middlewares_1.authenticate, controllers.getProfile);
router.put('/users/me', vehicles_middlewares_1.authenticate, controllers.updateProfile);
router.post('/vehicles', vehicles_middlewares_1.authenticate, controllers.createVehicle);
router.get('/vehicles', controllers.getVehicles);
router.get('/vehicles/:id', controllers.getVehicle);
router.put('/vehicles/:id', vehicles_middlewares_1.authenticate, controllers.updateVehicle);
router.delete('/vehicles/:id', vehicles_middlewares_1.authenticate, controllers.deleteVehicle);
router.post('/upload', vehicles_middlewares_1.authenticate, upload.array('images', 10), controllers.uploadImages);
router.post('/favorites', vehicles_middlewares_1.authenticate, controllers.addFavorite);
router.get('/favorites', vehicles_middlewares_1.authenticate, controllers.getFavorites);
router.delete('/favorites/:id', vehicles_middlewares_1.authenticate, controllers.removeFavorite);
router.post('/listings', vehicles_middlewares_1.authenticate, listingUpload.array('media', 20), controllers.createListingController);
router.put('/listings/:id', vehicles_middlewares_1.authenticate, listingUpload.array('media', 10), controllers.updateListingController);
router.get('/listings', controllers.getListingsController);
router.get('/listings/search-by-location', (0, validation_middleware_1.validate)(vehicles_types_1.searchListingsByLocationSchema), controllers.searchListingsByLocationController);
router.get('/listings/:id', controllers.getListingController);
router.delete('/listings/:id', vehicles_middlewares_1.authenticate, controllers.deleteListingController);
router.post('/listings/:id/features', vehicles_middlewares_1.authenticate, controllers.addFeaturesController);
router.post('/listings/:id/media', vehicles_middlewares_1.authenticate, upload.array('media', 10), controllers.uploadMediaController);
router.post('/listings/:id/discounts', vehicles_middlewares_1.authenticate, controllers.createDiscountController);
router.post('/listings/:id/submit', vehicles_middlewares_1.authenticate, controllers.submitListingController);
router.get('/admin/vehicles', vehicles_middlewares_1.authenticate, vehicles_middlewares_1.authorizeAdmin, controllers.getAdminVehicles);
router.put('/admin/vehicles/:id/status', vehicles_middlewares_1.authenticate, vehicles_middlewares_1.authorizeAdmin, controllers.updateVehicleStatus);
router.get('/admin/stats', vehicles_middlewares_1.authenticate, vehicles_middlewares_1.authorizeAdmin, controllers.getStats);
exports.default = router;
