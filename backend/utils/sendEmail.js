const nodemailer = require("nodemailer");
const { RESET_PASSWORD_TEMPLATE,RESET_PASSWORD_SUCCESS_TEMPLATE } = require("./emailTemplates");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAI_USER,
        pass: process.env.GMAIL_PASSWORD
    }
});

const sendResetPasswordMail = async ({name, to, subject,resetCode}) => {
    try {
        const info = await transporter.sendMail({
            from:process.env.EMAI_USER,
            to:to,
            subject:subject,
            html:RESET_PASSWORD_TEMPLATE
                .replace("{username}",name)
                .replace("{otp}",resetCode)
        })
    } catch (error) {
        throw new Error("Error sending reset mail "+error.message);
    }
}

const sendResetPasswordSuccessMail = async ({name, to, subject}) => {
    try {
        const info = await transporter.sendMail({
            from:process.env.EMAI_USER,
            to:to,
            subject:subject,
            html:RESET_PASSWORD_SUCCESS_TEMPLATE
                .replace("{username}",name)
        })
    } catch (error) {
        throw new Error("Error sending reset mail "+error.message);
    }
}

module.exports = {
    sendResetPasswordMail,
    sendResetPasswordSuccessMail,
};