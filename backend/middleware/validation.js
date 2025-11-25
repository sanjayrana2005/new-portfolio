const mongoose = require("mongoose");
const validator = require("validator");

const sendMessageValidation = (req) => {
    const { senderName, subject, message } = req.body;
    if (!senderName || !subject || !message) {
        throw new Error("Please fill full form");
    }

    const trimmedName = senderName.trim();
    if (trimmedName.length < 2) {
        throw new Error("Name must contain at least 2 characters");
    } else if (trimmedName.length > 10) {
        throw new Error("Name should below 10 characters")
    }

    const trimmedSubject = subject.trim();
    if (trimmedSubject.length > 25) {
        throw new Error("Subject should below 25 characters")
    }

    const trimmedMessage = message.trim();
    if (trimmedMessage.length < 10) {
        throw new Error("Message should atleast 10 characters")
    }
    else if (trimmedMessage.length > 500) {
        throw new Error("Message should below 500 characters")
    }

    return true;
}

const deleteMessageValidation = (req) => {
    const { _id } = req.params;

    if (!_id) {
        throw new Error("Message ID required");
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error("Invalid message ID");
    }
    return true;
}

const signupUserValidattion = (req) => {

    const { fullName, email, password, phone, aboutMe, gitHubURL, linkedInURL } = req.body;

    if (!fullName || !email || !password || !phone || !aboutMe) {
        throw new Error("fill all required fields")
    }

    const trimmedFullName = fullName.trim();
    if (trimmedFullName.length < 2) {
        throw new Error("Name must contain at least 2 characters");
    } else if (trimmedFullName.length > 10) {
        throw new Error("Name should below 10 characters")
    }

    if (!validator.isEmail(email.trim())) {
        throw new Error("Invalid email format");
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error("Enter a strong password");
    }

    if (!validator.isMobilePhone(phone, "en-IN")) {
        throw new Error("Enter a valid phone number");
    }

    const trimmedAboutMe = aboutMe.trim();
    if (trimmedAboutMe.length < 2) {
        throw new Error("about me must contain at least 2 characters");
    } else if (trimmedAboutMe.length > 500) {
        throw new Error("about me should below 500 characters")
    }
    if (gitHubURL && !validator.isURL(gitHubURL.trim())) {
        throw new Error("Invalid github URL");
    } else if (linkedInURL && !validator.isURL(linkedInURL.trim())) {
        throw new Error("Invalid linkedIn URL");
    }

    if (!req.files || !req.files.avatar || !req.files.resume) {
        throw new Error("Avatar and Resume are required");
    }

    return true;
}
module.exports = {
    sendMessageValidation,
    deleteMessageValidation,
    signupUserValidattion,
}