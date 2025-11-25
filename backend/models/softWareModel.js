const mongoose = require("mongoose");

const softwareSchem = new mongoose.Schema({
    name:String,
    svg:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
});

const softwareModel = mongoose.model("software",softwareSchem);

module.exports = softwareModel;