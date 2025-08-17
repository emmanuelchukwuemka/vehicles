"use strict";
// src/modules/auth/auth.helpers.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByAuthId = void 0;
const user_models_1 = __importDefault(require("../user/user.models"));
const getUserByAuthId = async (authUserId) => {
    try {
        const user = await user_models_1.default.findOne({
            //attributes: ["id", "first_name", "last_name", "email", "phone", "phone", "city_id"],
            where: { id: authUserId },
        });
        return user ? user.get({ plain: true }) : null;
    }
    catch (error) {
        console.error("Error fetching user by authId:", error);
        return null;
    }
};
exports.getUserByAuthId = getUserByAuthId;
