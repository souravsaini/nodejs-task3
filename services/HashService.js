const Hash = require("cryptr");
const hash = new Hash("mySecretKeyFor___-%!%");
const encryption = (text) => {
  return hash.encrypt(text);
};

const decryption = (text) => {
  return hash.decrypt(text);
};
module.exports = {
  encrypt: encryption,
  decrypt: decryption,
};
