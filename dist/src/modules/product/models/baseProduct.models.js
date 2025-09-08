"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../config/database/sequelize"));
class Product extends sequelize_1.Model {
}
exports.Product = Product;
Product.init({
    id: { type: sequelize_1.DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    store_id: { type: sequelize_1.DataTypes.BIGINT, allowNull: false },
    subdomain_id: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    product_code: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    subcategory_id: { type: sequelize_1.DataTypes.BIGINT, allowNull: true },
    collection_id: { type: sequelize_1.DataTypes.BIGINT, allowNull: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.TEXT, allowNull: true },
    base_price: { type: sequelize_1.DataTypes.DECIMAL(12, 2), allowNull: false },
    currency_id: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
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
    status: { type: sequelize_1.DataTypes.TINYINT, defaultValue: 0 },
    created_at: sequelize_1.DataTypes.DATE,
    updated_at: sequelize_1.DataTypes.DATE,
}, {
    sequelize: sequelize_2.default,
    tableName: "products_table",
    timestamps: false,
});
