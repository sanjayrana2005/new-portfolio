const express = require("express");
const { signupUserController, loginController, logOutController, getUserController, updateProfilecontroller, updatePasswordController, getUserForPortfolioController, forgotPasswordController, resetPasswordController } = require("../controller/userController");
const authUser = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/signup",signupUserController);
userRouter.post("/login",loginController);
userRouter.get("/logout",authUser,logOutController);
userRouter.get("/me",getUserController);
userRouter.patch("/update-profile",authUser,updateProfilecontroller);
userRouter.patch("/update-password",authUser,updatePasswordController);
userRouter.get("/get-user",getUserForPortfolioController);
userRouter.post("/forgot-password",forgotPasswordController);
userRouter.post("/reset-password/:email",resetPasswordController);

module.exports = userRouter;