import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../config/database/sequelize";
import ServiceModule from "./module.models";
import { SubmoduleAttributes } from "../module.types";

export type SubmoduleCreationAttributes = Optional<
  SubmoduleAttributes,
  "id" | "created_at" | "updated_at" | "status"
>;

export class Submodule
  extends Model<SubmoduleAttributes, SubmoduleCreationAttributes>
  implements SubmoduleAttributes
{
  public id!: number;
  public domain_id!: number;
  public name!: string;
  public label!: string;
  public code!: string;
  public description!: string | null;
  public status!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Submodule.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    domain_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "_system_subdomain",
    timestamps: false,
  }
);

// Associations
Submodule.belongsTo(ServiceModule, {
  foreignKey: "domain_id",
  as: "domain",
});
ServiceModule.hasMany(Submodule, {
  foreignKey: "domain_id",
  as: "subdomain",
});
