const { Op, Sequelize } = require("sequelize");
const Model = require("../models/index");
const catchAsync = require("../utils/catchAsync");

module.exports = {
  addStudent: catchAsync(async (req, res) => {
    const { firstname, lastname, studentId } = req.body;

    if (!firstname || !studentId) {
      const requiredParams = ["firstname", "studentId"]; // List of required parameters

      // Check if all required parameters are present
      const missingParams = requiredParams.filter((param) => !req.body[param]);
      return res.badRequest(
        `Missing required parameters: ${missingParams.join(", ")}`
      );
    }

    const existingStudentId = await Model.Student.findOne({
      where: { studentId },
    });
    if (existingStudentId) return res.badRequest("User already exists");

    const student = await Model.Student.create({
      firstname,
      lastname,
      studentId,
    });

    return res.ok("Student saved successfully", student);
  }),

  getStudents: catchAsync(async (req, res) => {
    const limit = 10; //Limit can be a query param also.
    const cursor = parseInt(req.query.cursor) || 0;

    const { count, rows } = await Model.Student.findAndCountAll({
      where: {},
      order: [["firstname", "ASC"]],
      limit,
      offset: cursor,
    });

    const endIndex = cursor + limit;

    return res.ok("Students fetched successfully", {
      students: rows,
      nextCursor: count > endIndex ? endIndex : null,
    });
  }),

  getStudent: catchAsync(async (req, res) => {
    const studentId = req.params.id;
    const student = await Model.Student.findByPk(studentId);
    if (!student) return res.notFound("User not found");
    return res.ok("Student found successfully", student);
  }),

  editStudent: catchAsync(async (req, res) => {
    const id = req.params.id;
    const student = await Model.Student.findByPk(id);

    if (!student) return res.notFound("User not found");

    const { firstname, lastname, studentId } = req.body;

    if (studentId) {
      const existingStudentId = await Model.Student.findOne({
        where: {
          studentId,
          _id: {
            [Sequelize.Op.ne]: id,
          },
        },
      });
      if (existingStudentId) return res.badRequest("User already exists");
    }

    let updateObj = {};
    if (studentId) updateObj.studentId = studentId;
    if (firstname) updateObj.firstname = firstname;
    if (lastname) updateObj.lastname = lastname;

    const result = await Model.Student.update(updateObj, {
      where: { _id: id },
      plain: true,
      returning: true,
    });

    return res.ok("Student updated successfully", result[1]);
  }),

  deleteStudent: catchAsync(async (req, res) => {
    const id = req.params.id;
    const student = await Model.Student.findByPk(id);

    if (!student) return res.notFound("User not found");

    await Model.Student.destroy({ where: { _id: id } });

    return res.ok("Student deleted successfully", null);
  }),
};
