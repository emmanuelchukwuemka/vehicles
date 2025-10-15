"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeStatusSchema = exports.addFavoriteSchema = exports.updateVehicleSchema = exports.createVehicleSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.updateUserSchema = exports.logoutSchema = exports.refreshSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
// Zod schemas for validation
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    fullName: zod_1.z.string().optional(),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.refreshSchema = zod_1.z.object({
    refreshToken: zod_1.z.string(),
});
exports.logoutSchema = zod_1.z.object({
    refreshToken: zod_1.z.string(),
});
exports.updateUserSchema = zod_1.z.object({
    fullName: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
});
exports.resetPasswordSchema = zod_1.z.object({
    token: zod_1.z.string(),
    password: zod_1.z.string().min(6),
});
// Vehicle schemas
exports.createVehicleSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    brand: zod_1.z.string().min(1),
    model: zod_1.z.string().optional(),
    year: zod_1.z.number().optional(),
    price: zod_1.z.number().positive(),
    currency: zod_1.z.string().default('USD'),
    mileage: zod_1.z.number().optional(),
    condition: zod_1.z.enum(['new', 'used']).default('used'),
    transmission: zod_1.z.enum(['manual', 'automatic']).optional(),
    fuel_type: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
});
exports.updateVehicleSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    brand: zod_1.z.string().min(1).optional(),
    model: zod_1.z.string().optional(),
    year: zod_1.z.number().optional(),
    price: zod_1.z.number().positive().optional(),
    currency: zod_1.z.string().optional(),
    mileage: zod_1.z.number().optional(),
    condition: zod_1.z.enum(['new', 'used']).optional(),
    transmission: zod_1.z.enum(['manual', 'automatic']).optional(),
    fuel_type: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    location: zod_1.z.string().optional(),
});
// Favorite schemas
exports.addFavoriteSchema = zod_1.z.object({
    vehicleId: zod_1.z.number().positive(),
});
exports.changeStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(['approved', 'rejected', 'sold']),
});
