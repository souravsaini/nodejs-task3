const encrypt = require("bcrypt");
const Model = require("../models/index");
const Services = require("../services/index");
const catchAsync = require("../utils/catchAsync");

module.exports = {
  signUp: catchAsync(async (req, res, next) => {
    let { email, password } = req.body;

    const user = await Model.User.findOne({
      where: { email },
      attributes: ["email"],
    });
    if (user) return res.badRequest("User already exists");

    //hashing password
    encrypt.genSalt(10, async (error, salt) => {
      if (error) next(error);
      encrypt.hash(password, salt, async (error, hash) => {
        if (error) next(error);
        try {
          password = hash;

          await Model.User.create({
            email,
            password,
          });

          res.ok("Registration successful", null);
        } catch (err) {
          next(err);
        }
      });
    });
  }),

  signIn: catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      const requiredParams = ["email", "password"]; // List of required parameters

      // Check if all required parameters are present
      const missingParams = requiredParams.filter((param) => !req.body[param]);
      return res.badRequest(
        `Missing required parameters: ${missingParams.join(", ")}`
      );
    }

    let user = await Model.User.findOne({ where: { email } });
    if (!user) return res.fail("User does not exists");
    user.comparePassword(password, (match) => {
      if (match) {
        const token = "Bearer " + Services.JwtService.issue({ id: user._id });
        user = { ...user.dataValues, token };

        return res.ok("Login successful", user);
      } else {
        return res.fail("Invalid Credentials");
      }
    });
  }),
};
