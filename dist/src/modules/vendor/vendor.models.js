"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendor = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../config/database/sequelize")); // adjust path
const user_models_1 = __importDefault(require("../user/user.models"));
// ✅ Model definition
class Vendor extends sequelize_1.Model {
}
exports.Vendor = Vendor;
// ✅ Initialize model
Vendor.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true, // Enforces 1:1 User ↔ Vendor
    },
    status: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1, // Active by default
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "vendors_table",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
// ✅ Optional associations (if you have a User model)
Vendor.belongsTo(user_models_1.default, {
    foreignKey: "user_id",
    as: "user",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
user_models_1.default.hasOne(Vendor, {
    foreignKey: "user_id",
    as: "vendor",
});
exports.default = Vendor;
