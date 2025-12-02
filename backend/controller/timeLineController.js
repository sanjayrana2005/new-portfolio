const { postTimeLineValidation } = require("../middleware/timeLineValidation");
const timeLineModel = require("../models/timeLineSchmea");

const postTimeLineController = async (req, res) => {
    try {
        postTimeLineValidation(req);
        const { title, description, from, to } = req.body;

        const newTimeline = await timeLineModel.create({
            title,
            description,
            timeline: {
                from,
                to
            }
        });

        res.status(200).json({
            message: "Timeline added",
            newTimeline
        })
    } catch (error) {
         res.status(400).json({
            message:error.message
        })
    }
}

const deleteTimeLineController = async (req, res) => {
    try {
        const _id = req.params._id;
        const timeline = await timeLineModel.findById(_id);
        if (!timeline) {
            return res.status(404).json({
                message: "Timeline not found"
            });
        }
        await timeline.deleteOne();

        res.status(200).json({
            message: "Timeline deleted"
        });

    } catch (error) {
         res.status(400).json({
            message:error.message
        });
    }
}
const getAllTimeLineController = async (req, res) => {
    try {
        const timeline = await timeLineModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            timeline
        })
    } catch (error) {
         res.status(400).json({
            message:error.message
        });
    }
}



module.exports = {
    postTimeLineController, deleteTimeLineController, getAllTimeLineController
}