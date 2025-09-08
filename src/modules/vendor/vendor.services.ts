import { Vendor } from "./vendor.models";
import { User } from "../user/user.models";
import { CreateVendorInput } from "./vendor.validations";
import { SuspendVendorInput } from "./vendor.types";

export const createVendor = async (data: CreateVendorInput) => {
  const { user_id } = data;

  // Check if user exists
  const user = await User.findByPk(user_id);
  if (!user) {
    return {
      success: false,
      statusCode: 404,
      message: "User not found",
    };
  }

  // Check if user is already a vendor
  const existingVendor = await Vendor.findOne({ where: { user_id } });
  if (existingVendor) {
    return {
      success: false,
      statusCode: 400,
      message: "User is already a vendor",
    };
  }

  // Create the vendor
  const vendor = await Vendor.create({ user_id, status: 1 });

  return {
    success: true,
    statusCode: 201,
    message: "Vendor created successfully",
    data: vendor,
  };
};

export const suspendVendor = async (data: SuspendVendorInput) => {
  const { status, vendorId } = data;
  // Check if vendor exists
  const vendor = await Vendor.findByPk(vendorId);
  if (!vendor) {
    return {
      success: false,
      statusCode: 404,
      message: "Vendor not found",
    };
  }

  // Suspend vendor
  vendor.status = status;
  await vendor.save();

  return {
    success: true,
    statusCode: 200,
    message:
      status === 0
        ? "Vendor suspended successfully"
        : "Vendor reactivated successfully",
    data: vendor,
  };
};
