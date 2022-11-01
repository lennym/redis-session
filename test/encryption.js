const assert = require('assert');
const encryption = require('../lib/encryption');

const secret = 'some secret';
const { encrypt, decrypt } = encryption(secret);

describe('encryption', () => {
  it('can encrypt and then decrypt a string', () => {
    const input = 'a boring old string';
    const encrypted = encrypt(input);

    assert.notDeepEqual(input, encrypted, 'the encrypted data should not match the input');
    assert.deepEqual(input, decrypt(encrypted), 'the output should match the input');
  });

  it('can encrypt and then decrypt an array', () => {
    const input = ['foo', 'bar', 'baz'];
    const encrypted = encrypt(input);

    assert.notDeepEqual(input, encrypted, 'the encrypted data should not match the input');
    assert.deepEqual(input, decrypt(encrypted), 'the output should match the input');
  });

  it('can encrypt and then decrypt an object', () => {
    const input = {
      foo: {
        bar: 'baz'
      }
    };

    const encrypted = encrypt(input);

    assert.notDeepEqual(input, encrypted, 'the encrypted data should not match the input');
    assert.deepEqual(input, decrypt(encrypted), 'the output should match the input');
  });
});
