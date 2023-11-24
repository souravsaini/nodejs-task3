const Services = require("../services/index");
const Model = require("../models/index");

module.exports = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts.length !== 2)
      return res.status(401).send({ code: "FAILED", message: "Invalid Token" });
    const userType = parts[0];
    if (userType !== "Bearer") return res.unauthorized("Unauthorized request");
    const token = parts[1];
    Services.JwtService.verify(token, (error, user) => {
      if (error) return res.forbidden("Access Denied");
      const query = { where: { _id: user.id } };
      Model.User.findOne(query).then((user) => {
        if (!user) return res.forbidden("Unauthorized request");
        req.user = user;
        next();
      });
    });
  } else {
    return res.unauthorized("Token Missing");
  }
};
