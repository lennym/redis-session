const crypto = require('crypto');
const ALGORITHM = 'aes-256-cbc';
const IV_SIZE_BYTES = 16;
const KEY_SIZE_BYTES = 32;

module.exports = settings => {
  if (!settings.key || Buffer.byteLength(settings.key) !== KEY_SIZE_BYTES) {
    throw new Error(`Invalid encryption key`);
  }

  if (!settings.iv || Buffer.byteLength(settings.iv) !== IV_SIZE_BYTES) {
    throw new Error(`Invalid encryption iv`);
  }

  return {
    encrypt: data => {
      const json = JSON.stringify(data);
      const cipher = crypto.createCipheriv(ALGORITHM, settings.key, settings.iv);
      return cipher.update(json, 'utf8', 'hex') + cipher.final('hex');
    },

    decrypt: ciphertext => {
      const decipher = crypto.createDecipheriv(ALGORITHM, settings.key, settings.iv);
      const decrypted = decipher.update(ciphertext, 'hex', 'utf8') + decipher.final('utf8');
      return JSON.parse(decrypted);
    }
  };
};
