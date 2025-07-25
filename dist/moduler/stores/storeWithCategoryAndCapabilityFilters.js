"use strict";
const { getStoreIdsByCapabilities } = require("../capability/getStoreIdsByCapabilities");
const { getStoresByCategories } = require("./getStoresByCategories");
const { getStoresByIds } = require("./storeQueries");
module.exports.getStoresWithFilters = async (pool, filters) => {
    // Start with empty set (will get all stores if no filters)
    let filteredStoreIds = null;
    // Apply category filter if provided
    if (filters?.categoryLevel && filters?.categoryId) {
        filteredStoreIds = await getStoresByCategories(pool, filters.categoryLevel, filters.categoryId);
    }
    // Apply capability filter if provided
    if (filters.capabilityIds?.length) {
        console.log(filters);
        const capabilityStoreIds = await getStoreIdsByCapabilities(pool, filters.capabilityIds);
        // If we already had category filter, intersect the results
        filteredStoreIds = filteredStoreIds
            ? filteredStoreIds.filter(id => capabilityStoreIds.includes(id))
            : capabilityStoreIds;
    }
    const fields = [
        'id',
        'code',
        'name',
        'logo',
        'net_worth',
        'floor_space',
        'staff_count',
        'is_verified',
        'created_at',
        'status'
    ];
    // Get the final store details
    return getStoresByIds(pool, filteredStoreIds, fields);
};
