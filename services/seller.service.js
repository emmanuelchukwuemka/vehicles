const { pool } = require("../connection/db");
const { hashPassword, comparePasswords } = require("../helpers/hasher");
require('dotenv').config();
const { v4: uuid } = require("uuid")
const axios = require('axios');
const { find_single_txn } = require("../helpers/executors");

module.exports.create_seller = async (userData) => {

    let connection;

    try {
        // Get a connection from the pool
        connection = await pool.getConnection();

        // Begin a transaction
        await connection.beginTransaction();

        try {
            // Hash the provided access
            const hashedAccess = await hashPassword(userData.access);

            // Hash the provided pin
            const hashedPin = await hashPassword('');

            // Extract access property from userData to avoid it being part of dynamic columns
            const {
                name,
                slogan,
                country,
            } = req.body;

            if (!name) {

                return {
                    success: false,
                    error: "Company name is required"
                }
            }

            const mergedData = {
                _name: name,
                _slogan: slogan,
                _country: country,
                _abilities: "",
                _netWorth: 65845225,
                _logo: "image",
                _category: category,
                _staffCount: 156,
                _address: address,
                _code: uuid(),
                _isVerified: 1,
                _status: 1
            };

            // Generate dynamic column names and values
            const columns = Object.keys(mergedData).join(', ');
            const placeholders = Array(Object.keys(mergedData).length).fill('?').join(', ');
            const values = Object.values(mergedData);

            // Insert the new user into the database
            const result = await connection.query(`
                INSERT INTO users (${columns}, _date)
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
        }
    } catch (error) {
        console.error('Error getting connection from the pool:', error);
        return {
            success: false,
            error: "Unknown error has occurred, please try again"
        };
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports.add_product = async (req) => {

    const { sId, sCharge, sStatus } = req.body

    if (!sId) {

        return {
            success: false,
            error: "Parameters are not complete"
        }
    }

    let connection;

    try {
        // Get a connection from the pool
        connection = await pool.getConnection();

        // Begin a transaction
        await connection.beginTransaction();

        try {

            const encS_Id = encryptStaticFunction(sId.trim().toLowerCase(), retrievedKeyBuffer)

            // Prepare merged data with encrypted fields
            const mergedData = {
                _serviceId: encS_Id,
                _charge: JSON.stringify(encryptData(sCharge, secretKey)),
                _status: JSON.stringify(encryptData(sStatus, secretKey))
            };

            // Generate dynamic column names and values
            const columns = Object.keys(mergedData).join(', ');

            const placeholders = Array(Object.keys(mergedData).length).fill('?').join(', ');

            const values = Object.values(mergedData);

            // Insert the new user into the database
            const [{ affectedRows }] = await connection.query(`
                INSERT INTO z_charges (${columns}, _date)
                VALUES (${placeholders}, NOW())
            `, [...values]);

            if (affectedRows > 0) {

                console.log("inserted==>", affectedRows)

                await connection.commit();
                // Return the inserted user
                return {
                    success: true
                }

            } else {
                // Rollback the transaction if the query was not successful
                await connection.rollback();

                // Return an indication of failure
                return {
                    success: false,
                    message: 'Failed to insert data into the database',
                };
            }

        } catch (error) {
            // Rollback the transaction if an error occurs during the transaction
            await connection.rollback();
            console.error('Error adding service user:', error);
            // Return a falsy value to indicate an error occurred
            return null;
        }
    } catch (error) {
        // Handle error
        console.error('Error getting connection from the pool:', error);
        throw new Error('Error getting connection from the pool');
    } finally {
        // Release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};