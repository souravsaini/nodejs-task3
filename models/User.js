const { Sequelize } = require("sequelize");
const encrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      _id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      defaultScope: {
        attributes: {
          exclude: ["password"],
        },
      },
    }
  );

  User.prototype.comparePassword = function (user, password, cb) {
    encrypt.compare(password, user.password, function (error, match) {
      if (error) return cb(false);
      if (match) return cb(true);
      cb(false);
    });
  };

  return User;
};
