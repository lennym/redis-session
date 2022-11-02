const crypto = require('crypto');
const ALGORITHM = 'aes-256-cbc';
const KEY_SIZE_BYTES = 32;
const IV_SIZE_BYTES = 16;

module.exports = (secret, salt = '') => {
  if (!secret) {
    throw new Error('A session secret is required');
  }

  const key = crypto.scryptSync(secret, salt, KEY_SIZE_BYTES);
  const iv = crypto.scryptSync(secret, salt, IV_SIZE_BYTES);

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
