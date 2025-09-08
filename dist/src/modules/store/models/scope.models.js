"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreScope = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../config/database/sequelize"));
const store_models_1 = require("./store.models");
// Model definition
class StoreScope extends sequelize_1.Model {
}
exports.StoreScope = StoreScope;
// Initialize model
StoreScope.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    store_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    scope: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: "stores_scope",
    timestamps: false,
});
store_models_1.Store.hasMany(StoreScope, { foreignKey: "store_id", as: "scopes" });
StoreScope.belongsTo(store_models_1.Store, { foreignKey: "store_id", as: "store" });
exports.default = StoreScope;
