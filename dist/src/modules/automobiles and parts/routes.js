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
const controllers = __importStar(require("./controllers"));
const middlewares_1 = require("./middlewares");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
// Apply general rate limiting
router.use(middlewares_1.generalLimiter);
// Health check
router.get('/health', controllers.healthCheck);
// Configure multer for uploads
const upload = (0, multer_1.default)({
    dest: process.env.UPLOAD_DIR || 'uploads',
    limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880') },
    fileFilter: (req, file, cb) => {
        const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp').split(',');
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type'));
        }
    },
});
// Auth routes
router.post('/auth/register', middlewares_1.authLimiter, controllers.register);
router.post('/auth/login', middlewares_1.authLimiter, controllers.login);
router.post('/auth/refresh', middlewares_1.authLimiter, controllers.refresh);
router.post('/auth/logout', controllers.logout);
router.post('/auth/forgot-password', middlewares_1.authLimiter, controllers.forgotPassword);
router.post('/auth/reset-password', controllers.resetPassword);
// User routes
router.get('/users/me', middlewares_1.authenticate, controllers.getProfile);
router.put('/users/me', middlewares_1.authenticate, controllers.updateProfile);
// Vehicle routes
router.post('/vehicles', middlewares_1.authenticate, controllers.createVehicle);
router.get('/vehicles', controllers.getVehicles);
router.get('/vehicles/:id', controllers.getVehicle);
router.put('/vehicles/:id', middlewares_1.authenticate, controllers.updateVehicle);
router.delete('/vehicles/:id', middlewares_1.authenticate, controllers.deleteVehicle);
// Upload routes
router.post('/upload', middlewares_1.authenticate, upload.array('images', 10), controllers.uploadImages);
// Favorites routes
router.post('/favorites', middlewares_1.authenticate, controllers.addFavorite);
router.get('/favorites', middlewares_1.authenticate, controllers.getFavorites);
router.delete('/favorites/:id', middlewares_1.authenticate, controllers.removeFavorite);
// Admin routes
router.get('/admin/vehicles', middlewares_1.authenticate, middlewares_1.authorizeAdmin, controllers.getAdminVehicles);
router.put('/admin/vehicles/:id/status', middlewares_1.authenticate, middlewares_1.authorizeAdmin, controllers.updateVehicleStatus);
router.get('/admin/stats', middlewares_1.authenticate, middlewares_1.authorizeAdmin, controllers.getStats);
exports.default = router;
