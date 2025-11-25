const express = require("express");
const authUser = require("../middleware/auth");
const {addSkillController,deleteSkillController,updateSkillController,getAllSkillController} = require("../controller/skillController");

const skillRouter = express.Router();

skillRouter.post("/skill-add",authUser,addSkillController);
skillRouter.delete("/skill-delete/:_id",authUser,deleteSkillController);
skillRouter.patch("/skill-update/:_id",authUser,updateSkillController);
skillRouter.get("/get-skill",getAllSkillController);

module.exports = skillRouter;