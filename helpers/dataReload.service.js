const { decryptUserData } = require("./hasher");
const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports.reloadService = async (req, connection) => {

    const jwtData = req.user

    const [[updatedUserData]] = await connection.query(
        'SELECT * FROM users WHERE email = ?',
        [jwtData.email]
    );

    // Check if the user was found
    if (updatedUserData && updatedUserData.id) {

        return {
            success: true,
            data: updatedUserData
        }

    }

    await connection.rollback();
    return {
        success: false,
        error: "Could not retrieve this record"
    };

}