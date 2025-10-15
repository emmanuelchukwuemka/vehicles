"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollectionById = exports.getCollectionsByStore = exports.createCollection = void 0;
const store_models_1 = require("../../store/models/store.models");
const collection_models_1 = require("./collection.models");
const sequelize_1 = require("sequelize");
const createCollection = async (data) => {
    try {
        const store = await store_models_1.Store.findByPk(data.store_id);
        if (!store) {
            return { success: false, message: "Store not found" };
        }
        const existing = await collection_models_1.Collection.findOne({
            where: {
                store_id: data.store_id,
                [sequelize_1.Op.and]: (0, sequelize_1.where)((0, sequelize_1.fn)("LOWER", (0, sequelize_1.col)("name")), data.name.toLowerCase()),
            },
        });
        if (existing) {
            return {
                success: false,
                message: `Collection with name (${data.name}) already exists for this store`,
            };
        }
        const collection = await collection_models_1.Collection.create({
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
    }
    catch (error) {
        console.error("Error creating collection:", error);
        throw error;
    }
};
exports.createCollection = createCollection;
const getCollectionsByStore = async (id) => {
    try {
        const collections = await collection_models_1.Collection.findAll({ where: { store_id: id } });
        return {
            success: true,
            message: "Collections fetched successfully",
            data: collections,
        };
    }
    catch (error) {
        console.error("Error fetching collections:", error);
        throw error;
    }
};
exports.getCollectionsByStore = getCollectionsByStore;
const getCollectionById = async (id) => {
    try {
        const collection = await collection_models_1.Collection.findByPk(id);
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
    }
    catch (error) {
        return {
            message: error,
        };
    }
};
exports.getCollectionById = getCollectionById;
