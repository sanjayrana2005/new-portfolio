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
    } else if (trimmedFullName.length > 20) {
        throw new Error("Name should below 20 characters")
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
        throw new Error("about me should below 500 characters");
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

const loginUserValidation = (req) => {
    const { email, password } = req.body;
    if (!email) {
        throw new Error("Email is required");
    } else if (!validator.isEmail(email.trim())) {
        throw new Error("Valid email is required");
    }

    if (!password) {
        throw new Error("password is required");
    }
    return true;
}

const updateProfileValidation = (req) => {
    const ALLOWED_UPDATES = ["fullName", "phone", "aboutMe", "avatar", "resume", "gitHubURL", "linkedInURL"];
    const data = req.body || {};
    const isValid = Object.keys(data).every((field) => ALLOWED_UPDATES.includes(field));

    if (!isValid) {
        throw new Error("Invalid update request");
    }

    if (data.fullName) {
        if (data.fullName.trim().length < 2) {
            throw new Error("Name must contain at least 2 characters");
        } else if (data.fullName.trim().length > 20) {
            throw new Error("Name should below 20 characters");
        }
    }

    if (data.phone) {
        if (!validator.isMobilePhone(data.phone, "en-IN")) {
            throw new Error("Enter a valid phone number");
        }
    }

    if (data.aboutMe) {
        if (data.aboutMe.trim().length < 2) {
            throw new Error("about me must contain at least 2 characters");
        } else if (data.aboutMe.trim().length > 500) {
            throw new Error("about me should below 500 characters");
        }
    }

    if (data.gitHubURL && !validator.isURL(gitHubURL.trim())) {
        throw new Error("Invalid github URL");
    } else if (data.linkedInURL && !validator(linkedInURL.trim())) {
        throw new Error("Invalid linkedIn URL");
    }
    return true;
}


module.exports = {
    sendMessageValidation,
    deleteMessageValidation,
    signupUserValidattion,
    loginUserValidation,
    updateProfileValidation
}