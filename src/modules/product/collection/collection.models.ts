import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../config/database/sequelize";
import { CollectionAttributes } from "./collection.types";

export interface CollectionCreationAttributes
  extends Optional<
    CollectionAttributes,
    "id" | "status" | "created_at" | "updated_at"
  > {}

export class Collection
  extends Model<CollectionAttributes, CollectionCreationAttributes>
  implements CollectionAttributes
{
  public id!: number;
  public store_id!: number;
  public name!: string;
  public label!: string;
  public description!: string;
  public status!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Collection.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    store_id: {
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
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
    modelName: "Collection",
    tableName: "collections_table",
    timestamps: false,
    indexes: [{ fields: ["store_id"] }, { fields: ["subcategory_id"] }],
  }
);

// Associations will be defined in another file
