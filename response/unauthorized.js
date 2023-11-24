module.exports = (req, res, next) => {
  res.unauthorized = function (message) {
    res.status(401).send({ success: false, message });
  };
  next();
};
