const router = require("express").Router();
const { request } = require("express");
let Request = require("../models/Request");

//add new request
exports.addRequest = async (req, res) =>{   

    const {studentID, supervisorID, topic, batchgroup,type} = req.body;

    //object
    const newRequest = new Request({
        //initializing properties
        studentID,
        supervisorID,
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
    Request.find().then((request) => {
      res.status(200).json(request)
    }).catch((error) => {
      res.status(500).json({ message: "Error with fetching all requests", error: error.message });
    })
  }

//delete existing request
exports.deleteRequest = async (req, res) =>{
  let requestID = req.params.id;

  await Request.findByIdAndDelete(requestID).then(()=> {
      res.status(200).json({success: true, message: "Request Deleted"});
  }).catch((error) => {
      res.status(500).send({success: false, message: 'Deleting Request failed', error: error.message });
  })
}

//view one request
exports.viewOneRequest = async (req, res) => {
    let requestID =req.params.id;

    await Request.findById(requestID).then((request) => {
            res.status(200).json({success: true, status:"Request fetched", request});
        }).catch((error) =>{
            res.status(500).json({success:false, status:"fetching request failed", error: error.message});
        })
}

//update requests
exports.updateRequest = async (req, res) =>{
    let requestID = req.params.id;

    const {topic, batchgroup, type} = req.body;

    const updateRequest = {
        topic,
        batchgroup,
        type
    }
    try{
        await Request.findByIdAndUpdate(requestID, updateRequest);

        res.status(200).json({ success: true, message: "Updated" })
    }catch(error){
        res.status(500).json({ message: "Error with Updating", error: error.message });
    }
}

// exports.updateRequest = async (req, res) => {
//     //fetch id from url
//     let requestID = req.params.id;

//     let to = new Date(req.body.time)
//     const time = (to.getHours() + ":" + to.getMinutes())

//     const today = new Date(req.body.date)
//     const date = (today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate())

   

//     //check whether there's a request for the ID
//     try{
//         await Request.findByIdAndUpdate(requestID, updateRequest).populate(
//             {path:'studentID supervisorID', select:['firstname', 'lastname', 'name']});


//         //sending the successful status
//         res.status(200).json({ success: true, message: "Request updated" })
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Updating Request is failed", error: error.message })
//     }

// }

//view requests
// exports.viewRequest = async (req, res) => {
//     // get student id
//     let studentID = req.params.id;
//     let supervisorID = req.params.id;
    
//     try{
//         //find request by student id
//         const request = await Request.find({ $or: [{studentID}, {supervisorID}]}).populate(
//             {path: 'studentID supervisorID', select: ['groupname','name','title','fields', 'topic', 'batchgroup', 'imgUrl']});
//         //success message
//         res.status(200).json({ success: true, result: request})

//     }catch(error){
//         //error message
//         res.status(500).json({message: "fetching Result failed", error:error.message})
//    }
// }

