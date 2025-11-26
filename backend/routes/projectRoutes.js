const express = require("express");
const authUser = require("../middleware/auth");
const {addProjectController, updateProjectController, getAllProjectController, deleteProjectController } = require("../controller/projectController");
const projectRouter = express.Router();

projectRouter.post("/add-project",authUser,addProjectController);
projectRouter.patch("/update-project/:_id",authUser,updateProjectController);
projectRouter.get("/get-project",getAllProjectController);
projectRouter.delete("/delete-project/:_id",authUser,deleteProjectController);

module.exports=projectRouter;