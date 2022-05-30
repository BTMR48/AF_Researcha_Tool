import React ,{useEffect, useState} from 'react'
import { useHistory } from 'react-router';
import axios from 'axios';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { TextField } from '@material-ui/core';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import './UpdateTopicSubmission.css'

function UpdateTopicSubmission(props) {

    const [groupname, setGroupname] = useState("");
    const [supervisorName, setSupervisorName] = useState("");
    const [cosupervisorName, setCoSupervisorName] = useState("");
    const [submissionDoc, setsubmissionDoc] = useState("");
    const [topic, setTopic] = useState("");
    const [type, setType] = useState("");
    const [feedback, setFeedback] = useState("");
    const [viewPdf, setViewPdf] = useState("")
    const history=useHistory();

    const types = [
        { value: '', label: '',},
        { value: 'Approve', label: 'Approve',},
        { value: 'Reject', label: 'Reject',},];


    useEffect(()=>{
        async function fetchSubmission(){
          await axios.get(`http://localhost:8070/topiceval/view/${props.match.params.id}`).then((res)=>{
            setGroupname(res.data.topiceval.groupname)
            setSupervisorName(res.data.topiceval.supervisorName)
            setCoSupervisorName(res.data.topiceval.cosupervisorName)
            setsubmissionDoc(res.data.topiceval.submissionDoc)
            setTopic(res.data.topiceval.topic)
            setType(res.data.topiceval.type)
            setFeedback(res.data.topiceval.feedback)
          }).catch((error)=>{
            alert(error)
          })
        }
        fetchSubmission()
    },[props]);

    async function Update(event){

        event.preventDefault();

        const updateSubmission = {groupname, supervisorName, cosupervisorName ,submissionDoc,topic,feedback, type}

        const config = {
            headers: {
              "content-Type": "application/json",
            }
        };

        try{
            await axios.put(`http://localhost:8070/topiceval/update/${props.match.params.id}`, updateSubmission, config);
            alert("Updated")
            // history.push('/topiceval/allrequest')
        }catch(error){
            alert("updating Failed")
        }

    }

    function fetchPdf(viewPdf) {
        window.open(viewPdf);
    }


  return (
    <div className="container" align="center" >
        <div className="row">
            <div className="col-12">
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                    <h2>Make Approvals</h2>
                </div>
            </div>
        </div>
        <div className='updateRequest'>
            <form onSubmit={Update} className='RequestUpdate'>
                <div className='row'>
                    <div className='col-8'>
                        <div className='row'>
                            <div className='col-md-8 mb-4'>
                                <div className="form-name">
                                    <OutlinedInput
                                        type="text" id="student" placeholder="Group Name" readOnly fullWidth
                                        value={groupname}
                                        inputProps={{ style: { padding: 12 } }}
                                    />
                                </div>
                                <br></br>
                                <div className="form-name">
                                    <OutlinedInput
                                        type="text" id="student" placeholder="Topic" readOnly fullWidth
                                        value={topic}
                                        inputProps={{ style: { padding: 12 } }}
                                    />
                                </div>
                                <br></br>
                                <div className="form-name">
                                    <OutlinedInput
                                        type="text" id="student" placeholder="Supervisor" readOnly fullWidth
                                        value={supervisorName}
                                        inputProps={{ style: { padding: 12 } }}
                                    />
                                </div>
                                <br></br>
                                <div className="form-name">
                                    <OutlinedInput
                                        type="text" id="student" placeholder="Co-Supervisor" readOnly fullWidth
                                        value={cosupervisorName}
                                        inputProps={{ style: { padding: 12 } }}
                                    />
                                </div>
                                <br></br>
                                <div className="row">
                                    <div className="col-md-12 mb-4">
                                        <div className="form-group">
                                            <TextField 
                                                id="type"
                                                select
                                                SelectProps={{
                                                native: true,
                                                }}
                                                variant="outlined"
                                                fullWidth
                                                value={type}
                                                onChange={(event)=> {setType(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                                >
                                                {types.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                {option.label}
                                                </option>
                                                ))}
                                                </TextField>
                                        </div>  
                                    </div>
                                </div>
                                    <div className="form-name">
                                            <OutlinedInput
                                                type="text" id="feedback" placeholder="Feedback" 
                                                required fullWidth
                                                onChange={(e)=>setFeedback(e.target.value)}
                                                inputProps={{style: {padding: 12}}} 
                                            />
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-4 d-flex justify-content-center'>
                        <div className="pfdCard" align="center">

                            <p><b>Topic Details Document</b></p>
                            <br></br>
                                <IconButton onClick={() => fetchPdf(submissionDoc)}>
                                    <PictureAsPdfIcon style={{ color: red[500], backgroundPosition: 'center', width:'100', height:'100' }}></PictureAsPdfIcon>
                                </IconButton>
                        </div>
                        {/* submitted document download */}
                    </div> 
                </div>               
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <input className="form-submit-btn" type="submit" value="Update" /> 
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    )
}

export default UpdateTopicSubmission