const jwt = require("jsonwebtoken");
const SECRETKEY = require("../config/config").TOKENSECRET;
const issue = (payload) => {
  return jwt.sign(payload, SECRETKEY, { expiresIn: 60 * 60 * 24 * 7 });
};
const verify = (token, cb) => {
  return jwt.verify(token, SECRETKEY, {}, cb);
};
module.exports = {
  issue: issue,
  verify: verify,
};
