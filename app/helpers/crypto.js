const CryptoJS = require("crypto-js");

async function encrypt(string) {
  return CryptoJS.AES.encrypt(
    string,
    CryptoJS.enc.Base64.parse(process.env.CRYPTO_KEY),
    {
      iv: CryptoJS.enc.Base64.parse(process.env.CRYPTO_IV),
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  ).toString();
}

async function decrypt(string) {
  var bytes = CryptoJS.AES.decrypt(
    string,
    CryptoJS.enc.Base64.parse(process.env.CRYPTO_KEY),
    {
      iv: CryptoJS.enc.Base64.parse(process.env.CRYPTO_IV),
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {
  encrypt,
  decrypt,
};
