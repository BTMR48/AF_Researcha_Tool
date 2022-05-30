import React ,{useEffect, useState} from 'react'
import { useHistory } from 'react-router';
import axios from 'axios';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { TextField } from '@material-ui/core';
import './UpdateRequest.css';

function UpdateRequest(props) {

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
          await axios.get(`http://localhost:8070/request/${props.match.params.id}`).then((res)=>{
             setTopic(res.data.request.topic)
             setType(res.data.request.type)
             setBatchgroup(res.data.request.batchgroup)
          }).catch((error)=>{
            alert("Failed to fetch Request")
          })
        }
        fetchRequest()
      },[props]);

      async function Update(event){

        event.preventDefault();

        const updateRequest = {topic, batchgroup, type}

        const config = {
            headers: {
              "content-Type": "application/json",
            }
        };

        try{
            await axios.put(`http://localhost:8070/request/update/${props.match.params.id}`, updateRequest, config);
            alert("Updated")
            history.push('/request/allrequest')
        }catch(error){
            alert("updating Failed")
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
                        type="text" id="student" placeholder="Topic" readOnly fullWidth
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
                            <input className="form-submit-btn" type="submit" value="Update" /> 
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    )
}

export default UpdateRequest