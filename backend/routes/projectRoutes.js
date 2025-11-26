const express = require("express");
const authUser = require("../middleware/auth");
const {addProjectController, updateProjectController, getAllProjectController, deleteProjectController, getSingleProjectController } = require("../controller/projectController");
const projectRouter = express.Router();

projectRouter.post("/add-project",authUser,addProjectController);
projectRouter.patch("/update-project/:_id",authUser,updateProjectController);
projectRouter.delete("/delete-project/:_id",authUser,deleteProjectController);
projectRouter.get("/getall-project",getAllProjectController);
projectRouter.get("/get-single-project/:_id",getSingleProjectController);

module.exports=projectRouter;