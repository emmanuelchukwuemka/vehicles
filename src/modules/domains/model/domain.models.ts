import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../config/database/sequelize";
import { DomainAttributes } from "../type/domain.types";

type ModuleCreationAttributes = Optional<
  DomainAttributes,
  "id" | "code" | "created_at" | "updated_at"
>;

// Model definition
export class Domain
  extends Model<DomainAttributes, ModuleCreationAttributes>
  implements DomainAttributes
{
  public id!: number;
  public name!: string;
  public label!: string;
  public code!: string;
  public description!: string;
  public status!: number;
  public intake!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

// Initialize model
Domain.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    intake: {
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
    tableName: "_system_domains",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Domain;
