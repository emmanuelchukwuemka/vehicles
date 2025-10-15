"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchListingsByLocationSchema = exports.createDiscountSchema = exports.addFeaturesSchema = exports.updateListingSchema = exports.createListingSchema = exports.baseListingInputSchema = exports.discountInputSchema = exports.listingFeatureInputSchema = exports.sparePartInputSchema = exports.haulageInputSchema = exports.bikeInputSchema = exports.carInputSchema = exports.changeStatusSchema = exports.addFavoriteSchema = exports.updateVehicleSchema = exports.createVehicleSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.updateUserSchema = exports.logoutSchema = exports.refreshSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
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
exports.addFavoriteSchema = zod_1.z.object({
    vehicleId: zod_1.z.number().positive(),
});
exports.changeStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(['approved', 'rejected', 'sold']),
});
exports.carInputSchema = zod_1.z.object({
    make: zod_1.z.string().min(1),
    model: zod_1.z.string().optional(),
    year: zod_1.z.number().min(1900).max(new Date().getFullYear() + 1).optional(),
    mileage: zod_1.z.number().min(0).optional(),
    fuel_type: zod_1.z.enum(['petrol', 'diesel', 'electric', 'hybrid']).optional(),
    transmission: zod_1.z.enum(['manual', 'automatic']).optional(),
    engine_capacity: zod_1.z.number().min(0.1).max(10).optional(),
    body_type: zod_1.z.string().optional(),
    color: zod_1.z.string().optional(),
    condition: zod_1.z.enum(['new', 'used']),
});
exports.bikeInputSchema = zod_1.z.object({
    make: zod_1.z.string().min(1),
    model: zod_1.z.string().optional(),
    year: zod_1.z.number().min(1900).max(new Date().getFullYear() + 1).optional(),
    engine_capacity: zod_1.z.number().min(0.1).max(10).optional(),
    bike_type: zod_1.z.enum(['sport', 'cruiser', 'touring', 'off-road', 'scooter', 'electric']).optional(),
    mileage: zod_1.z.number().min(0).optional(),
    color: zod_1.z.string().optional(),
    condition: zod_1.z.enum(['new', 'used']),
});
exports.haulageInputSchema = zod_1.z.object({
    make: zod_1.z.string().min(1),
    model: zod_1.z.string().optional(),
    year: zod_1.z.number().min(1900).max(new Date().getFullYear() + 1).optional(),
    axle_configuration: zod_1.z.string().optional(),
    engine_capacity: zod_1.z.number().min(0.1).max(10).optional(),
    body_type: zod_1.z.string().optional(),
    load_capacity: zod_1.z.number().min(0).optional(),
    mileage: zod_1.z.number().min(0).optional(),
    condition: zod_1.z.enum(['new', 'used']),
});
exports.sparePartInputSchema = zod_1.z.object({
    category: zod_1.z.string().min(1),
    brand: zod_1.z.string().optional(),
    part_number: zod_1.z.string().optional(),
    compatible_vehicles: zod_1.z.string().optional(),
    condition: zod_1.z.enum(['new', 'used', 'refurbished']),
    warranty: zod_1.z.string().optional(),
    quantity: zod_1.z.number().min(1),
});
exports.listingFeatureInputSchema = zod_1.z.object({
    featureId: zod_1.z.number().positive(),
    custom_value: zod_1.z.string().optional(),
});
exports.discountInputSchema = zod_1.z.object({
    discount_type: zod_1.z.enum(['percentage', 'fixed']),
    value: zod_1.z.number().positive(),
    min_quantity: zod_1.z.number().min(1).optional(),
    start_date: zod_1.z.date(),
    end_date: zod_1.z.date(),
    usage_limit: zod_1.z.number().min(0).optional(),
});
exports.baseListingInputSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(255),
    description: zod_1.z.string().max(2000).optional(),
    price: zod_1.z.number().positive(),
    currency: zod_1.z.string().length(3).default('USD'),
    location: zod_1.z.string().optional(),
    keywords: zod_1.z.array(zod_1.z.string().min(1).max(50)).max(20).optional(),
    discounts: zod_1.z.array(exports.discountInputSchema).max(5).optional(),
});
exports.createListingSchema = zod_1.z.discriminatedUnion('listing_type', [
    exports.baseListingInputSchema.extend({
        listing_type: zod_1.z.literal('car'),
        vehicleData: exports.carInputSchema,
        features: zod_1.z.array(exports.listingFeatureInputSchema).min(1).max(50),
    }),
    exports.baseListingInputSchema.extend({
        listing_type: zod_1.z.literal('bike'),
        vehicleData: exports.bikeInputSchema,
        features: zod_1.z.array(exports.listingFeatureInputSchema).min(1).max(50),
    }),
    exports.baseListingInputSchema.extend({
        listing_type: zod_1.z.literal('haulage'),
        vehicleData: exports.haulageInputSchema,
        features: zod_1.z.array(exports.listingFeatureInputSchema).min(1).max(50),
    }),
    exports.baseListingInputSchema.extend({
        listing_type: zod_1.z.literal('spare_part'),
        vehicleData: exports.sparePartInputSchema,
        features: zod_1.z.array(exports.listingFeatureInputSchema).min(1).max(50),
    }),
]);
exports.updateListingSchema = exports.baseListingInputSchema.partial().extend({
    features: zod_1.z.array(exports.listingFeatureInputSchema).optional(),
    keywords: zod_1.z.array(zod_1.z.string()).optional(),
    discounts: zod_1.z.array(exports.discountInputSchema).optional(),
});
exports.addFeaturesSchema = zod_1.z.object({
    features: zod_1.z.array(exports.listingFeatureInputSchema).min(1),
});
exports.createDiscountSchema = exports.discountInputSchema;
exports.searchListingsByLocationSchema = zod_1.z.object({
    location: zod_1.z.string().min(1),
    radiusKm: zod_1.z.number().positive().default(50),
    page: zod_1.z.number().positive().default(1),
    limit: zod_1.z.number().positive().max(100).default(20),
});
