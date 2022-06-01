const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Supervisor = require('../models/supervisor');

//Supervisor sign in () 
exports.signinSupervisor = async(req,res) => {
    const{ email, password } = req.body;

        try{
            //find the Supervisor by email
            const supervisor = await Supervisor.findOne({email}).select("+password");

            //if the email doesn't exist
            if (!supervisor)
                return res.status(404).json({message: "Such email doesn't exist"});

            //compare the password with provided password
            const ispasswordMatch = await bcrypt.compare(password, supervisor.password);

            //if passwords didn't match
            if(!ispasswordMatch)
                return res.status(400).json({message: "Invalid Password"});

            //creating a token
            const token = jwt.sign({email: supervisor.email, id: supervisor._id}, process.env.JWT_SECRET, {expiresIn:"1h"} )

            //joining the supervisor object and token
            res.status(200).json({result: supervisor, token})
        }catch(error){
            res.status(500).json({message: "Something went wrong", error: error.message})
        }
}


//Supervisor signup
exports.signupSupervisor = async(req,res) => {

    const { title, name, email, fields, phoneno, password, imgUrl } = req.body;
    
    // let to=new Date(req.body.availableTimeTo)
    // let from=new Date(req.body.availableTimeFrom)
    
    // const availableTimeTo = (to.getHours() + ":" + to.getMinutes())
    // const availableTimeFrom = (from.getHours() + ":" + from.getMinutes())

    try {
        //creating a new Supervisor
        const supervisor = await Supervisor.create({ title, name, email, fields, phoneno, password, imgUrl });

        //creating a token
        const token = jwt.sign({name: supervisor.name, id: supervisor._id, email: supervisor.email}, process.env.JWT_SECRET, {expiresIn: "1h"})
 
        //joining the supervisor  object and token as the response
        res.status(200).json({result: supervisor, token})
    }catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message})
    } 
}

//supervisor update
exports.updateSupervisor = async(req,res) => {

    let supervisorID = req.params.id;
    const { title, name, email, fields, phoneno, imgUrl } = req.body;

    // let to=new Date(req.body.availableTimeTo)
    // let from=new Date(req.body.availableTimeFrom)
    
    // const availableTimeTo = (to.getHours() + ":" + to.getMinutes())
    // const availableTimeFrom = (from.getHours() + ":" + from.getMinutes())

    const updateSupervisor= { title, name, email, fields, phoneno, imgUrl} 
    
    try{
        //find supervisor by ID  
         await Supervisor.findByIdAndUpdate(supervisorID ,updateSupervisor);

        res.status(200).json({message:"Supervisor updated"})
    }catch(error){
        res.status(500).json({message:"Error with updating data",error:error.message});
    }

}

//supervisor delete
exports.deleteSupervisor = async(req,res) => {
    
    let supervisorId = req.params.id;
    
    try{
        await Supervisor.findByIdAndDelete(supervisorId);

        res.status(200).json({message:"Delete successful"});
    }catch(error){
        res.status(500).json({message: "Delete failed",error:error.message});
    }
}

exports.fetchAll =async(req,res) =>{

    Supervisor.find().then((supervisors)=>{
        
        res.status(200).json(supervisors)
    }).catch((error)=>{
        res.status(500).json({message:"fetching failed", error:error.message});
    })
}

exports.fetchOne =async(req,res) =>{
    let supervisorId = req.params.id;

    await Supervisor.findById(supervisorId)
    .then( (supervisor) =>{
        res.status(200).json(supervisor)
    }).catch( (error) =>{
        res.status(500).json({message:"Fetching failed", error:error.message});
    })
}
