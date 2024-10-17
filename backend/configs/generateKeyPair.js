import crypto from 'crypto';
import fs from 'fs';
import { getPathFromBackend } from '../utils/getPath.js';

// Generate RSA key pair
crypto.generateKeyPair(
  'rsa',
  {
    modulusLength: 2048, // Key size in bits
    publicKeyEncoding: {
      type: 'pkcs1', // "Public Key Cryptography Standards 1"
      format: 'pem', // "Privacy-Enhanced Mail"
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  },
  (err, publicKey, privateKey) => {
    if (err) {
      console.error('Error generating key pair: ', err);
      return;
    }

    fs.appendFileSync(getPathFromBackend('../.env'), '\nJWT_PUBLIC_KEY=' + publicKey);
    fs.appendFileSync(getPathFromBackend('../.env'), '\nJWT_PRIVATE_KEY=' + privateKey);
  },
);