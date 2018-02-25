import cryptoJS from 'crypto-js';
import RSAKey from 'react-native-rsa';
// import cryptico from 'cryptico-js';
// import crypto from 'crypto';
import Neon from '@cityofzion/neon-js';
import { generateSecureRandom } from 'react-native-securerandom';

import { generateUUID } from '@lib/util';

// export class RSAKey {
//   bits = 1024;
//   name = null;
//   passPhrase = null;
//   rsa = null;
//   publicKey = null;
//   publicId = null;

//   constructor(name) {
//     this.name = name;
//   }

//   fromPass = (pass) => {
//     this.passPhrase = pass;

//     this.rsa = cryptico.generateRSAKey(this.passPhrase, this.bits);
//     this.publicKey = cryptico.publicKeyString(this.rsa);
//     this.publicId = cryptico.publicKeyID(this.publicKey);
//   }

//   random = () => {
//     if (this.rsa !== null) {
//       return;
//     }
//     this.fromPass(generateUUID());
//   }
// }

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

  return Neon.u.str2hexstring(key.RSAGetPublicString());
};

export const encryptWithRSA = (rsaKey, message) => rsaKey.encrypt(message);

export const decryptWithRSA = (rsaKey, message) => rsaKey.decrypt(message);

export const encryptWithPass = (passphrase, message) => {
  const rsaKey = createRSAKey(passphrase);
  
  return encryptWithRSA(rsaKey, message);
};

export const decryptWithPass = (passphrase, message) => {
  const rsaKey = createRSAKey(passphrase);
  return decryptWithRSA(rsaKey, message);
};

// export const createRSAKey = () => {
//   const key = new RSAKey();
//   const bits = 1024;
//   const exponent = '10001';
//   key.generate(bits, exponent);

//   return key;
// };

// export const restoreRSAKey = (passphrase) => {
//   const key = new RSAKey();
//   key.fromPass(passphrase);

//   return key;
// };

// export const dectrypWithKey = (key, message) => cryptico.decrypt(message, key.rsa).plaintext;

// export const dectrypWithPass = (passphrase, message) => {
//   const key = restoreRSAKey(passphrase);

//   return dectrypWithKey(key, message);
// };

// export const encryptWithPublicKey = (publicKey, message) => cryptico.encrypt(message, publicKey);
// export const encryptWithKey = (key, message) => {
//   const publicKey = cryptico.publicKeyString(key.rsa);
//   cryptico.encrypt(message, publicKey);
// };
// export const encryptWithPass = (passphrase, message) => {
//   const key = restoreRSAKey(passphrase);

//   return encryptWithKey(key, message);
// };
