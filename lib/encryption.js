const crypto = require('crypto');
const algorithm = 'aes-256-cbc';

module.exports = secret => ({

  encrypt: data => {
    const text = JSON.stringify(data);
    const cipher = crypto.createCipher(algorithm, secret);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  },

  decrypt: text => {
    const decipher = crypto.createDecipher(algorithm, secret);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return JSON.parse(dec);
  }

});
