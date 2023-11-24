var Routes = require("./index");
var express = require("express");
var router = express.Router();

router.use("/auth", Routes.AuthRoutes);
router.use("/user", Routes.UserRoutes);

module.exports = router;
