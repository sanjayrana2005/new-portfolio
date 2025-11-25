const express = require("express");
const { sendMessageController, getAllMessageController, deleteMessageController } = require("../controller/messageController");
const authUser = require("../middleware/auth");

const messageRouter = express.Router();

messageRouter.post("/send-message",sendMessageController);
messageRouter.get("/get-message",authUser,getAllMessageController);
messageRouter.delete("/delete-message/:_id",authUser,deleteMessageController);


module.exports = messageRouter;