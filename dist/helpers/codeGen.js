"use strict";
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
exports.generateId = () => {
    return uuidv4();
};
module.exports.generateToken = (length) => {
    const min = 10 ** (length - 1);
    const max = 10 ** length - 1;
    const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomValue.toString();
};
module.exports.generateApiKey = () => {
    // Define the length of the API key (e.g., 32 bytes)
    const apiKeyLength = 35;
    // Generate a random buffer of the specified length
    const buffer = crypto.randomBytes(apiKeyLength / 2);
    // Convert the buffer to a hexadecimal string
    const apiKey = buffer.toString('hex');
    return apiKey;
};
module.exports.formatCurrency = (amount, currency = 'NGN') => {
    const supportedCurrencies = ['NGN', 'USD']; // Add other supported currency codes here
    const fallbackCurrency = 'USD'; // Use USD as a fallback currency code
    // Use the fallback currency code if the provided currency is not supported
    if (!supportedCurrencies.includes(currency)) {
        currency = fallbackCurrency;
    }
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: undefined, // Display all decimal places without rounding
    });
    const formattedPrice = formatter.format(amount);
    return formattedPrice.replace(currency, currency === 'NGN' ? '₦' : '');
};
