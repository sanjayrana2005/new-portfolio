const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    proficiency: String,
    svg: {
        public_id: {
            type: String,
            required: true
        },
        url:{
            type:String,
            required:true
        }
    }
});

const skillModel = mongoose.model("skill", skillsSchema);

module.exports = skillModel;