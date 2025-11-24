const mongoose  = require("mongoose");

const sendMessageValidation = (req) => {
    const { senderName, subject, message } = req.body;
    if (!senderName || !subject || !message) {
        throw new Error("Please fill full form");
    }

    const trimmedName = senderName.trim();
    if (trimmedName.length < 2) {
        throw new Error("Name must contain at least 2 characters");
    } else if (trimmedName > 10) {
        throw new Error("Name should below 10 characters")
    }

    const trimmedSubject = subject.trim();
    if (trimmedSubject > 25) {
        throw new Error("Subject should below 25 characters")
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage < 10) {
        throw new Error("Message should atleast 10 characters")
    }
    else if (trimmedMessage > 500) {
        throw new Error("Message should below 500 characters")
    }

    return true;
}

const deleteMessageValidation = (req) => {
    const {_id} = req.params;

    if(!_id){
        throw new Error("Message ID required");
    }

    if(!mongoose.Types.ObjectId.isValid(_id)){
        throw new Error("Invalid message ID");
    }
    return true;
}

const validateSignupUser = (req) => {
    console.log(req.body)
    if(!req.files || Object.keys(req.files).length === 0){
        throw new Error("Avatar and Resume are required");
    }

    const { 
    fullName,
    email,
    password,
    phone,
    aboutMe,
    gitHubURL,
    linkedInURL,
    } = req.body;


    if(!fullName||
    !email||
    !password||
    !phone){
        throw new Error("fill required fields")
    }

    return true;
}
module.exports = {
    sendMessageValidation,
    deleteMessageValidation,
    validateSignupUser,
}