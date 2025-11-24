const { validateSignupUser } = require('../middleware/validation');
const cloudinary = require('../utils/cloudinary');


const signupUserController = async (req, res) => {

    try {
        validateSignupUser(req);
        const { avatar, resume } = req.files;        

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


        res.status(200).json({
            message:"User SignUp"
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