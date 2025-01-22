const { comparePasswords, decryptUserData, decryptStaticFunction, encryptData } = require("./hasher");
require('dotenv').config();
const jwt = require('jsonwebtoken');
// Access the secret key
const secretKey = process.env.SECRET_KEY;

const encryptionKey = process.env.KEY_FOR_STATIC_ENCRYPTION
const retrievedKeyBuffer = Buffer.from(encryptionKey, 'hex');


module.exports.reloadController = async (res, response) => {

    const hasEmptyPin = await comparePasswords('', response.data.pin);

    //const expiration = Math.floor(Date.now() / 1000) + (60 * 60);// 1 hour
    const expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7); // 7 days

    const accessToken = jwt.sign({ ...response.data, exp: expiration }, process.env.JWT_SECRET);

    const newJWT = JSON.stringify(encryptData(accessToken, secretKey))

    //console.log("newJWT==>", newJWT)

    // decrypt and convert data

    const bal = decryptUserData(response.data.bal, secretKey);
    const phoneNumber = decryptUserData(response.data.phoneNumber, secretKey);
    const userEmail = decryptStaticFunction(response.data.email, retrievedKeyBuffer);
    const userTag = decryptStaticFunction(response.data.userTag, retrievedKeyBuffer);
    const upLine = decryptStaticFunction(response.data.upLine, retrievedKeyBuffer);
    const deviceCode = decryptUserData(response.data.deviceCode, secretKey);
    const vaName = decryptUserData(response.data.vaName, secretKey);
    const vaNumber = decryptUserData(response.data.vaNumber, secretKey);
    const bankName = decryptUserData(response.data.bankName, secretKey);
    const acctNumber = decryptUserData(response.data.acctNumber, secretKey);
    const userImage = decryptUserData(response.data.userImage, secretKey);
    const verifiedMail = decryptUserData(response.data.verifiedMail, secretKey);
    const status = decryptUserData(response.data.status, secretKey);
    const pushNotice = decryptUserData(response.data.pushNotice, secretKey);
    const pushEmail = decryptUserData(response.data.pushEmail, secretKey);
    const hideBalance = decryptUserData(response.data.hideBalance, secretKey);
    const fullName = decryptUserData(response.data.fullName, secretKey);
    const upLinePaid = decryptUserData(response.data.upLinePaid, secretKey);
    const canTransact = decryptUserData(response.data.canTransact, secretKey);

    return res.status(200).json({
        success: true,
        userId: response.data.id,
        email: userEmail,
        deviceCode,
        upLinePaid: parseInt(upLinePaid),
        bal: parseFloat(bal),
        phoneNumber,
        upLine,
        userTag,
        vaName,
        vaNumber,
        bankName,
        acctNumber,
        userImage,
        verifiedMail: parseInt(verifiedMail),
        status: parseInt(status),
        pushNotice: parseInt(pushNotice),
        pushEmail: parseInt(pushEmail),
        hideBalance: parseInt(hideBalance),
        fullName,
        hasEmptyPin,
        canTransact: parseInt(canTransact),
        sk: newJWT
    });

}