const { decryptUserData } = require("./hasher");
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Access the secret key
const secretKey = process.env.SECRET_KEY;
const encryptionKey = process.env.KEY_FOR_STATIC_ENCRYPTION
const retrievedKeyBuffer = Buffer.from(encryptionKey, 'hex');

module.exports.reloadService = async (req, connection) => {

    const jwtData = req.user

    const [[updatedUserData]] = await connection.query(
        'SELECT * FROM users WHERE email = ? AND userTag = ?',
        [jwtData.email, jwtData.userTag]
    );

    // Check if the user was found
    if (updatedUserData && updatedUserData.id) {

        const realDevice = decryptUserData(updatedUserData.deviceCode, secretKey);
        const jwtDevice = decryptUserData(jwtData.deviceCode, secretKey);

        if (realDevice === jwtDevice) {

            return {
                success: true,
                data: updatedUserData
            }
        }

        return {
            success: false,
            error: "Authorized account access"
        };

    }

    await connection.rollback();
    return {
        success: false,
        error: "Could not retrieve this record"
    };

}