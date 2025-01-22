const { comparePasswords, decryptUserData, decryptStaticFunction, encryptData } = require("./hasher");
require('dotenv').config();
const jwt = require('jsonwebtoken');
// Access the secret key
const secretKey = process.env.SECRET_KEY;

const encryptionKey = process.env.KEY_FOR_STATIC_ENCRYPTION
const retrievedKeyBuffer = Buffer.from(encryptionKey, 'hex');


module.exports.reloadController = async (res, response) => {

    //const expiration = Math.floor(Date.now() / 1000) + (60 * 60);// 1 hour
    const expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7); // 7 days

    const accessToken = jwt.sign({ ...response.data, exp: expiration }, process.env.JWT_SECRET);

    const firstName = response.data._firstName
    const lastName = response.data._lastName
    const wallet = parseFloat(response.data._wallet)
    const phone = response.data._phone
    const email = response.data._email
    const isVerified = parseInt(response.data._isVerified)


    return res.status(200).json({
        success: true,
        firstName,
        lastName,
        wallet,
        phone,
        email,
        isVerified,
        token: accessToken
    });

}