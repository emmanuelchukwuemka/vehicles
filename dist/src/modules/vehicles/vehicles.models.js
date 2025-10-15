"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedSearch = exports.Message = exports.Review = exports.Discount = exports.OrderItem = exports.Order = exports.Keyword = exports.Media = exports.ListingFeature = exports.Feature = exports.Category = exports.SparePart = exports.Haulage = exports.Bike = exports.Car = exports.Listing = exports.RefreshToken = exports.Favorite = exports.VehicleImage = exports.Vehicle = exports.User = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../config/database/sequelize"));
// User Model
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    email: { type: sequelize_1.DataTypes.STRING(255), allowNull: false, unique: true },
    password_hash: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    full_name: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    phone: { type: sequelize_1.DataTypes.STRING(50), allowNull: true },
    role: { type: sequelize_1.DataTypes.ENUM('user', 'admin'), allowNull: false, defaultValue: 'user' },
    is_active: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updated_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});
// Vehicle Model
class Vehicle extends sequelize_1.Model {
}
exports.Vehicle = Vehicle;
Vehicle.init({
    id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    user_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: User, key: 'id' } },
    title: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    brand: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    model: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    year: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    price: { type: sequelize_1.DataTypes.DECIMAL(12, 2), allowNull: false },
    currency: { type: sequelize_1.DataTypes.CHAR(3), allowNull: false, defaultValue: 'USD' },
    mileage: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    condition: { type: sequelize_1.DataTypes.ENUM('new', 'used'), allowNull: false, defaultValue: 'used' },
    transmission: { type: sequelize_1.DataTypes.ENUM('manual', 'automatic'), allowNull: true },
    fuel_type: { type: sequelize_1.DataTypes.STRING(50), allowNull: true },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    status: { type: sequelize_1.DataTypes.ENUM('pending', 'approved', 'rejected', 'sold'), allowNull: false, defaultValue: 'pending' },
    location: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updated_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: 'vehicles',
    modelName: 'Vehicle',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        { fields: ['brand'] },
        { fields: ['year'] },
        { fields: ['price'] },
        { fields: ['title', 'description'], type: 'FULLTEXT' },
    ],
});
// Vehicle Image Model
class VehicleImage extends sequelize_1.Model {
}
exports.VehicleImage = VehicleImage;
VehicleImage.init({
    id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    vehicle_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: Vehicle, key: 'id' } },
    url: { type: sequelize_1.DataTypes.STRING(1024), allowNull: false },
    is_primary: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: 'vehicle_images',
    modelName: 'VehicleImage',
    timestamps: false,
});
// Favorite Model
class Favorite extends sequelize_1.Model {
}
exports.Favorite = Favorite;
Favorite.init({
    id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    user_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: User, key: 'id' } },
    vehicle_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Vehicle, key: 'id' } },
}, {
    sequelize: sequelize_2.default,
    tableName: 'favorites',
    modelName: 'Favorite',
    timestamps: false,
    indexes: [
        { fields: ['user_id', 'vehicle_id'], unique: true },
    ],
});
// Refresh Token Model
class RefreshToken extends sequelize_1.Model {
}
exports.RefreshToken = RefreshToken;
RefreshToken.init({
    id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    user_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: User, key: 'id' } },
    token_hash: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    expires_at: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    revoked_at: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: 'refresh_tokens',
    modelName: 'RefreshToken',
    timestamps: false,
});
// Listing Model
class Listing extends sequelize_1.Model {
}
exports.Listing = Listing;
Listing.init({
    id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    user_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: User, key: 'id' } },
    listing_type: { type: sequelize_1.DataTypes.ENUM('car', 'bike', 'haulage', 'spare_part'), allowNull: false },
    title: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    price: { type: sequelize_1.DataTypes.DECIMAL(12, 2), allowNull: false },
    currency: { type: sequelize_1.DataTypes.CHAR(3), allowNull: false, defaultValue: 'USD' },
    status: { type: sequelize_1.DataTypes.ENUM('draft', 'active', 'inactive', 'sold', 'reserved'), allowNull: false, defaultValue: 'draft' },
    location: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    latitude: { type: sequelize_1.DataTypes.DECIMAL(10, 8), allowNull: true },
    longitude: { type: sequelize_1.DataTypes.DECIMAL(11, 8), allowNull: true },
    view_count: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updated_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: 'listings',
    modelName: 'Listing',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        { fields: ['user_id'] },
        { fields: ['listing_type'] },
        { fields: ['status'] },
        { fields: ['price'] },
        { fields: ['location'] },
        { fields: ['latitude', 'longitude'] },
        { fields: ['title', 'description'], type: 'FULLTEXT' },
    ],
});
// Car Model
class Car extends sequelize_1.Model {
}
exports.Car = Car;
Car.init({
    id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    listing_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Listing, key: 'id' } },
    make: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    model: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    year: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    mileage: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    fuel_type: { type: sequelize_1.DataTypes.ENUM('petrol', 'diesel', 'electric', 'hybrid'), allowNull: true },
    transmission: { type: sequelize_1.DataTypes.ENUM('manual', 'automatic'), allowNull: true },
    engine_capacity: { type: sequelize_1.DataTypes.DECIMAL(4, 2), allowNull: true },
    body_type: { type: sequelize_1.DataTypes.STRING(50), allowNull: true },
    color: { type: sequelize_1.DataTypes.STRING(50), allowNull: true },
    condition: { type: sequelize_1.DataTypes.ENUM('new', 'used'), allowNull: false, defaultValue: 'used' },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updated_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: 'cars',
    modelName: 'Car',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        { fields: ['listing_id'], unique: true },
        { fields: ['make'] },
        { fields: ['model'] },
        { fields: ['year'] },
    ],
});
// Bike Model
class Bike extends sequelize_1.Model {
}
exports.Bike = Bike;
Bike.init({
    id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    listing_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Listing, key: 'id' } },
    make: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    model: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    year: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    engine_capacity: { type: sequelize_1.DataTypes.DECIMAL(4, 2), allowNull: true },
    bike_type: { type: sequelize_1.DataTypes.ENUM('sport', 'cruiser', 'touring', 'off-road', 'scooter', 'electric'), allowNull: true },
    mileage: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    color: { type: sequelize_1.DataTypes.STRING(50), allowNull: true },
    condition: { type: sequelize_1.DataTypes.ENUM('new', 'used'), allowNull: false, defaultValue: 'used' },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updated_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: 'bikes',
    modelName: 'Bike',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        { fields: ['listing_id'], unique: true },
        { fields: ['make'] },
        { fields: ['bike_type'] },
        { fields: ['year'] },
    ],
});
// Haulage Model
class Haulage extends sequelize_1.Model {
}
exports.Haulage = Haulage;
Haulage.init({
    id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    listing_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Listing, key: 'id' } },
    make: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    model: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    year: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    axle_configuration: { type: sequelize_1.DataTypes.STRING(50), allowNull: true },
    engine_capacity: { type: sequelize_1.DataTypes.DECIMAL(4, 2), allowNull: true },
    body_type: { type: sequelize_1.DataTypes.STRING(50), allowNull: true },
    load_capacity: { type: sequelize_1.DataTypes.DECIMAL(8, 2), allowNull: true },
    mileage: { type: sequelize_1.DataTypes.INTEGER, allowNull: true },
    condition: { type: sequelize_1.DataTypes.ENUM('new', 'used'), allowNull: false, defaultValue: 'used' },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updated_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: 'haulage',
    modelName: 'Haulage',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        { fields: ['listing_id'], unique: true },
        { fields: ['make'] },
        { fields: ['body_type'] },
        { fields: ['year'] },
    ],
});
// SparePart Model
class SparePart extends sequelize_1.Model {
}
exports.SparePart = SparePart;
SparePart.init({
    id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    listing_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Listing, key: 'id' } },
    category: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    brand: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    part_number: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    compatible_vehicles: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    condition: { type: sequelize_1.DataTypes.ENUM('new', 'used', 'refurbished'), allowNull: false, defaultValue: 'new' },
    warranty: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    quantity: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1 },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updated_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: 'spare_parts',
    modelName: 'SparePart',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        { fields: ['listing_id'], unique: true },
        { fields: ['category'] },
        { fields: ['brand'] },
        { fields: ['part_number'] },
    ],
});
// Category Model
class Category extends sequelize_1.Model {
}
exports.Category = Category;
Category.init({
    id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    type: { type: sequelize_1.DataTypes.ENUM('car', 'bike', 'haulage', 'spare_part'), allowNull: false },
    parent_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: Category, key: 'id' } },
    sort_order: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    is_active: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updated_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: 'categories',
    modelName: 'Category',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        { fields: ['type'] },
        { fields: ['parent_id'] },
        { fields: ['is_active'] },
    ],
});
// Feature Model
class Feature extends sequelize_1.Model {
}
exports.Feature = Feature;
Feature.init({
    id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    category: { type: sequelize_1.DataTypes.ENUM('comfort', 'safety', 'sound', 'performance', 'utility'), allowNull: false },
    feature_type: { type: sequelize_1.DataTypes.ENUM('boolean', 'text', 'number', 'select'), allowNull: false, defaultValue: 'boolean' },
    icon: { type: sequelize_1.DataTypes.STRING(100), allowNull: true },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    is_active: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updated_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: 'features',
    modelName: 'Feature',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        { fields: ['category'] },
        { fields: ['feature_type'] },
        { fields: ['is_active'] },
    ],
});
// ListingFeature Model
class ListingFeature extends sequelize_1.Model {
}
exports.ListingFeature = ListingFeature;
ListingFeature.init({
    id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    listing_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Listing, key: 'id' } },
    feature_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Feature, key: 'id' } },
    custom_value: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updated_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: 'listing_features',
    modelName: 'ListingFeature',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        { fields: ['listing_id'] },
        { fields: ['feature_id'] },
        { fields: ['listing_id', 'feature_id'], unique: true },
    ],
});
// Media Model
class Media extends sequelize_1.Model {
}
exports.Media = Media;
Media.init({
    id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    listing_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Listing, key: 'id' } },
    file_url: { type: sequelize_1.DataTypes.STRING(500), allowNull: false },
    file_type: { type: sequelize_1.DataTypes.ENUM('image', 'video'), allowNull: false },
    file_size: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    dimensions: { type: sequelize_1.DataTypes.STRING(50), allowNull: true },
    is_primary: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    sort_order: { type: sequelize_1.DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    alt_text: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updated_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: 'media',
    modelName: 'Media',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        { fields: ['listing_id'] },
        { fields: ['file_type'] },
        { fields: ['is_primary'] },
    ],
});
// Keyword Model
class Keyword extends sequelize_1.Model {
}
exports.Keyword = Keyword;
Keyword.init({
    id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    listing_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Listing, key: 'id' } },
    keyword: { type: sequelize_1.DataTypes.STRING(100), allowNull: false },
    relevance_score: { type: sequelize_1.DataTypes.DECIMAL(3, 2), allowNull: false, defaultValue: 1.0 },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: 'keywords',
    modelName: 'Keyword',
    timestamps: false,
    indexes: [
        { fields: ['listing_id'] },
        { fields: ['keyword'] },
    ],
});
// Order Model
class Order extends sequelize_1.Model {
}
exports.Order = Order;
Order.init({
    id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    user_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: User, key: 'id' } },
    listing_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Listing, key: 'id' } },
    quantity: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1 },
    unit_price: { type: sequelize_1.DataTypes.DECIMAL(12, 2), allowNull: false },
    total_price: { type: sequelize_1.DataTypes.DECIMAL(12, 2), allowNull: false },
    status: { type: sequelize_1.DataTypes.ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'), allowNull: false, defaultValue: 'pending' },
    payment_status: { type: sequelize_1.DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'), allowNull: false, defaultValue: 'pending' },
    shipping_address: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updated_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: 'orders',
    modelName: 'Order',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        { fields: ['user_id'] },
        { fields: ['listing_id'] },
        { fields: ['status'] },
        { fields: ['payment_status'] },
    ],
});
// OrderItem Model
class OrderItem extends sequelize_1.Model {
}
exports.OrderItem = OrderItem;
OrderItem.init({
    id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    order_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Order, key: 'id' } },
    listing_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Listing, key: 'id' } },
    quantity: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    price: { type: sequelize_1.DataTypes.DECIMAL(12, 2), allowNull: false },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: 'order_items',
    modelName: 'OrderItem',
    timestamps: false,
    indexes: [
        { fields: ['order_id'] },
        { fields: ['listing_id'] },
    ],
});
// Discount Model
class Discount extends sequelize_1.Model {
}
exports.Discount = Discount;
Discount.init({
    id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    listing_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Listing, key: 'id' } },
    discount_type: { type: sequelize_1.DataTypes.ENUM('percentage', 'fixed'), allowNull: false },
    value: { type: sequelize_1.DataTypes.DECIMAL(8, 2), allowNull: false },
    min_quantity: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1 },
    start_date: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    end_date: { type: sequelize_1.DataTypes.DATE, allowNull: false },
    usage_limit: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: true },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updated_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: 'discounts',
    modelName: 'Discount',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        { fields: ['listing_id'] },
        { fields: ['start_date'] },
        { fields: ['end_date'] },
    ],
});
// Review Model
class Review extends sequelize_1.Model {
}
exports.Review = Review;
Review.init({
    id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    order_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: Order, key: 'id' } },
    rating: { type: sequelize_1.DataTypes.TINYINT.UNSIGNED, allowNull: false, validate: { min: 1, max: 5 } },
    comment: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    is_approved: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updated_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: 'reviews',
    modelName: 'Review',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        { fields: ['order_id'] },
        { fields: ['rating'] },
        { fields: ['is_approved'] },
    ],
});
// Message Model
class Message extends sequelize_1.Model {
}
exports.Message = Message;
Message.init({
    id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    sender_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: User, key: 'id' } },
    receiver_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: User, key: 'id' } },
    listing_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: true, references: { model: Listing, key: 'id' } },
    subject: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    message: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    is_read: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updated_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: 'messages',
    modelName: 'Message',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        { fields: ['sender_id'] },
        { fields: ['receiver_id'] },
        { fields: ['listing_id'] },
        { fields: ['is_read'] },
    ],
});
// SavedSearch Model
class SavedSearch extends sequelize_1.Model {
}
exports.SavedSearch = SavedSearch;
SavedSearch.init({
    id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    user_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false, references: { model: User, key: 'id' } },
    name: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    search_criteria: { type: sequelize_1.DataTypes.JSON, allowNull: false },
    notification_enabled: { type: sequelize_1.DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    last_notified_at: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updated_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: 'saved_searches',
    modelName: 'SavedSearch',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        { fields: ['user_id'] },
        { fields: ['notification_enabled'] },
    ],
});
// Associations
User.hasMany(Vehicle, { foreignKey: 'user_id', as: 'vehicles' });
Vehicle.belongsTo(User, { foreignKey: 'user_id', as: 'owner' });
Vehicle.hasMany(VehicleImage, { foreignKey: 'vehicle_id', as: 'images' });
VehicleImage.belongsTo(Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' });
User.hasMany(Favorite, { foreignKey: 'user_id', as: 'favorites' });
Favorite.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Vehicle.hasMany(Favorite, { foreignKey: 'vehicle_id', as: 'favorites' });
Favorite.belongsTo(Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' });
User.hasMany(RefreshToken, { foreignKey: 'user_id', as: 'refreshTokens' });
RefreshToken.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
// New associations for polymorphic listings
User.hasMany(Listing, { foreignKey: 'user_id', as: 'listings' });
Listing.belongsTo(User, { foreignKey: 'user_id', as: 'owner' });
Listing.hasOne(Car, { foreignKey: 'listing_id', as: 'car' });
Car.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });
Listing.hasOne(Bike, { foreignKey: 'listing_id', as: 'bike' });
Bike.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });
Listing.hasOne(Haulage, { foreignKey: 'listing_id', as: 'haulage' });
Haulage.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });
Listing.hasOne(SparePart, { foreignKey: 'listing_id', as: 'sparePart' });
SparePart.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });
Listing.hasMany(Media, { foreignKey: 'listing_id', as: 'media' });
Media.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });
Listing.hasMany(Keyword, { foreignKey: 'listing_id', as: 'keywords' });
Keyword.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });
Listing.hasMany(ListingFeature, { foreignKey: 'listing_id', as: 'features' });
ListingFeature.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });
Feature.hasMany(ListingFeature, { foreignKey: 'feature_id', as: 'listingFeatures' });
ListingFeature.belongsTo(Feature, { foreignKey: 'feature_id', as: 'feature' });
Listing.hasMany(Order, { foreignKey: 'listing_id', as: 'orders' });
Order.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });
Listing.hasMany(Discount, { foreignKey: 'listing_id', as: 'discounts' });
Discount.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'buyer' });
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
Order.hasOne(Review, { foreignKey: 'order_id', as: 'review' });
Review.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
User.hasMany(Message, { foreignKey: 'sender_id', as: 'sentMessages' });
User.hasMany(Message, { foreignKey: 'receiver_id', as: 'receivedMessages' });
Message.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'receiver_id', as: 'receiver' });
Listing.hasMany(Message, { foreignKey: 'listing_id', as: 'messages' });
Message.belongsTo(Listing, { foreignKey: 'listing_id', as: 'listing' });
User.hasMany(SavedSearch, { foreignKey: 'user_id', as: 'savedSearches' });
SavedSearch.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Category.hasMany(Category, { foreignKey: 'parent_id', as: 'children' });
Category.belongsTo(Category, { foreignKey: 'parent_id', as: 'parent' });
exports.default = {
    User,
    Vehicle,
    VehicleImage,
    Favorite,
    RefreshToken,
    Listing,
    Car,
    Bike,
    Haulage,
    SparePart,
    Category,
    Feature,
    ListingFeature,
    Media,
    Keyword,
    Order,
    OrderItem,
    Discount,
    Review,
    Message,
    SavedSearch
};
