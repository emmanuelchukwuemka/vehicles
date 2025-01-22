const { json } = require("body-parser");
const { encryptData, hashPassword } = require("../helpers/hasher.js");
const { pool } = require("./db.js");
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

// Access the secret key
const secretKey = process.env.SECRET_KEY;

exports.loginUser = async (loginData) => {
    try {
        // Retrieve user from the database based on the email
        const [rows, fields] = await pool.query('SELECT * FROM users WHERE email = ?', [loginData.email]);
        const user = rows[0];

        if (user) {

            return user;
        }

        // If no user found or password doesn't match, return null
        return null;
    } catch (error) {
        throw new Error('Error during login', error);
    }
};

exports.registerUser = async (userData) => {
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
            const hashedPin = await hashPassword(userData.pin);

            // Extract access property from userData to avoid it being part of dynamic columns
            const {
                fullName,
                upLineStat,
                upLine,
                userTag,
                bankName,
                acctNumber,
                pushNotice,
                pushEmail,
                hideBalance,
                userImage,
                verifiedMail,
                status,
                phoneNumber,
                //email,
                bal,
                pin,
                access,
                ...userDataWithoutAccess
            } = userData;

            // Prepare merged data with encrypted fields
            const mergedData = {
                ...userDataWithoutAccess,
                fullName: JSON.stringify(encryptData(fullName, secretKey)),
                upLineStat: JSON.stringify(encryptData(upLineStat, secretKey)),
                upLine: JSON.stringify(encryptData(upLine, secretKey)),
                userTag: JSON.stringify(encryptData(userTag, secretKey)),
                bankName: JSON.stringify(encryptData(bankName, secretKey)),
                acctNumber: JSON.stringify(encryptData(acctNumber, secretKey)),
                pushNotice: JSON.stringify(encryptData(pushNotice, secretKey)),
                pushEmail: JSON.stringify(encryptData(pushEmail, secretKey)),
                hideBalance: JSON.stringify(encryptData(hideBalance, secretKey)),
                userImage: JSON.stringify(encryptData(userImage, secretKey)),
                verifiedMail: JSON.stringify(encryptData(verifiedMail, secretKey)),
                status: JSON.stringify(encryptData(status, secretKey)),
                phoneNumber: JSON.stringify(encryptData(phoneNumber, secretKey)),
                //email: JSON.stringify(encryptData(email, secretKey)),
                bal: JSON.stringify(encryptData(bal, secretKey)),
                pin: hashedPin,
                access: hashedAccess
            };

            // Generate dynamic column names and values
            const columns = Object.keys(mergedData).join(', ');
            const placeholders = Array(Object.keys(mergedData).length).fill('?').join(', ');
            const values = Object.values(mergedData);

            // Insert the new user into the database
            const result = await connection.query(`
                INSERT INTO users (${columns}, regDate)
                VALUES (${placeholders}, NOW())
            `, values);

            // Commit the transaction if everything is successful
            await connection.commit();

            // Return the inserted user
            return {
                email: userData.email,
                access: hashedAccess,
            };
        } catch (error) {
            // Rollback the transaction if an error occurs during the transaction
            await connection.rollback();
            console.error('Error registering user:', error);
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


exports.updateData = async (email, dataToUpdate) => {
    try {
        // Get a connection from the pool
        const connection = await pool.getConnection();

        // Begin a transaction
        await connection.beginTransaction();

        try {
            // Log to check if this part is reached
            console.log('Updating user data...', dataToUpdate);

            // Encrypt all the fields in dataToUpdate
            const encryptedData = {};
            for (const [key, value] of Object.entries(dataToUpdate)) {
                encryptedData[key] = JSON.stringify(encryptData(value, secretKey));
            }

            // Generate the SET clause for the SQL query
            const setClause = Object.keys(encryptedData)
                .map(field => `${field} = ?`)
                .join(', ');

            // Generate the values array for the SQL query
            const values = Object.values(encryptedData);

            //return console.log("result==>", result)

            // Update the user's data in the database
            const result = await connection.query(
                `UPDATE users SET ${setClause} WHERE email = ?`,
                [...values, email]
            );

            // Commit the transaction if everything is successful
            await connection.commit();

            //return console.log("result==>", result)

            // Fetch the updated user data
            const [updatedUserData] = await connection.query(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );

            // Log the updated user data
            console.log('Updated user data:', setClause);
            console.log('Updated user value:', encryptedData);

            // Check if the user was found
            if (updatedUserData.length > 0) {
                // Return the updated user data
                return updatedUserData[0];
            } else {
                // If no rows were affected, log and return null to indicate user not found
                console.log('User not found.');
                return null;
            }
        } catch (error) {
            // Log the error details
            console.error('Error updating user data:', error);
            throw error;
        } finally {
            // Release the connection back to the pool
            connection.release();
        }
    } catch (error) {
        // Handle error
        console.error('Error getting connection from the pool:', error);
        throw new Error('Error updating user data');
    }
};


// Example function to perform the transaction
exports.performTransaction = async (updateValue, transactionData) => {
    let connection;

    try {
        // Get a connection from the pool
        connection = await pool.getConnection();

        // Begin a transaction
        await connection.beginTransaction();

        try {
            // Update a value in the database
            await connection.query('UPDATE your_table SET your_column = ? WHERE your_condition', [updateValue]);

            // Insert data into the database
            await connection.query('INSERT INTO your_table SET ?', transactionData);

            // Make an API request
            const apiResponse = await axios.post('your-api-endpoint', transactionData);

            // Check API response
            if (apiResponse.data.success) {
                // Commit the transaction if API call was successful
                await connection.commit();
                console.log('Transaction committed successfully.');
            } else {
                // Rollback the transaction if API call failed
                await connection.rollback();
                console.log('Transaction rolled back due to API failure.');
            }
        } catch (error) {
            // Rollback the transaction if an error occurs
            await connection.rollback();
            console.error('Error during transaction:', error);
        }
    } catch (error) {
        console.error('Error getting connection from the pool:', error);
    } finally {
        // Release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
};

// Example usage
const updateValue = 'your_updated_value';
const transactionData = {
    // Your transaction data here
};

//performTransaction(updateValue, transactionData);


