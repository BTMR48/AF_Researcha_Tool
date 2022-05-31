const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
    supID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    
    grpName : {
        type : String,
        required : true
    }

})

const Groups = mongoose.model("stgroups",groupSchema)
module.exports = Groups