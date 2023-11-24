const express = require("express");
const Controller = require("../controllers/index");
const router = express.Router();

router.post("/signup", Controller.AuthController.signUp);
router.post("/signin", Controller.AuthController.signIn);

module.exports = router;
