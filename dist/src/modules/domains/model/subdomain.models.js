"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subdomain = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../../../config/database/sequelize"));
const domain_models_1 = __importDefault(require("./domain.models"));
class Subdomain extends sequelize_1.Model {
}
exports.Subdomain = Subdomain;
Subdomain.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    domain_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    label: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    code: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
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
    sequelize: sequelize_2.default,
    tableName: "_system_subdomain",
    timestamps: false,
});
Subdomain.belongsTo(domain_models_1.default, {
    foreignKey: "domain_id",
    as: "domain",
});
domain_models_1.default.hasMany(Subdomain, {
    foreignKey: "domain_id",
    as: "subdomain",
});
