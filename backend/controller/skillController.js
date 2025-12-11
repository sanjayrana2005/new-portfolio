const { addSkillValidation, updateSkillValidation } = require("../middleware/skillValidation");
const skillModel = require("../models/skillSchema");
const cloudinary = require('../utils/cloudinary');

const addSkillController = async (req, res) => {
    try {
        addSkillValidation(req);
        const { title, proficiency } = req.body;
        const { svg } = req.files;

        const cloudinaryResponse = await
            cloudinary.uploader.upload(svg.tempFilePath, {
                folder: "PORTFOLIO_SKILLS"
            });

        if (!cloudinaryResponse || cloudinaryResponse.error) {
            return res.status(400).json({
                message: cloudinaryResponse?.error?.message || "Image upload failed",
            });
        }

        const addedSkill = await skillModel.create({
            title,
            proficiency,
            svg: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            }
        })

        res.status(200).json({
            message: "Skill added",
            addedSkill
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

const deleteSkillController = async (req, res) => {
    try {
        const { _id } = req.params;
        const deleteSkill = await skillModel.findById(_id);
        if (!deleteSkill) {
            return res.status(404).json({
                message: "skill not found"
            });
        }

        const skillApplicationSvgId = deleteSkill.svg.public_id;
        await cloudinary.uploader.destroy(skillApplicationSvgId)

        await deleteSkill.deleteOne();

        res.status(200).json({
            message: "Skill deleted"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

const updateSkillController = async (req, res) => {
    try {
        updateSkillValidation(req);
        const proficiency = req?.body?.proficiency;
        const _id = req.params._id;

        let skill = await skillModel.findById(_id);
        if(!skill){
            return res.status(404).json({
                message:"Skill not found"
            });
        }

        skill = await skillModel.findByIdAndUpdate(_id,{proficiency},{
            new:true
        })

        res.status(200).json({
            message:"Skill updated",
            skill
        })
    } catch (error) {
         res.status(400).json({
            message: error.message
        });
    }
}

const getAllSkillController = async (req, res) => {
    try {
        const skills = await skillModel.find();
        res.status(200).json({
            skills
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        });
    }
}

module.exports = {
    addSkillController,
    deleteSkillController,
    updateSkillController,
    getAllSkillController
}