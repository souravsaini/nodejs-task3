const express = require("express");
const Controller = require("../controllers/index");
const Authentication = require("../policy/index");
const router = express.Router();

router
  .route("/students")
  .post(Authentication.UserAuth, Controller.UserController.addStudent)
  .get(Authentication.UserAuth, Controller.UserController.getStudents);

router
  .route("/students/:id")
  .put(Authentication.UserAuth, Controller.UserController.editStudent)
  .get(Authentication.UserAuth, Controller.UserController.getStudent)
  .delete(Authentication.UserAuth, Controller.UserController.deleteStudent);

module.exports = router;
