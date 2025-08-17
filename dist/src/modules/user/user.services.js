"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupService = void 0;
const user_models_1 = __importDefault(require("./user.models"));
const signupService = async (data) => {
    try {
        // Prepare the user data for creation
        const userData = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            city_id: data.city_id,
            is_verified: 0,
        };
        // Insert into the database
        const newUser = await user_models_1.default.create(userData);
        return {
            success: true,
            message: "User created successfully",
            data: { id: newUser.id },
        };
    }
    catch (error) {
        console.error("Signup error:", error);
        return {
            success: false,
            message: "User creation failed",
        };
    }
};
exports.signupService = signupService;
