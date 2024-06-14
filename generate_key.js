const crypto = require('crypto');

// Generate a 32-byte random string and encode it in base64
const secret = crypto.randomBytes(32).toString('base64');

console.log(`JWT Secret: ${secret}`);
