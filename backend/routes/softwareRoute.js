const express = require("express");
const { addNewApplicationController, deleteApplicationController, getAllApplicationController } = require("../controller/softwareController");
const authUser = require("../middleware/auth");

const softwareRouter = express.Router();

softwareRouter.post("/software-add",authUser,addNewApplicationController);
softwareRouter.delete("/software-delete/:_id",authUser,deleteApplicationController);
softwareRouter.get("/get-software",getAllApplicationController);
 
module.exports = softwareRouter;