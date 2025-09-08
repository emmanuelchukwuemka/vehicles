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
const scope_models_1 = __importDefault(require("./models/scope.models"));
const createStore = async (input) => {
    let transaction = null;
    try {
        transaction = await sequelize_1.default.transaction();
        // Check if vendor exists
        const vendor = await vendor_models_1.Vendor.findByPk(input.vendor_id, { transaction });
        if (!vendor) {
            return { success: false, message: "Vendor not found" };
        }
        // Check if city exists
        const city = await city_models_1.default.findByPk(input.city_id, { transaction });
        if (!city) {
            return { success: false, message: "City not found" };
        }
        // Check if a store with the same name exists in the same city
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
        // Create store
        const store = await store_models_1.Store.create({
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
        }, { transaction });
        // Add store capabilities
        if (input.capabilities?.length) {
            const bulkData = input.capabilities.map((capId) => ({
                store_id: store.id,
                capability_id: capId,
            }));
            await storecapability_models_1.StoreCapability.bulkCreate(bulkData, { transaction });
        }
        // Add store scope
        if (input.scope) {
            await scope_models_1.default.create({
                store_id: store.id,
                scope: input.scope, // "seller" or "manufacturer"
            }, { transaction });
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
        return { success: false, message: "Error creating store", error };
    }
};
exports.createStore = createStore;
const getStoreWithScopes = async (storeId) => {
    const store = await store_models_1.Store.findByPk(storeId, {
        include: [
            {
                model: scope_models_1.default,
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
exports.getStoreWithScopes = getStoreWithScopes;
