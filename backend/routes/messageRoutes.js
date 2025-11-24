const express = require("express");
const { sendMessageController, getAllMessageController, deleteMessageController } = require("../controller/messageController");

const messageRouter = express.Router();

messageRouter.post("/send-message",sendMessageController);
messageRouter.get("/get-message",getAllMessageController);
messageRouter.delete("/delete-message/:_id",deleteMessageController);


module.exports = messageRouter;