import crypto from 'crypto';

function getHashedPassword(password: string, salt?: string): string {
  const saltLength = 16;
  const iterations = 10000;
  const keyLength = 64;
  const digest = 'sha512';

  salt = salt || crypto.randomBytes(saltLength).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, keyLength, digest)
    .toString('hex');
  return `${salt}:${hash}`;
}

function invalidatePassword(inputPassword: string, storedHash: string) {
  const [salt, originalHash] = storedHash.split(':');
  const hashed = getHashedPassword(inputPassword, salt);
  return hashed === originalHash;
}

export { getHashedPassword, invalidatePassword };
