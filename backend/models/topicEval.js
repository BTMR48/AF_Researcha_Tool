const mongoose=require('mongoose');

const Schema = mongoose.Schema;

const TopicEvalSchema = new Schema({

    groupname:{
        type: String,
        required: true
    },

    supervisorName:{
        type: String,
        required: true
    },

    cosupervisorName:{
        type: String,
        required: true
    },

    topic:{
        type: String,
        required: true
    },

    submissionDoc: {
        type: String,
        required: true
    },

    feedback :{
        type: String,
        required: false
    },

    type : {
        type : String,
        required : false
    }

});

const TopicEval = mongoose.model("topicevaluation" , TopicEvalSchema)
module.exports = TopicEval