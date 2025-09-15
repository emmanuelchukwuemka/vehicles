"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreWithScopes = exports.createStore = void 0;
const sequelize_1 = __importDefault(require("../../config/database/sequelize"));
const storecapability_models_1 = require("../capability/models/storecapability.models");
const store_models_1 = require("./models/store.models");
const uuid_1 = require("uuid");
const city_models_1 = __importDefault(require("../city/city.models"));
const vendor_models_1 = require("../vendor/vendor.models");
const subdomain_models_1 = require("../domains/model/subdomain.models");
const capability_models_1 = require("../capability/models/capability.models");
const createStore = async (input) => {
    let transaction = null;
    try {
        transaction = await sequelize_1.default.transaction();
        // -----------------------------------------
        // Check if vendor exists
        // -----------------------------------------
        const vendor = await vendor_models_1.Vendor.findByPk(input.vendor_id, { transaction });
        if (!vendor) {
            return { success: false, message: "Vendor not found" };
        }
        // -----------------------------------------
        // Check if city exists
        // -----------------------------------------
        const city = await city_models_1.default.findByPk(input.city_id, { transaction });
        if (!city) {
            return { success: false, message: "City not found" };
        }
        // -----------------------------------------
        // Check if subdomain exists
        // -----------------------------------------
        const subdomain = await subdomain_models_1.Subdomain.findByPk(input.subdomain_id, {
            transaction,
        });
        if (!subdomain) {
            return { success: false, message: "Subdomain not found" };
        }
        // -----------------------------------------
        // Ensure store uniqueness per city
        // -----------------------------------------
        const existingStore = await store_models_1.Store.findOne({
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
        const storeCode = (0, uuid_1.v4)();
        // -----------------------------------------
        // Create store (metadata stored as JSON)
        // -----------------------------------------
        const store = await store_models_1.Store.create({
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
        }, { transaction });
        // -----------------------------------------
        // If you want some normalized relational data
        // -----------------------------------------
        if (input.metadata?.capabilities?.length) {
            // Step 1: Fetch all valid capabilities from DB
            const validCapabilities = await capability_models_1.Capability.findAll({
                where: { id: input.metadata.capabilities },
                transaction,
            });
            // Step 2: Compare provided IDs vs existing ones
            const validIds = validCapabilities.map((c) => c.id);
            const invalidIds = input.metadata.capabilities.filter((id) => !validIds.includes(id));
            if (invalidIds.length > 0) {
                return {
                    success: false,
                    message: "One or more capability IDs are invalid",
                };
            }
            // Step 3: Insert only if all are valid
            const bulkData = validIds.map((capId) => ({
                store_id: store.id,
                capability_id: capId,
            }));
            await storecapability_models_1.StoreCapability.bulkCreate(bulkData, { transaction });
        }
        await transaction.commit();
        return {
            success: true,
            message: "Store created successfully",
            data: { store_id: store.id, code: storeCode },
        };
    }
    catch (error) {
        if (transaction)
            await transaction.rollback();
        console.log(error);
        return { success: false, message: "Error creating store", error };
    }
};
exports.createStore = createStore;
const getStoreWithScopes = async (storeId) => {
    const store = await store_models_1.Store.findByPk(storeId);
    if (!store) {
        return { success: false, message: "Store not found", statusCode: 404 };
    }
    return {
        success: true,
        message: "Store fetched successfully",
        data: store,
    };
};
exports.getStoreWithScopes = getStoreWithScopes;
