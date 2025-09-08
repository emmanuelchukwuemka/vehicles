import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../config/database/sequelize";
import { Store } from "./store.models";

// TypeScript interfaces
interface StoreScopeAttributes {
  id: number;
  store_id: number;
  scope: string;
  created_at?: Date;
}

type StoreScopeCreationAttributes = Optional<
  StoreScopeAttributes,
  "id" | "created_at"
>;

// Model definition
export class StoreScope
  extends Model<StoreScopeAttributes, StoreScopeCreationAttributes>
  implements StoreScopeAttributes
{
  public id!: number;
  public store_id!: number;
  public scope!: string;
  public readonly created_at!: Date;
}

// Initialize model
StoreScope.init(
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
    scope: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "stores_scope",
    timestamps: false,
  }
);

Store.hasMany(StoreScope, { foreignKey: "store_id", as: "scopes" });
StoreScope.belongsTo(Store, { foreignKey: "store_id", as: "store" });

export default StoreScope;
