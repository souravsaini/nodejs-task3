const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
    {
      _id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      studentId: {
        type: DataTypes.STRING,
        allowNull: false, //there is no unique constraint available (unique: true) for MSSQL, however it is available for postgresql
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      defaultScope: {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    }
  );

  return Student;
};
