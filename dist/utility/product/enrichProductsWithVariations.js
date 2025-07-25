"use strict";
const { getVariationAttributes } = require("./getProductAttributes");
const { getProductVariations } = require("./getProductVariations");
module.exports.enrichProductsWithVariations = async (pool, productIds) => {
    const variations = await getProductVariations(pool, productIds);
    const variationIds = variations.map((v) => v.id);
    const attributesList = await Promise.all(variationIds.map(async (variationId) => {
        const attrs = await getVariationAttributes(pool, variationId);
        return { variationId, attributes: attrs };
    }));
    const attrMap = {};
    for (const { variationId, attributes } of attributesList) {
        attrMap[variationId] = attributes;
    }
    const variationMap = {};
    for (const v of variations) {
        const pId = v.product_id;
        const enriched = {
            ...v,
            attributes: attrMap[v.id] || [],
        };
        if (!variationMap[pId])
            variationMap[pId] = [];
        variationMap[pId].push(enriched);
    }
    return variationMap;
};
