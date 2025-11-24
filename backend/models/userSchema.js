const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    phone: {
        type: String,
        required: [true, "Phone is required"]
    },
    aboutMe: {
        type: String,
        required: [true, "About me is required"]
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