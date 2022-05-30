const mongoose=require('mongoose');

const Schema =mongoose.Schema;

const stProgressSchema=new Schema({
    
    progressName:{
        type:String,
        required:true
    }

})

const Progress=mongoose.model("stprogresses",stProgressSchema);
module.exports=Progress;