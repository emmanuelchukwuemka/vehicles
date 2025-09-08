"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../config/database/sequelize"));
const variation_models_1 = require("./variation.models");
class Media extends sequelize_1.Model {
}
exports.Media = Media;
Media.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    variation_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
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
    url: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1,
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
    tableName: "product_media",
    sequelize: sequelize_2.default,
    timestamps: false,
    indexes: [
        { fields: ["product_id"] },
        { fields: ["variation_id"] },
        { fields: ["type"] },
        { fields: ["status"] },
    ],
});
// Associations
Media.belongsTo(variation_models_1.Variation, { foreignKey: "variation_id", as: "variation" });
