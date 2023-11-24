const { Sequelize } = require("sequelize");
const Model = require("../models/index");

module.exports = {
  connect: async (cb) => {
    try {
      const sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
          host: process.env.DB_HOST,
          dialect: "mssql",
        }
      );

      await sequelize.authenticate();
      Model.sequelize
        .sync({ alter: true })
        .then(() =>
          console.log("Connection has been established successfully.")
        )
        .catch((err) => console.log(err));

      cb(true);
    } catch (error) {
      console.log("Database not connected: ", error);
      cb(false);
    }
  },

  connectionObj: () => {
    return new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: "mssql",
      }
    );
  },
};
