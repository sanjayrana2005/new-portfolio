const { signupUserValidattion, loginUserValidation, updateProfileValidation } = require('../middleware/validation');
const userModel = require('../models/userSchema');
const cloudinary = require('../utils/cloudinary');
const bcrypt = require("bcrypt");
const generateToken = require('../utils/generateToken');


const signupUserController = async (req, res) => {
    try {
        signupUserValidattion(req);
        const { avatar, resume } = req.files;
        const {
            fullName,
            email,
            password,
            phone,
            aboutMe } = req.body;

        const existUser = await userModel.findOne({ email });
        if (existUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const cloudinaryResponseForAvatar = await cloudinary.uploader.upload(
            avatar.tempFilePath,
            {
                folder: "Avatars"
            }
        );
        if (!cloudinaryResponseForAvatar || cloudinaryResponseForAvatar.error) {
            return res.status(500).json({
                message: "Avtar upload failed",
            });
        };

        const cloudinaryResponseForResume = await cloudinary.uploader.upload(
            resume.tempFilePath,
            {
                folder: "Resume"
            }
        );
        if (!cloudinaryResponseForResume || cloudinaryResponseForResume.error) {
            await cloudinary.uploader.destroy(cloudinaryResponseForAvatar.public_id);
            return res.status(500).json({
                message: "Resume upload failed",
            });
        };

        const user = await userModel.create({
            fullName,
            email,
            password: hashPassword,
            phone,
            aboutMe,
            avatar: {
                public_id: cloudinaryResponseForAvatar.public_id,
                url: cloudinaryResponseForAvatar.secure_url
            },
            resume: {
                public_id: cloudinaryResponseForResume.public_id,
                url: cloudinaryResponseForResume.secure_url
            },
        });

        const token = generateToken(user);

        res.cookie("portfolioToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        res.status(200).json({
            message: "User SignUp successfully",
            token
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

const loginController = async (req, res) => {
    try {
        loginUserValidation(req);
        const { email, password } = req.body;

        const ExistUser = await userModel.findOne({ email }).select("+password");
        if (!ExistUser) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }

        const comparePassword = await bcrypt.compare(password, ExistUser.password);
        if (!comparePassword) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }

        const token = generateToken(ExistUser);
        res.cookie("portfolioToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        res.status(200).json({
            message: "Login successfully",
            token,
            user: ExistUser
        })

    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

const logOutController = (req, res) => {
    res
        .cookie("portfolioToken", "", {
            expires: new Date(Date.now()),
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        .status(200).json({
            message: "Log out"
        })
}

const getUserController = async (req, res) => {
    try {
        const { _id } = req.user;

        const user = await userModel.findById({ _id });

        res.status(200).json({
            user
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

const updateProfilecontroller = async (req, res) => {
    try {
        updateProfileValidation(req);
        const fullName = req.body?.fullName;
        const phone = req.body?.phone;
        const aboutMe= req.body?.aboutMe;
        const gitHubURL= req.body?.gitHubURL;
        const linkedInURL = req.body?.linkedInURL;
        const avatar = req.files?.avatar;
        const resume  = req.files?.resume;

        const user = await userModel.findById({ _id: req.user.id });

        let avatarData;
        let resumeData;

        if (avatar) {
            const public_id = user.avatar.public_id;
            await cloudinary.uploader.destroy(public_id);
            const cloudinaryResponse = await cloudinary.uploader.upload(
                avatar.tempFilePath, {
                folder: "Avatars"
            });
            avatarData = {
                public_id:cloudinaryResponse.public_id,
                url:cloudinaryResponse.secure_url
            }

            if (!cloudinaryResponse || cloudinaryResponse.error) {
                return res.status(500).json({
                    message: "Avtar upload failed",
                });
            };

        }

        if (resume) {
            const public_id = user.resume.public_id;
            await cloudinary.uploader.destroy(public_id);
            const cloudinaryResponse = await cloudinary.uploader.upload(
                resume.tempFilePath, {
                folder: "Resume"
            });

            resumeData = {
                public_id:cloudinaryResponse.public_id,
                url:cloudinaryResponse.secure_url
            }
            if (!cloudinaryResponse || cloudinaryResponse.error) {
                return res.status(500).json({
                    message: "Resume upload failed",
                });
            };
        }

        const updatedUser = await userModel.findByIdAndUpdate({ _id: req.user.id }, {
            fullName,
            phone,
            aboutMe,
            gitHubURL,
            linkedInURL,
            ...(avatarData && {avatar:avatarData}),
            ...(resumeData && {resume : resumeData})
        },{new:true})
        res.status(200).json({
            message: "Profile updated"
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
}

module.exports = {
    signupUserController,
    loginController,
    logOutController,
    getUserController,
    updateProfilecontroller
}