const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CoRequestSchema = new Schema({
    studentID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required:true
    },

    coSupervisorID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cosupervisor',
        required:true
    },

    supervisorName:{
        type: String,
        required: true
    },

    topic:{
        type: String,
        required: true
    },

    batchgroup:{
        type: String,
        required: true
    },

    type : {
        type : String,
        required : true
    }

});

const CoRequest = mongoose.model("cosupervisorrequest", CoRequestSchema)
module.exports = CoRequest