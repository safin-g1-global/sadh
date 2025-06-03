// cryptoUtils.js
import CryptoJS from "crypto-js";

const SECRET_KEY =
  "U2FsdGVkX1/2KEwOH+w4QaIcyq5521ZXB5pqwU2FsdGVkX1/w4QaIcyq5521ZXB5pqw2KEwOH+";

export const encryptField = (text: string) => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

export const decryptField = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
