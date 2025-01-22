
module.exports.validateString = (inputString) => {

    // Remove numbers, numerics, special characters, and double spaces
    const strippedString = inputString.replace(/[^a-zA-Z\s]|_/g, '') // Remove numbers, special characters, and numerics
        .replace(/\s+/g, ' ');    // Replace multiple spaces with a single space

    return strippedString.trim().toLowerCase();  // Trim leading and trailing spaces

};

module.exports.numericValidator = (inputString) => {
    // Remove all non-numeric characters and double spaces
    const strippedString = inputString.replace(/[^0-9]/g, '') // Remove non-numeric characters
        .replace(/\s+/g, ' ');    // Replace multiple spaces with a single space

    return strippedString.trim();  // Trim leading and trailing spaces
}