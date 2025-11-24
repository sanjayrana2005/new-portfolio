const messageModel = require("../models/messageSchema");
const { sendMessageValidation, deleteMessageValidation } = require("./validation");

const sendMessageController = async (req, res) => {
    try {
        sendMessageValidation(req);
        const { senderName, subject, message } = req.body;

        const newMessage = await messageModel.create({
            senderName,
            subject,
            message
        })
        res.status(200).json({
            message: "Message sent",
            newMessage
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const getAllMessageController = async (req, res) => {
    try {
        const messages = await messageModel.find();
        res.status(200).json({
            messages
        });
    } catch (error) {
        res.status(500).json({
            message:error.message || "Something went wrong"
        })
    }
}

const deleteMessageController = async (req,res) => {
    try {
        deleteMessageValidation(req);
        const {_id} = req.params;

        const message = await messageModel.findById(_id);
        if(!message){
            return res.status(400).json({
                message:"Message already deleted"
            });
        }

        await messageModel.deleteOne();
        res.status(200).json({
            message:"Message deleted"
        });

    } catch (error) {
        res.status(500).json({
            message:error.message || "Something went wrong"
        })
    }

}

module.exports = {
    sendMessageController,
    getAllMessageController,
    deleteMessageController
};
