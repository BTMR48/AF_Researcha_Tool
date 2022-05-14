const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Panelmember = require('../models/panelmember');

//Panelmember sign in () 
exports.signinPanelmember = async(req,res) => {
    const{ email, password } = req.body;

        try{
            //find the Panelmember by email
            const panelmember = await Panelmember.findOne({email}).select("+password");

            //if the email doesn't exist
            if (!panelmember)
                return res.status(404).json({message: "Such email doesn't exist"});

            //compare the password with provided password
            const ispasswordMatch = await bcrypt.compare(password, panelmember.password);

            //if passwords didn't match
            if(!ispasswordMatch)
                return res.status(400).json({message: "Invalid Password"});

            //creating a token
            const token = jwt.sign({email: panelmember.email, id: panelmember._id}, process.env.JWT_SECRET, {expiresIn:"1h"} )

            //joining the panelmember object and token
            res.status(200).json({result: panelmember, token})
        }catch(error){
            res.status(500).json({message: "Something went wrong", error: error.message})
        }
}


//Panelmember signup
exports.signupPanelmember = async(req,res) => {

    const { title, name, email, phoneno, password, imgUrl } = req.body;
    
    // let to=new Date(req.body.availableTimeTo)
    // let from=new Date(req.body.availableTimeFrom)
    
    // const availableTimeTo = (to.getHours() + ":" + to.getMinutes())
    // const availableTimeFrom = (from.getHours() + ":" + from.getMinutes())

    try {
        //creating a new Panelmember
        const panelmember = await Panelmember.create({ title, name, email, phoneno, password, imgUrl });

        //creating a token
        const token = jwt.sign({name: panelmember.name, id: panelmember._id, email: panelmember.email}, process.env.JWT_SECRET, {expiresIn: "1h"})
 
        //joining the panelmember  object and token as the response
        res.status(200).json({result: panelmember, token})
    }catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message})
    } 
}

//panelmember update
exports.updatePanelmember = async(req,res) => {

    let PanelmemberID = req.params.id;
    const { title, name, email, phoneno } = req.body;

    // let to=new Date(req.body.availableTimeTo)
    // let from=new Date(req.body.availableTimeFrom)
    
    // const availableTimeTo = (to.getHours() + ":" + to.getMinutes())
    // const availableTimeFrom = (from.getHours() + ":" + from.getMinutes())

    const updatePanelmember= { title, name, email, phoneno} 
    
    try{
        //find panelmember by ID  
         await Panelmember.findByIdAndUpdate(PanelmemberID ,updatePanelmember);

        res.status(200).json({message:"Panelmember updated"})
    }catch(error){
        res.status(500).json({message:"Error with updating data",error:error.message});
    }

}

//panelmember delete
exports.deletePanelmember = async(req,res) => {
    
    let panelmemberId = req.params.id;
    
    try{
        await Panelmember.findByIdAndDelete(panelmemberId);

        res.status(200).json({message:"Delete successful"});
    }catch(error){
        res.status(500).json({message: "Delete failed",error:error.message});
    }
}

exports.fetchAll =async(req,res) =>{

    Panelmember.find().then((panelmembers)=>{
        
        res.status(200).json(panelmembers)
    }).catch((error)=>{
        res.status(500).json({message:"fetching failed", error:error.message});
    })
}

exports.fetchOne =async(req,res) =>{
    let panelmemberId = req.params.id;

    await Panelmember.findById(panelmemberId)
    .then( (panelmember) =>{
        res.status(200).json(panelmember)
    }).catch( (error) =>{
        res.status(500).json({message:"Fetching failed", error:error.message});
    })
}
