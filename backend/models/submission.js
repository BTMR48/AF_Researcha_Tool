const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubmissionSchema = new Schema({
    supervisorid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'requestSupervisor',
        required : true

    },
    
    studentID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    progressName : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    groupName : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },

    //should change to pdf
    imgUrl: {
        type: String,
        required: false
    },
    


})

const Submission = mongoose.model("submissions",SubmissionSchema)
module.exports = Submission