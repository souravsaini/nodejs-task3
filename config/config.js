const port = process.env.PORT || 5000;
const tokenSecret = process.env.TOKEN_SECRET;
module.exports = {
  port,
  TOKENSECRET: tokenSecret,
};
