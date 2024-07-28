import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('12345678901234567890123456789012'); // 32-byte key
const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16-byte IV

const encrypt = (text) => {
  const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), key, {
    keySize: 256 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
};

const decrypt = (ciphertext) => {
  const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
    keySize: 256 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Utf8.stringify(decrypted);
};

export { encrypt, decrypt };