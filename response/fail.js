module.exports = (req, res, next) => {
  res.fail = function (message) {
    res.status(200).send({ success: false, message });
  };
  next();
};
