const crypto = require('crypto');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports.hashPassword = async (password) => {
    try {

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        return hashedPassword;

    } catch (error) {
        throw new Error('Error hashing password');
    }
};

module.exports.comparePasswords = async (inputPassword, hashedPassword) => {
    try {

        const match = await bcrypt.compare(inputPassword.trim(), hashedPassword.trim());

        return match;

    } catch (error) {
        //console.error('Error comparing passwords:', error);
        throw new Error('Error comparing passwords');
    }
};

module.exports.dynamicEncrypt = (word, key) => {
    const algorithm = 'aes-256-cbc';
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    const encrypted = Buffer.concat([cipher.update(word.toString()), cipher.final()]);

    return {
        _s: iv.toString('hex'),
        _d: encrypted.toString('hex'),
        //secretKey: key
    };
};

module.exports.decryptData = (encryptedData, iv, sk) => {
    const algorithm = 'aes-256-cbc';
    const key = Buffer.from(sk, 'hex'); // Use Buffer.from to convert the hex string to a buffer

    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedData, 'hex')), decipher.final()]);

    return decrypted.toString();
};

module.exports.dynamicDecrypt = (encryptedData, secretKey) => {
    if (typeof encryptedData !== 'string') {
        throw new Error('Invalid input: encryptedData must be a string.');
    }
    if (typeof secretKey !== 'string' || secretKey.trim() === '') {
        throw new Error('Invalid input: secretKey must be a non-empty string.');
    }

    let parsedData;
    try {
        // Parse JSON safely
        parsedData = JSON.parse(encryptedData.replace(/'/g, ''));
    } catch (error) {
        throw new Error('Failed to parse encryptedData. Ensure it is valid JSON.');
    }

    const { _d, _s } = parsedData;

    if (!_d || !_s) {
        throw new Error('Invalid encryptedData format: Missing required fields _d and/or _s.');
    }

    try {
        // Attempt decryption
        return exports.decryptData(_d, _s, secretKey);
    } catch (error) {
        // Catch and rethrow decryption errors
        throw new Error(`Decryption failed: ${error.message}`);
    }
};

module.exports.staticEncrypt = (data, key) => {
    const iv = Buffer.alloc(16, 0); // Create a fixed IV of all zeros
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

module.exports.staticDecrypt = (data, key) => {
    const iv = Buffer.alloc(16, 0); // Create a fixed IV of all zeros
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports.generateProductSKU = (product) => {
    if (!product || !product.subcategory_id || !product.name) {
        throw new Error("Missing required fields for p_SKU");
    }

    const subCategoryId = product.subcategory_id; // Get sub-category ID
    let productCode = product.name.replace(/\s+/g, '').substring(0, 6).toUpperCase(); // First 6 chars of name
    productCode = productCode.replace(/[^A-Z0-9]/g, ''); // Remove special characters like '

    const uniqueID = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number for uniqueness

    return `${subCategoryId}-${productCode}-${uniqueID}`;
};

module.exports.generateVariationSKU = (product, variation) => {
    if (!product || !product.subcategory_id || !product.name || !variation.attributes) {
        throw new Error("Missing required fields for v_SKU");
    }

    const subCategoryId = product.subcategory_id; // Get sub-category ID

    let productCode = product.name.replace(/\s+/g, '').substring(0, 6).toUpperCase(); // First 6 chars of name
    productCode = productCode.replace(/[^A-Z0-9]/g, ''); // Remove special characters

    // Extract attribute values dynamically
    let attrCodes = variation.attributes
        .map(attr => attr.value.substring(0, 3).toUpperCase().replace(/[^A-Z0-9]/g, '')) // Take first 3 chars of each attribute value
        .join('-'); // Join with '-'

    const uniqueID = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number for uniqueness

    return `${subCategoryId}-${productCode}-${attrCodes}-${uniqueID}`;
};


