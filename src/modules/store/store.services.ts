import { Transaction } from "sequelize";
import sequelize from "../../config/database/sequelize";
import { StoreCapability } from "../capability/models/storecapability.models";
import { CreateStoreInput } from "./store.types";
import { Store } from "./models/store.models";
import { v4 as uuid } from "uuid";
import City from "../city/city.models";
import { Vendor } from "../vendor/vendor.models";
import StoreScope from "./models/scope.models";
import { StoreInput } from "./store.validations";

export const createStore = async (input: StoreInput) => {
  let transaction: Transaction | null = null;

  try {
    transaction = await sequelize.transaction();

    // Check if vendor exists
    const vendor = await Vendor.findByPk(input.vendor_id, { transaction });
    if (!vendor) {
      return { success: false, message: "Vendor not found" };
    }

    // Check if city exists
    const city = await City.findByPk(input.city_id, { transaction });
    if (!city) {
      return { success: false, message: "City not found" };
    }

    // Check if a store with the same name exists in the same city
    const existingStore = await Store.findOne({
      where: {
        name: input.name.trim(),
        city_id: input.city_id,
      },
      transaction,
    });

    if (existingStore) {
      return {
        success: false,
        message: `A store with the name "${input.name}" already exists in this city`,
      };
    }

    const storeCode = uuid();

    // Create store
    const store = await Store.create(
      {
        vendor_id: input.vendor_id,
        subdomain_id: input.subdomain_id,
        name: input.name.trim(),
        slogan: input.slogan.trim(),
        city_id: input.city_id,
        banner: input.banner,
        picture: input.picture,
        net_worth: input.net_worth,
        logo: input.logo,
        staff_count: input.staff_count,
        address: input.address.trim(),
        floor_space: input.floor_space,
        code: storeCode,
        is_verified: 1,
        status: 1,
      },
      { transaction }
    );

    // Add store capabilities
    if (input.capabilities?.length) {
      const bulkData = input.capabilities.map((capId: any) => ({
        store_id: store.id,
        capability_id: capId,
      }));
      await StoreCapability.bulkCreate(bulkData, { transaction });
    }

    // Add store scope
    if (input.scope) {
      await StoreScope.create(
        {
          store_id: store.id,
          scope: input.scope, // "seller" or "manufacturer"
        },
        { transaction }
      );
    }

    await transaction.commit();

    return {
      success: true,
      message: "Store created successfully",
      data: { store_id: store.id, code: storeCode },
    };
  } catch (error) {
    if (transaction) await transaction.rollback();
    return { success: false, message: "Error creating store", error };
  }
};

export const getStoreWithScopes = async (storeId: number) => {
  const store = await Store.findByPk(storeId, {
    include: [
      {
        model: StoreScope,
        as: "scopes",
        attributes: ["scope"],
      },
    ],
  });

  if (!store) {
    return { success: false, message: "Store not found", statusCode: 404 };
  }

  return {
    success: true,
    message: "Store fetched successfully",
    data: store,
  };
};
