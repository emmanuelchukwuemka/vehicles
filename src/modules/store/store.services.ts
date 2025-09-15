import { Transaction } from "sequelize";
import sequelize from "../../config/database/sequelize";
import { StoreCapability } from "../capability/models/storecapability.models";
import { Store } from "./models/store.models";
import { v4 as uuid } from "uuid";
import City from "../city/city.models";
import { Vendor } from "../vendor/vendor.models";
import { StoreInput } from "./validation/store.validations";
import { Subdomain } from "../domains/model/subdomain.models";
import { Capability } from "../capability/models/capability.models";

export const createStore = async (input: StoreInput) => {
  let transaction: Transaction | null = null;

  try {
    transaction = await sequelize.transaction();

    // -----------------------------------------
    // Check if vendor exists
    // -----------------------------------------
    const vendor = await Vendor.findByPk(input.vendor_id, { transaction });
    if (!vendor) {
      return { success: false, message: "Vendor not found" };
    }

    // -----------------------------------------
    // Check if city exists
    // -----------------------------------------
    const city = await City.findByPk(input.city_id, { transaction });
    if (!city) {
      return { success: false, message: "City not found" };
    }

    // -----------------------------------------
    // Check if subdomain exists
    // -----------------------------------------
    const subdomain = await Subdomain.findByPk(input.subdomain_id, {
      transaction,
    });
    if (!subdomain) {
      return { success: false, message: "Subdomain not found" };
    }

    // -----------------------------------------
    // Ensure store uniqueness per city
    // -----------------------------------------
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

    // -----------------------------------------
    // Create store (metadata stored as JSON)
    // -----------------------------------------
    const store = await Store.create(
      {
        vendor_id: input.vendor_id,
        subdomain_id: input.subdomain_id,
        name: input.name.trim(),
        slogan: input.slogan.trim(),
        city_id: input.city_id,
        address: input.address.trim(),
        code: storeCode,
        is_verified: input.is_verified ?? 1,
        status: input.status ?? 1,
        metadata: input.metadata,
      },
      { transaction }
    );

    // -----------------------------------------
    // If you want some normalized relational data
    // -----------------------------------------
    if (input.metadata?.capabilities?.length) {
      // Step 1: Fetch all valid capabilities from DB
      const validCapabilities = await Capability.findAll({
        where: { id: input.metadata.capabilities },
        transaction,
      });

      // Step 2: Compare provided IDs vs existing ones
      const validIds = validCapabilities.map((c) => c.id);
      const invalidIds = input.metadata.capabilities.filter(
        (id: number) => !validIds.includes(id)
      );

      if (invalidIds.length > 0) {
        return {
          success: false,
          message: "One or more capability IDs are invalid",
        };
      }

      // Step 3: Insert only if all are valid
      const bulkData = validIds.map((capId: number) => ({
        store_id: store.id,
        capability_id: capId,
      }));

      await StoreCapability.bulkCreate(bulkData, { transaction });
    }

    await transaction.commit();

    return {
      success: true,
      message: "Store created successfully",
      data: { store_id: store.id, code: storeCode },
    };
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.log(error);
    return { success: false, message: "Error creating store", error };
  }
};

export const getStoreWithScopes = async (storeId: number) => {
  const store = await Store.findByPk(storeId);

  if (!store) {
    return { success: false, message: "Store not found", statusCode: 404 };
  }

  return {
    success: true,
    message: "Store fetched successfully",
    data: store,
  };
};
