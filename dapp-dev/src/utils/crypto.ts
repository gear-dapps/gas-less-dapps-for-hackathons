import crypto from 'crypto';

const algorithm = 'aes-256-cbc';

function getKey(password: string) {
  return crypto.createHash('sha256').update(password).digest('base64').substring(0, 32);
}

export function encryptData(password: string, data: string) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, getKey(password), iv);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encrypted: encrypted.toString('hex') };
}

export function decryptData(password: string, dataHex: string, ivHex: string) {
  const iv = Buffer.from(ivHex, 'hex');
  const encrypted = Buffer.from(dataHex, 'hex');

  const decipher = crypto.createDecipheriv(algorithm, getKey(password), iv);
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}
