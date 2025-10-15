"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../config/database/sequelize"));
class Cart extends sequelize_1.Model {
}
exports.Cart = Cart;
Cart.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        comment: "FK → users (no guest carts in DB)",
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
    tableName: "carts_table",
    underscored: true,
    timestamps: false,
});
