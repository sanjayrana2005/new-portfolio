const express = require("express");
const { signupUserController } = require("../controller/userController");

const userRouter = express.Router();

userRouter.post("/signup",signupUserController);

module.exports = userRouter;