"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../config/database/sequelize"));
class Layout extends sequelize_1.Model {
}
exports.Layout = Layout;
Layout.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    label: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
    priority: { type: sequelize_1.DataTypes.STRING(10), allowNull: false },
    status: { type: sequelize_1.DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
    created_at: { type: sequelize_1.DataTypes.DATE, defaultValue: sequelize_1.DataTypes.NOW },
}, {
    sequelize: sequelize_2.default,
    tableName: "layouts_table",
    modelName: "Layout",
    timestamps: false, // only created_at
});
exports.default = Layout;
