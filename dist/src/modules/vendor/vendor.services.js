"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suspendVendor = exports.createVendor = void 0;
const vendor_models_1 = require("./vendor.models");
const user_models_1 = require("../user/user.models");
const createVendor = async (data) => {
    const { user_id } = data;
    const user = await user_models_1.User.findByPk(user_id);
    if (!user) {
        return {
            success: false,
            statusCode: 404,
            message: "User not found",
        };
    }
    const existingVendor = await vendor_models_1.Vendor.findOne({ where: { user_id } });
    if (existingVendor) {
        return {
            success: false,
            statusCode: 400,
            message: "User is already a vendor",
        };
    }
    const vendor = await vendor_models_1.Vendor.create({ user_id, status: 1 });
    return {
        success: true,
        statusCode: 201,
        message: "Vendor created successfully",
        data: vendor,
    };
};
exports.createVendor = createVendor;
const suspendVendor = async (data) => {
    const { status, vendorId } = data;
    const vendor = await vendor_models_1.Vendor.findByPk(vendorId);
    if (!vendor) {
        return {
            success: false,
            statusCode: 404,
            message: "Vendor not found",
        };
    }
    vendor.status = status;
    await vendor.save();
    return {
        success: true,
        statusCode: 200,
        message: status === 0
            ? "Vendor suspended successfully"
            : "Vendor reactivated successfully",
        data: vendor,
    };
};
exports.suspendVendor = suspendVendor;
