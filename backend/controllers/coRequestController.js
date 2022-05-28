const router = require("express").Router();
let CoRequest = require('../models/coSuperRequest');

//add new Co-Supervisor Request
exports.addRequest = async (req, res) =>{   

    const {studentID, coSupervisorID, supervisorName, topic, batchgroup,type} = req.body;

    //object
    const newRequest = new CoRequest({
        //initializing properties
        studentID,
        coSupervisorID,
        supervisorName,
        topic,
        batchgroup,
        type
    })

    newRequest.save().then(() => {
        //save the objects to the database
        res.status(200).json({ success: true, message: "Request was created"})
    }).catch((error) => {
        res.status(500).json({success: false, message: "creating request is failed", error: error.message})
    })
}

//view all Request
exports.viewAllRequest = async (req, res) => { 
 
    //calling request model
    CoRequest.find().then((corequest) => {
      res.status(200).json(corequest)
    }).catch((error) => {
      res.status(500).json({ message: "Error with fetching all requests", error: error.message });
    })
  }

//delete existing request
exports.deleteRequest = async (req, res) =>{
    let corequestID = req.params.id;
  
    await CoRequest.findByIdAndDelete(corequestID).then(()=> {
        res.status(200).json({success: true, message: "Request Deleted"});
    }).catch((error) => {
        res.status(500).send({success: false, message: 'Deleting Request failed', error: error.message });
    })
  }

//update requests
exports.updateRequest = async (req, res) =>{
    let corequestID = req.params.id;

    const {supervisorName,topic, batchgroup, type} = req.body;

    const updateRequest = {
        supervisorName,
        topic,
        batchgroup,
        type
    }
    try{
        await CoRequest.findByIdAndUpdate(corequestID, updateRequest);

        res.status(200).json({ success: true, message: "Updated" })
    }catch(error){
        res.status(500).json({ message: "Error with Updating", error: error.message });
    }
}

//view one request
exports.viewOneRequest = async (req, res) => {
    let corequestID =req.params.id;

    await CoRequest.findById(corequestID).then((corequest) => {
            res.status(200).json({success: true, status:"Request fetched", corequest});
        }).catch((error) =>{
            res.status(500).json({success:false, status:"fetching request failed", error: error.message});
        })
}