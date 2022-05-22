// import React,{useState} from "react"
// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import './AddSubmission.css';
// import { OutlinedInput,InputAdornment} from "@material-ui/core";

// export default function AddSubmission(props){
//     const user = JSON.parse(localStorage.getItem('user'));
//     const studentID = user._id;
  
//     //const progressName = props.match.params.name
//     const history = useHistory()
//     const [name,setName]= useState("");
//     const [groupID,setGroupID]= useState("");
    
   
//     async function sendData(e){
//         e.preventDefault();
//         const newSubmission={
//             studentID,
//             name,
//             groupID,
//            // imgUrl    
//         }
    
//         //getting data from backend
//         await axios.post("http://localhost:8070/submission/add",newSubmission).then((res)=>{
//             alert("Submission Successful")
//             const submissionID = res.data.submission._id

          

            
//             //header with authorization token
//             const config = {
//                 headers: {
//                     "content-Type": "application/json",
//                     Authorization: `${localStorage.getItem("studentAuthToken")}`,
//                 }
//             };

//         }).catch((error)=>{
//             alert("adding failed")
//         }) 
//     }
    
//     return(
//         <div className="container" align="center">
//             <div className="card-form">
//                 <form onSubmit={sendData} className="boxAddPayment">
//                     <div className="row">
//                         <div className="col-12">
//                             <div div className="row">
//                                 <h3> Submission </h3>
//                                 <div className="col-12">
                                
//                                 </div>
//                                 <br></br>
//                                 {/* <div className="col-md-12 mb-4">
//                                     <div className="form-group">
//                                         <OutlinedInput  
//                                             type="text" id="name" placeholder="Progress Name" 
//                                             required fullWidth readOnly 
//                                             value={progressName}
//                                             inputProps={{style: {padding: 12}}}
                                            
                                            
//                                         />
//                                     </div>
//                                 </div> */}

//                                 <div className="col-md-12 mb-4">
//                                     <div className="form-group">
//                                         <OutlinedInput 
//                                             type="text" id="name" placeholder="name"
//                                             required fullWidth
//                                             onChange={(event)=> {setName(event.target.value)}}
//                                             inputProps={{style: {padding: 12}}}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-12 mb-4">
//                                     <div className="form-group">
//                                         <OutlinedInput 
//                                             type="text" id="groupID" placeholder="Group ID"
//                                             required fullWidth
//                                             onChange={(event)=> {setGroupID(event.target.value)}}
//                                             inputProps={{style: {padding: 12}}}
//                                         />
//                                     </div>
//                                 </div>
//                                 {/* <div>

//                                 </div> */}
//                             </div>
//                         </div> 
//                     </div>                       
//                     <div className="row">
//                         <div className="col-md-12">
//                             <div className="form-group">
//                                 <input className="form-submit-btn" type="submit" value="Add submit " />
//                             </div>
//                         </div>
//                     </div>       
//                 </form>                  
//             </div>
//         </div>               
//     )
// }
 
    
    

