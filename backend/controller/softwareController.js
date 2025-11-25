const { addnewApplicationValidation } = require("../middleware/softwareValidation");
const softwareModel = require("../models/softWareModel");
const cloudinary = require('../utils/cloudinary');

const addNewApplicationController = async (req,res) => {
    try {
        addnewApplicationValidation(req);
        const {name}=req.body;
        const {svg} = req.files;

        const cloudinaryResponse = await cloudinary.uploader.upload(svg.tempFilePath,{
            folder:"PORTFOLIO_SOFTWARE_APPLICATIONS"
        });
        if(!cloudinaryResponse || cloudinaryResponse.error){
            return res.status(500).json({
                message: cloudinaryResponse?.error?.message ||"Image upload failed",
            });
        }

        const softwareApplication = await softwareModel.create({
            name,
            svg:{
                public_id:cloudinaryResponse.public_id,
                url:cloudinaryResponse.secure_url
            }
        });

        res.status(200).json({
            message:"Sowftware application added",
            softwareApplication
        })
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

const deleteApplicationController = async (req,res) => {
    try {
        const {_id} = req.params;
        const delteApplication = await softwareModel.findById(_id);
        if(!delteApplication){
            return res.status(404).json({
                message:"Application not found"
            });
        }

        const softwareApplicationSvgId = delteApplication.svg.public_id;
        await cloudinary.uploader.destroy(softwareApplicationSvgId)

        await delteApplication.deleteOne();

        res.status(200).json({
            message:"Application deleted"
        })
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

const getAllApplicationController = async (req,res) => {
    try {
        const getAllApplication = await softwareModel.find();
        res.status(200).json({
            getAllApplication
        })
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

module.exports = {
    addNewApplicationController,
    deleteApplicationController,
    getAllApplicationController
}