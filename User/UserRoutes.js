const express = require("express");
const userController = require("./UserController");

const router = express.Router();
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser)

module.exports = router;