import { useState } from 'react';
import axios from 'axios';
import './AddFeedback.css'
import Button from '@material-ui/core/Button';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { TextField } from '@material-ui/core';


function AddFeedback(props) {
    const[mark,setMark]=useState(""); 
    const[feedback,setFeedback]=useState("");


    async function add(event){
        event.preventDefault();
        const config = {
            headers: {
                "content-Type": "application/json"
            }
        };
        
        const newFeedback = {mark,feedback}
        console.log(newFeedback)
        try {
            await axios.post(`http://localhost:8070/submission/${props.match.params.grpId}&${props.match.params.proId}`, newFeedback , config)
            alert("Feedback Added Successfully")  
            event.target.reset(); 
        }catch (error) {         
            alert("Feedback can't be Added");
        }
    }
    
    return (
    <div className="container" align="center" >
        <div className="row">
            <div className="col-12">
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                    <h2>&nbsp;Submission Feedback</h2>
                </div>
            </div>
        </div>
        <br></br>
        <div className="create_progress">
            <form onSubmit={add} className="addProgress">
                <div className="row">
                    <div className="col-8">
                        <div className="row">
                            <div className="col-md-8 mb-4">
                                <div className="form-name">
                                    <OutlinedInput
                                        type="text" id="name" placeholder="Submission mark" 
                                        required fullWidth
                                        onChange={(e)=>setMark(e.target.value)}
                                        inputProps={{style: {padding: 12}}} 
                                    />
                                </div>
                            </div>
                                               
                            <div className="col-md-10 mb-4">
                                <div className="form-description">
                                    <TextField
                                        multiline rows={3}
                                        id="description" placeholder="Submission feedback" 
                                        required fullWidth variant="outlined" 
                                        onChange={(e)=>setFeedback(e.target.value)}
                                        inputProps={{style: {padding: 12}}}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <input className="form-submit-btn" type="submit" value="Submit Feedback" />
                        </div>
                    </div>
                </div>
            </form>            
        </div>                    
    </div>


        
    )
}

export default AddFeedback
