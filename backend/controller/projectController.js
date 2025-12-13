const { addProjectValidation, updateProjectValidation } = require("../middleware/projectValidation");
const projectModel = require("../models/projectSchema");
const cloudinary = require("../utils/cloudinary");

const addProjectController = async (req, res) => {
    try {
        addProjectValidation(req);
        const { title, description, gitRepoLink, projectLink, stack, deployed,technologies } = req.body;
        const { projectImage } = req.files;

        const cloudinaryResponse = await cloudinary.uploader.upload(
            projectImage.tempFilePath, {
            folder: "PORTFOLIO_PROJECT_IMAGE"
        }
        );

        if (!cloudinaryResponse || cloudinaryResponse.error) {
            return res.status(400).json({
                message: cloudinaryResponse?.error?.message || "Project Image upload fail"
            })
        }

        const newProject = await projectModel.create({
            title,
            description,
            gitRepoLink,
            projectLink,
            stack,
            deployed,
            technologies,
            projectImage: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            }
        });

        res.status(200).json({
            message: "Project added",
            newProject
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

const updateProjectController = async (req, res) => {
    try {
        updateProjectValidation(req);
        const title = req?.body?.title;
        const description = req?.body?.description;
        const gitRepoLink = req?.body?.gitRepoLink;
        const projectLink = req?.body?.projectLink;
        const technologies = req?.body?.technologies;
        const stack = req?.body?.stack;
        const deployed = req.body?.deployed;
        const projectImage = req.files?.projectImage;

        const _id = req.params._id;

        const project = await projectModel.findById(_id);
        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }
        let projectData;

        if (projectImage) {
            const public_id = project.projectImage.public_id;
            await cloudinary.uploader.destroy(public_id);
            const cloudinaryResponse = await cloudinary.uploader.upload(projectImage.tempFilePath, {
                folder: "PORTFOLIO_PROJECT_IMAGE"
            });

            projectData = {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            }

            if (!cloudinaryResponse || cloudinaryResponse.error) {
                return res.status(400).json({
                    message: cloudinaryResponse?.error?.message || "Project Image upload faild"
                });
            }
        }

        const updatedProject = await projectModel.findByIdAndUpdate({ _id: project._id }, {
            title,
            description,
            gitRepoLink,
            projectLink,
            technologies,
            stack,
            deployed,
            ...(projectData && { projectImage: projectData })
        },{new:true});

        res.status(200).json({
            message: "Project updated",
            updatedProject
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

const getAllProjectController = async (req,res) => {
try {
    const allProject = (await projectModel.find()).sort({createdAt:-1});

    res.status(200).json({
        allProject
    })

} catch (error) {
    res.status(400).json({
        message:error.message
    });
}
}

const deleteProjectController = async (req,res)=>{
    try {
        const _id = req.params._id;
        const project = await projectModel.findById(_id);
        if(!project){
            return res.status(400).json({
                message:"Project not found"
            })
        }

        await cloudinary.uploader.destroy(project.projectImage.public_id);

        await projectModel.deleteOne();

        res.status(200).json({
            message:"Project deleted"
        });
    } catch (error) {
       res.status(400).json({
        message:error.message
       }) 
    }
}

const getSingleProjectController = async (req,res)=>{
    try {
        const _id = req.params._id;
        const singleProject = await projectModel.findById(_id);
        if(!singleProject){
            return res.status(400).json({
                message:"Project not found"
            })
        }
        
        res.status(200).json({
            singleProject
        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

module.exports = {
    addProjectController,
    updateProjectController,
    getAllProjectController,
    deleteProjectController,
    getSingleProjectController
}