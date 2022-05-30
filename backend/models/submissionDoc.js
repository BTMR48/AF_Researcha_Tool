const mongoose=require('mongoose');
const stgroups = require("../models/studentgroups");
const stprogresses = require("../models/stProgress");

const Schema =mongoose.Schema;

const SubmissionSchema=new Schema({
    
    grpId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: stgroups,
        required:true
    },
    proId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: stprogresses,
        required:true
    },

    submissionUrl:{
        type:String,
        required:true
    },

})
const Submission=mongoose.model("submissions",SubmissionSchema);
module.exports=Submission;