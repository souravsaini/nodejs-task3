module.exports = (req, res, next) => {
  res.deleted = function (message) {
    res.status(204).send({ success: true, message });
  };
  next();
};
