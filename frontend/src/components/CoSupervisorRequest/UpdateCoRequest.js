import React ,{useEffect, useState} from 'react'
import { useHistory } from 'react-router';
import axios from 'axios';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { TextField } from '@material-ui/core';


function UpdateCoRequest(props) {

    const [supervisorName, setsupervisorName] = useState("");
    const [topic, setTopic] = useState("");
    const [batchgroup, setBatchgroup] = useState(""); 
    const [type,setType]=useState("");
    const history=useHistory();

    const types = [
        { value: '', label: '',},
        { value: 'Approve', label: 'Approve',},
        { value: 'Reject', label: 'Reject',},];


    useEffect(()=>{
        async function fetchRequest(){
            await axios.get(`https://af-research-tool.herokuapp.com/corequest/${props.match.params.id}`).then((res)=>{
                setsupervisorName(res.data.corequest.supervisorName)
                setTopic(res.data.corequest.topic)
                setType(res.data.corequest.type)
                setBatchgroup(res.data.corequest.batchgroup)
            }).catch((error)=>{
                alert("Failed to fetch Request")
            })
        }
        fetchRequest()
    },[props]);

    async function Update(event){

        event.preventDefault();

        const updateRequest = {supervisorName ,topic, batchgroup, type}

        const config = {
            headers: {
              "content-Type": "application/json",
            }
        };

        try{
            await axios.put(`https://af-research-tool.herokuapp.com/corequest/update/${props.match.params.id}`, updateRequest, config);
            alert("Replied")
            history.push('/request/allrequest')
        }catch(error){
            alert("Replying Failed")
        }

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
                <div className="form-name">
                    <OutlinedInput
                        type="text" id="student" placeholder="Group Name" readOnly fullWidth
                        value={batchgroup}
                        inputProps={{ style: { padding: 12 } }}
                    />
                </div>
                <br></br>
                <div className="form-name">
                    <OutlinedInput
                        type="text" id="student" placeholder="Supervisor Name" readOnly fullWidth
                        value={supervisorName}
                        inputProps={{ style: { padding: 12 } }}
                    />
                </div>
                <br></br>
                <div className="form-name">
                    <OutlinedInput
                        type="text" id="student" placeholder="Group Name" readOnly fullWidth
                        value={topic}
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
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <input className="form-submit-btn" type="submit" value="Reply" /> 
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateCoRequest