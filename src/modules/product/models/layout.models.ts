import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../config/database/sequelize";

export interface LayoutAttributes {
  id: number;
  name: string;
  label: string;
  description: string;
  priority: number;
  status: number;
  created_at?: Date;
}

export type LayoutCreationAttributes = Optional<
  LayoutAttributes,
  "id" | "created_at"
>;

export class Layout
  extends Model<LayoutAttributes, LayoutCreationAttributes>
  implements LayoutAttributes
{
  public id!: number;
  public name!: string;
  public label!: string;
  public description!: string;
  public priority!: number;
  public status!: number;
  public readonly created_at!: Date;
}

Layout.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(255), allowNull: false },
    label: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.STRING(255), allowNull: false },
    priority: { type: DataTypes.STRING(10), allowNull: false },
    status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "layouts_table",
    modelName: "Layout",
    timestamps: false, // only created_at
  }
);

export default Layout;
