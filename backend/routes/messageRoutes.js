const express = require("express");
const { sendMessageController, getAllMessageController, deleteMessageController } = require("../middleware/messageController");

const messageRouter = express.Router();

messageRouter.post("/send-message",sendMessageController);
messageRouter.get("/get-message",getAllMessageController);
messageRouter.delete("/delete-message/:_id",deleteMessageController);


module.exports = messageRouter;