const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderName:{
        type:String, 
    },
    subject:{
        type:String
    },
    message:{
        type:String
    }
},{timestamps:true});

const messageModel  = mongoose.model("message",messageSchema);

module.exports = messageModel;