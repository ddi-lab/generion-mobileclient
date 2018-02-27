import cryptoJS from 'crypto-js';
import RSAKey from 'react-native-rsa';
import Neon from '@cityofzion/neon-js';
import { generateSecureRandom } from 'react-native-securerandom';


const base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const btoa = (input = '')  => {
  let str = input;
  let output = '';

  for (let block = 0, charCode, i = 0, map = base64chars;
  str.charAt(i | 0) || (map = '=', i % 1);
  output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

    charCode = str.charCodeAt(i += 3/4);

    if (charCode > 0xFF) {
      throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
    }

    block = block << 8 | charCode;
  }

  return output;
};

const atob = (input = '') => {
  let str = input.replace(/=+$/, '');
  let output = '';

  if (str.length % 4 == 1) {
    throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
  }
  for (let bc = 0, bs = 0, buffer, i = 0;
    buffer = str.charAt(i++);

    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
      bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
    buffer = base64chars.indexOf(buffer);
  }

  return output;
};

export const randomKey = async (q = 128) => {
  const randomBytes = await generateSecureRandom(q);

  return Neon.u.ab2hexstring(randomBytes);
};

export const encryptAES = (secret, message) => {
  return cryptoJS.AES.encrypt(message, secret).toString();
};

export const decryptAES = (secret, message) => {
  return cryptoJS.AES.decrypt(message, secret).toString(cryptoJS.enc.Utf8);
};


export const createRSAKey = async (passphrase = null, bits = 2048) => {
  const rsa = new RSAKey();
  rsa.generate(bits, '10001');

  return rsa;
};

export const createRSAKeyFromPrivateKey = async (privateKey) => {
  const rsa = new RSAKey();
  rsa.setPrivateString(privateKey);

  return rsa;
};

export const getRSAPublicKeyFromPass = (passphrase) => {
  const key = createRSAKey(passphrase);

  return Neon.u.str2hexstring(key.getPublicString());
};

export const encryptWithRSA = (rsaKey, message) => rsaKey.encrypt(message);

export const encryptWithPublicKey = (publicKey, message) => {
  const key = atob(publicKey);
  const rsaKey = new RSAKey();
  rsaKey.setPublicString(key);

  return encryptWithRSA(rsaKey, message);
};

export const getPublicKeyFromRsa = (rsaKey) => btoa(rsaKey.getPublicString());

export const decryptWithRSA = (rsaKey, message) => rsaKey.decrypt(message);

export const encryptWithPass = (passphrase, message) => {
  const rsaKey = createRSAKey(passphrase);
  return encryptWithRSA(rsaKey, message);
};

export const decryptWithPass = (passphrase, message) => {
  const rsaKey = createRSAKey(passphrase);
  return decryptWithRSA(rsaKey, message);
};
