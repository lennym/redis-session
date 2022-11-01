const crypto = require('crypto');
const ALGORITHM = 'aes-256-cbc';
const IV_SIZE_BYTES = 16;
const KEY_SIZE_BYTES = 32;

module.exports = secret => {
  const iv = crypto.randomBytes(IV_SIZE_BYTES);

  // key size for aes-256-cbc must be 32 bytes, pad with random bytes when necessary
  const key = Buffer.concat([Buffer.from(secret), crypto.randomBytes(KEY_SIZE_BYTES)], KEY_SIZE_BYTES);

  return {
    encrypt: data => {
      const json = JSON.stringify(data);
      const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
      return cipher.update(json, 'utf8', 'hex') + cipher.final('hex');
    },

    decrypt: ciphertext => {
      const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
      const decrypted = decipher.update(ciphertext, 'hex', 'utf8') + decipher.final('utf8');
      return JSON.parse(decrypted);
    }
  };
};
