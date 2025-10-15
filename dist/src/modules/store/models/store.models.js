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
    vendor_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    subdomain_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    slogan: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    city_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    code: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
    },
    is_verified: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
    metadata: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: true,
        get() {
            const raw = this.getDataValue("metadata");
            if (typeof raw === "string") {
                try {
                    return JSON.parse(raw);
                }
                catch {
                    return raw;
                }
            }
            return raw;
        },
    },
    created_at: sequelize_1.DataTypes.DATE,
    updated_at: sequelize_1.DataTypes.DATE,
}, {
    sequelize: sequelize_2.default,
    tableName: "stores_table",
    timestamps: false,
});
