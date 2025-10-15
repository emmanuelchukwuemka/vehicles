"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../config/database/sequelize"));
class CartItem extends sequelize_1.Model {
}
exports.CartItem = CartItem;
CartItem.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    cart_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false },
    store_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false },
    subdomain_id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
    product_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: false },
    unit_id: { type: sequelize_1.DataTypes.BIGINT.UNSIGNED, allowNull: true },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 1,
    },
    price: { type: sequelize_1.DataTypes.DECIMAL(12, 2), allowNull: false },
    currency_id: { type: sequelize_1.DataTypes.INTEGER.UNSIGNED, allowNull: false },
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
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "cart_items",
    timestamps: false,
    underscored: true,
});
