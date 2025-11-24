const { validateSignupUser } = require('../middleware/validation');
const userModel = require('../models/userSchema');
const cloudinary = require('../utils/cloudinary');


const signupUserController = async (req, res) => {

    try {
        validateSignupUser(req);
        const { avatar, resume } = req.files;
        const { 
            fullName,
            email,
            password,
            phone,
            aboutMe } = req.body

        const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
            avatar.tempFilePath,
            {
                folder: "Avatars"
            }
        );
        if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
            console.error("Cloudinary Error : ", cloudinaryResponseForAvatar.error || "Unknown cloudinary error");
        };

        const cloudinaryResponseForResume = await cloudinary.uploader.upload(
            resume.tempFilePath,
            {
                folder: "Resume"
            }
        );
        if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
            console.error("Cloudinary Error : ", cloudinaryResponseForResume.error || "Unknown cloudinary error");
        };

        await userModel.create({
            fullName,
            email,
            password,
            phone,
            aboutMe,
            avatar:{
                public_id:cloudinaryResponseForAvatar.public_id,
                url:cloudinaryResponseForAvatar.secure_url
            },
            resume:{
                public_id:cloudinaryResponseForResume.public_id,
                url:cloudinaryResponseForResume.secure_url
            },
        });


        res.status(200).json({
            message: "User SignUp"
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

module.exports = {
    signupUserController,
}