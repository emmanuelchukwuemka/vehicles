const { pool } = require("../connection/db");
const { hashPassword, comparePasswords, } = require("../helpers/hasher");
require('dotenv').config();
const { v4: uuid } = require("uuid")
const axios = require('axios');
const { reloadService } = require("../helpers/dataReload.service");


module.exports.create_user = async (req) => {

    const {
        firstName,
        lastName,
        phone,
        email,
        access,
    } = req.body;

    if (!firstName || !lastName || !phone || !email || !access) {

        return {
            success: false,
            error: "One or more required input is still empty. Check your inputs in try again"
        }
    }

    const userEmail = email.trim().toLowerCase();
    const hashedAccess = await hashPassword(access);
    const hashedPin = await hashPassword('');

    let connection;

    try {

        const mergedData = {
            _firstName: firstName,
            _lastName: lastName,
            _phone: phone,
            _email: userEmail,
            _picture: "",
            _isVerified: 0,
            _status: 1,
            _wallet: 0,
            _access: hashedAccess,
            _pin: hashedPin
        };

        connection = await pool.getConnection();
        await connection.beginTransaction();

        // Generate dynamic column names and values
        const columns = Object.keys(mergedData).join(', ');
        const placeholders = Array(Object.keys(mergedData).length).fill('?').join(', ');
        const values = Object.values(mergedData);

        // Insert the new user into the database
        const result = await connection.query(`
            INSERT INTO users_table (${columns}, _date)
            VALUES (${placeholders}, NOW())
        `, values);

        console.log("result==>", result)

        await connection.commit();

        return {
            success: true,
        };

    } catch (error) {
        await connection.rollback();
        console.error('Error registering user:', error);
        return {
            success: false,
            error: "Could not create new seller, please try again"
        };
    } finally {
        if (connection) {
            connection.release();
        }
    }

};

module.exports.login_User = async (req) => {

    const { email, access } = req.body;

    const userEmail = email.trim().toLowerCase();

    try {
        const [[userData]] = await pool.query('SELECT * FROM users WHERE email = ?', [userEmail]);

        if (userData && userData.id) {

            const passwordMatch = await comparePasswords(access, userData.access);

            if (passwordMatch) {

                return {
                    success: true,
                    data: userData
                };
            }

            return {
                success: false,
                error: "Incorrect email or password"
            }

        }

        return {
            success: false,
            error: "Incorrect email or password"
        };

    } catch (error) {

        console.log("Error==>", error)

        throw new Error('Error during login', error);
    }
};