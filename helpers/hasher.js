const crypto = require('crypto');
const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.hashPassword = async (password) => {
    try {

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        return hashedPassword;

    } catch (error) {
        throw new Error('Error hashing password');
    }
};

exports.comparePasswords = async (inputPassword, hashedPassword) => {
    try {

        const match = await bcrypt.compare(inputPassword.trim(), hashedPassword.trim());

        return match;

    } catch (error) {
        //console.error('Error comparing passwords:', error);
        throw new Error('Error comparing passwords');
    }
};