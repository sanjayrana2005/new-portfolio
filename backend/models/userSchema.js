const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    phone: {
        type: String,
        required: true,
    },
    aboutMe: {
        type: String,
        required: true,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true
        }
    },
    resume: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true
        }
    },
    gitHubURL:String,
    linkedInURL:String,
    resetPasswordToken:String,
    resetPasswordExpire:Date

}, { timestamps: true });

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;