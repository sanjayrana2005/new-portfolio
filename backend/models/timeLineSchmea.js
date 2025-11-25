const mongoose = require("mongoose");

const timleineSchem = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    timeline:{
        from:String,
        to:String
    },
});

const timeLineModel = mongoose.model("timeline",timleineSchem);

module.exports=timeLineModel;