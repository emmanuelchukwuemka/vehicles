"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../config/database/sequelize"));
class Store extends sequelize_1.Model {
}
exports.Store = Store;
Store.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    vendor_id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    subdomain_id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    name: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    slogan: { type: sequelize_1.DataTypes.STRING(255), allowNull: true },
    city_id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    banner: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    picture: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    logo: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    net_worth: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
    },
    staff_count: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
        allowNull: true,
        defaultValue: 0.0,
    },
    address: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    floor_space: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0.0,
    },
    code: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, unique: true },
    is_verified: { type: sequelize_1.DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
    verified_date: { type: sequelize_1.DataTypes.DATE, allowNull: true },
    status: { type: sequelize_1.DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
    updated_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: "stores_table",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});
