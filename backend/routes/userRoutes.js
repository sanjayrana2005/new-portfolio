const express = require("express");
const { signupUserController, loginController, logOutController, getUserController, updateProfilecontroller } = require("../controller/userController");
const authUser = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/signup",signupUserController);
userRouter.post("/login",loginController);
userRouter.get("/logout",authUser,logOutController);
userRouter.get("/me",authUser,getUserController);
userRouter.post("/update-profile",authUser,updateProfilecontroller);

module.exports = userRouter;