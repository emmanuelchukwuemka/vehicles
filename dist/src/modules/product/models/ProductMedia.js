"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductMedia = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../config/database/sequelize"));
class ProductMedia extends sequelize_1.Model {
}
exports.ProductMedia = ProductMedia;
ProductMedia.init({
    id: { type: sequelize_1.DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    product_id: { type: sequelize_1.DataTypes.BIGINT, allowNull: false },
    unit_id: { type: sequelize_1.DataTypes.BIGINT, allowNull: true },
    url: { type: sequelize_1.DataTypes.TEXT, allowNull: false },
    type: { type: sequelize_1.DataTypes.STRING(50), allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING, allowNull: true },
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
    status: { type: sequelize_1.DataTypes.TINYINT, defaultValue: 1 },
}, {
    sequelize: sequelize_2.default,
    tableName: "products_media",
    timestamps: false,
});
