const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PanelgroupSchema = new Schema({
    
    panelmemberID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'panelmember',
        required : true

    },
    
    studentID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'student',
        required : true
    },

})

const Panelgroup = mongoose.model("panelgroup",PanelgroupSchema)
module.exports = Panelgroup