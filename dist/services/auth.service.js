"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { pool } = require("../connection/db");
const { hashPassword, comparePasswords } = require("../helpers/hasher");
require("dotenv").config();
//import { checkVendorByUserId } from "../utility/user/getVendorByUserId";
module.exports.create_account = async (req) => {
    const { firstName, lastName, email, phone, city, password, picture } = req.body;
    if (!firstName || !lastName || !email || !phone || !city || !password) {
        return { success: false, error: "Invalid input" };
    }
    let connection;
    try {
        const hashedPassword = await hashPassword(password);
        connection = await pool.getConnection();
        await connection.beginTransaction();
        const trimmedEmail = email.trim().toLowerCase();
        // Check if the email or phone already exists
        const [existingUser] = await connection.query(`SELECT id FROM users_table WHERE email = ? OR phone = ? LIMIT 1`, [trimmedEmail, phone]);
        if (existingUser.length > 0) {
            await connection.rollback();
            return { success: false, error: "Email or phone number already in use" };
        }
        // Prepare vendor data for insertion
        const vendorData = {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            email: trimmedEmail,
            phone: phone,
            city_id: city,
            picture: picture || null, // Ensure null if no picture provided
            is_verified: 1,
        };
        const columns = Object.keys(vendorData).join(", ");
        const placeholders = Object.keys(vendorData)
            .map(() => "?")
            .join(", ");
        const values = Object.values(vendorData);
        // Insert new user
        const [{ insertId }] = await connection.query(`INSERT INTO users_table (${columns})
             VALUES (${placeholders})`, values);
        if (!insertId) {
            await connection.rollback();
            return { success: false, error: "Failed to create account" };
        }
        // Insert  auth record
        const [{ insertId: userAuthInsert }] = await connection.query(`INSERT INTO auth_table (user_id, email, password)
             VALUES (?, ?, ?)`, [insertId, trimmedEmail, hashedPassword]);
        if (!userAuthInsert) {
            await connection.rollback();
            return { success: false, error: "Failed to account access" };
        }
        await connection.commit();
        return { success: true, data: "Account created successfully" };
    }
    catch (error) {
        await connection.rollback();
        console.error("Error creating account:", error);
        return {
            success: false,
            error: "Could not create account, please try again",
        };
    }
    finally {
        if (connection)
            connection.release();
    }
};
module.exports.login_User = async (req) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return {
            success: false,
            error: "Email and password is required",
        };
    }
    const userEmail = email.trim().toLowerCase();
    try {
        const [[access]] = await pool.query("SELECT id, user_id, email, password, status FROM auth_table WHERE email = ?", [userEmail]);
        if (access && access.id) {
            const passwordMatch = await comparePasswords(password, access.password);
            if (passwordMatch) {
                if (access.status === 1) {
                    const [[userData]] = await pool.query("SELECT * FROM users_table WHERE id = ?", [access.user_id]);
                    if (userData && userData.id) {
                        if (userData.status === 1) {
                            return {
                                success: true,
                                data: userData,
                            };
                        }
                        return {
                            success: false,
                            error: "Inactive account. Please contact the support for more details",
                        };
                    }
                    return {
                        success: false,
                        error: "Unable to resolve account. Please contact the support or try again later",
                    };
                }
                // const vendor = await checkVendorByUserId({
                //   pool,
                //   user_id: userData.id,
                // });
                // if (vendor) {
                //   userData.vendor_id = vendor.id;
                // } else {
                //   console.log("No vendor found for this user.");
                // }
                return {
                    success: false,
                    error: "This account is currently is inactive. Please contact support for more details",
                };
            }
            return {
                success: false,
                error: "Incorrect email or password",
            };
        }
        return {
            success: false,
            error: "Incorrect email or password",
        };
    }
    catch (error) {
        console.error("Error==>", error);
        return {
            success: false,
            error: "Unable to process your request",
        };
    }
};
