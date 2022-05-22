const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    studentID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required:true
    },

    supervisorID:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'supervisor',
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

});

const Request = mongoose.model("supervisorrequest", RequestSchema)
module.exports = Request