const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    gitRepoLink: String,
    projectLink: String,
    technologies:String,
    stack:String,
    deployed:Boolean,
    projectImage:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
},{timestamps:true});

const projectModel = mongoose.model("project",projectSchema);

module.exports = projectModel;