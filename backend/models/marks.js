const mongoose=require('mongoose');

const Schema =mongoose.Schema;

const MarksSchema=new Schema({
    
    grpId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'studentGroups',
        required:true
    },
    proId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'stProgress'
    },

    mark:{
        type:String,
        required:true
    },

})

const Marks=mongoose.model("marks",MarksSchema);
module.exports=Marks;