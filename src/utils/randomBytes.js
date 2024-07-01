const crypto = require('crypto'); // Import the crypto module
const randomBytes= (length) => {
    return crypto.randomBytes(length).toString('hex');
    }
module.exports = randomBytes; // Export the function randomBytes