const Panelgroup = require('../models/panelgroup');
// const ReservationInfo = require('../models/ReservationInfo');


//add panelgroup
exports.assignpanelgroup = async(req,res) => {
    const {panelmemberID,studentID} = req.body;

    try {
        //checking if panelmember already assigned
        const checkPanelgroup = await Panelgroup.findOne({panelmemberID,studentID})
        if(checkPanelgroup)
            return res.status(409).json({message: "Panelmember already assigned"})

        //assigning a new panelmember
        await Panelgroup.create({panelmemberID,studentID});
        //success message
        res.status(200).json({success: true,message:"Panelmember Assigned"})

    } catch (error) {
        //error message
        res.status(500).json({message: "Panelgroup Error", error: error.message})
    }
}

//delete panelgroup
exports.deletepanelgroup = async(req,res) => {
    let panelgroupId = req.params.id;

    try {
        //find a panelgroup by ID for delete
        await Panelgroup.findByIdAndDelete(panelgroupId);
        //success message
        res.status(200).json({success: true,message:"Panelgroup Deleted"})

    }catch(error){
        //error message
        res.status(500).json({message: "Can't Delete Panelgroup", error: error.message})
    }
}

//view panelgroup
exports.viewPanelgroup = async(req,res) => {
    //get student id
    let panelmemberID = req.params.id;

    try {
        //find studentgroups by panelmember id 
        const panelgroup = await Panelgroup.find({panelmemberID}).populate(
            {path:'studentID', select:['groupname','email','phone']});
        //success message
        res.status(200).json({success: true,result:panelgroup})
    }catch(error){
        //error message
        res.status(500).json({message: "Error with fetching panelgroups", error: error.message})
    }
}

//view one panelgroup
// exports.viewOneBooking = async(req,res) => {
//     //get panelgroup id
//     let bookingID = req.params.id;

//     try {
//         //find panelgroup by patient id and panelgroup
//         const panelgroup = await Panelgroup.findById(bookingID)            
//         //success message
//         res.status(200).json({success: true,result:panelgroup})
//     }catch(error){
//         //error message
//         res.status(500).json({message: "Error with fetching panelgroup", error: error.message})
//     }
// }

