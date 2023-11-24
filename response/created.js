module.exports = (req, res, next) => {
  res.created = function (message) {
    res.status(201).send({ success: true, message });
  };
  next();
};
