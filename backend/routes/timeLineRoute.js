const express = require("express");
const {postTimeLineController,deleteTimeLineController,getAllTimeLineController } = require("../controller/timeLineController");
const authUser = require("../middleware/auth");

const timeLineRouter = express.Router();

timeLineRouter.post("/timeline/add",authUser,postTimeLineController);
timeLineRouter.delete("/timeline/delete/:_id",authUser,deleteTimeLineController);
timeLineRouter.get("/timeline/get-timeline",getAllTimeLineController);


module.exports = timeLineRouter;