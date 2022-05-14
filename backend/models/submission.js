const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubmissionSchema = new Schema({
    projectid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'progress',
        required : true

    },
    
    studentID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'student',
        required : true
    },

    //should change to pdf
    imgUrl: {
        type: String,
        required: false
    },
    


})

const Submission = mongoose.model("submission",SubmissionSchema)
module.exports = Submission