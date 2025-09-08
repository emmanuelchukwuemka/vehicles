"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCapability = createCapability;
const capability_models_1 = require("./models/capability.models");
async function createCapability(data) {
    const { name, description } = data;
    // normalize input
    const normalizedName = name.trim().toLowerCase();
    // check if already exists
    const existing = await capability_models_1.Capability.findOne({
        where: { name: normalizedName },
    });
    if (existing) {
        throw new Error("This capability already exists");
    }
    // create capability
    const capability = await capability_models_1.Capability.create({
        name: normalizedName,
        description: description.trim(),
    });
    return capability;
}
