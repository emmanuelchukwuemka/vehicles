import { Store } from "../../store/models/store.models";
import { Collection } from "./collection.models";
import { CollectionInput } from "./collection.validations";
import { Op, fn, col, where, literal } from "sequelize";

export const createCollection = async (data: CollectionInput) => {
  try {
    // Checking if store exists
    const store = await Store.findByPk(data.store_id);
    if (!store) {
      return { success: false, message: "Store not found" };
    }

    // Checking if collection with same store, category, and name exists (case-insensitive)
    const existing = await Collection.findOne({
      where: {
        store_id: data.store_id,
        [Op.and]: where(fn("LOWER", col("name")), data.name.toLowerCase()),
      },
    });

    if (existing) {
      return {
        success: false,
        message: `Collection with name (${data.name}) already exists for this store`,
      };
    }

    // Creating collection
    const collection = await Collection.create({
      store_id: data.store_id,
      name: data.name.trim(),
      label: data.label.trim(),
      description: data.description.trim(),
      status: data.status ?? 1,
    });

    return {
      success: true,
      message: "Collection created successfully",
      data: collection,
    };
  } catch (error) {
    console.error("Error creating collection:", error);
    throw error;
  }
};

export const getCollectionsByStore = async (id: number) => {
  try {
    const collections = await Collection.findAll({ where: { store_id: id } });

    return {
      success: true,
      message: "Collections fetched successfully",
      data: collections,
    };
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
};

export const getCollectionById = async (id: number) => {
  try {
    const collection = await Collection.findByPk(id);

    if (!collection) {
      return {
        success: false,
        message: "Collection not found",
      };
    }

    return {
      success: true,
      message: "Collection fetched successfully",
      data: collection,
    };
  } catch (error) {
    //console.error("Error fetching collections:", error);
    return {
      message: error,
    };
  }
};
