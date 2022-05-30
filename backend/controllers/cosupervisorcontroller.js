const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cosupervisor = require('../models/cosupervisor');

//Cosupervisor sign in () 
exports.signinCosupervisor = async(req,res) => {
    const{ email, password } = req.body;

        try{
            //find the Cosupervisor by email
            const cosupervisor = await Cosupervisor.findOne({email}).select("+password");

            //if the email doesn't exist
            if (!cosupervisor)
                return res.status(404).json({message: "Such email doesn't exist"});

            //compare the password with provided password
            const ispasswordMatch = await bcrypt.compare(password, cosupervisor.password);

            //if passwords didn't match
            if(!ispasswordMatch)
                return res.status(400).json({message: "Invalid Password"});

            //creating a token
            const token = jwt.sign({email: cosupervisor.email, id: cosupervisor._id}, process.env.JWT_SECRET, {expiresIn:"1h"} )

            //joining the cosupervisor object and token
            res.status(200).json({result: cosupervisor, token})
        }catch(error){
            res.status(500).json({message: "Something went wrong", error: error.message})
        }
}


//Cosupervisor signup
exports.signupCosupervisor = async(req,res) => {

    const { title, name, email, fields, phoneno, password, imgUrl } = req.body;
    
    // let to=new Date(req.body.availableTimeTo)
    // let from=new Date(req.body.availableTimeFrom)
    
    // const availableTimeTo = (to.getHours() + ":" + to.getMinutes())
    // const availableTimeFrom = (from.getHours() + ":" + from.getMinutes())

    try {
        //creating a new Cosupervisor
        const cosupervisor = await Cosupervisor.create({ title, name, email, fields, phoneno, password, imgUrl });

        //creating a token
        const token = jwt.sign({name: cosupervisor.name, id: cosupervisor._id, email: cosupervisor.email}, process.env.JWT_SECRET, {expiresIn: "1h"})
 
        //joining the cosupervisor  object and token as the response
        res.status(200).json({result: cosupervisor, token})
    }catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message})
    } 
}

//cosupervisor update
exports.updateCosupervisor = async(req,res) => {

    let cosupervisorID = req.params.id;
    const { title, name, email, fields, phoneno, imgUrl } = req.body;

    // let to=new Date(req.body.availableTimeTo)
    // let from=new Date(req.body.availableTimeFrom)
    
    // const availableTimeTo = (to.getHours() + ":" + to.getMinutes())
    // const availableTimeFrom = (from.getHours() + ":" + from.getMinutes())

    const updateCosupervisor= { title, name, email, fields, phoneno, imgUrl } 
    
    try{
        //find cosupervisor by ID  
         await Cosupervisor.findByIdAndUpdate(cosupervisorID ,updateCosupervisor);

        res.status(200).json({message:"Cosupervisor updated"})
    }catch(error){
        res.status(500).json({message:"Error with updating data",error:error.message});
    }

}

//cosupervisor delete
exports.deleteCosupervisor = async(req,res) => {
    
    let cosupervisorId = req.params.id;
    
    try{
        await Cosupervisor.findByIdAndDelete(cosupervisorId);

        res.status(200).json({message:"Delete successful"});
    }catch(error){
        res.status(500).json({message: "Delete failed",error:error.message});
    }
}

exports.fetchAll =async(req,res) =>{

    Cosupervisor.find().then((cosupervisors)=>{
        
        res.status(200).json(cosupervisors)
    }).catch((error)=>{
        res.status(500).json({message:"fetching failed", error:error.message});
    })
}

exports.fetchOne =async(req,res) =>{
    let cosupervisorId = req.params.id;

    await Cosupervisor.findById(cosupervisorId)
    .then( (cosupervisor) =>{
        res.status(200).json(cosupervisor)
    }).catch( (error) =>{
        res.status(500).json({message:"Fetching failed", error:error.message});
    })
}
