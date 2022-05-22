import React, { useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { blue } from '@material-ui/core/colors';
import './Request.css';
import axios from 'axios'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

function AddRequest(props) {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [supervisorID, setSupervisorID] = useState("");
    const [studentID, setStudentID] = useState("");
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [fields, setFields] = useState("");
    const [topic, setTopic] = useState("");
    const [batchgroup, setBatchgroup] = useState(""); 
    const [imgUrl, setImgUrl] = useState("");
    const history = useHistory()

    
    const config = {
        headers: {
            "content-type" : "application/json"
        }
    };

    useEffect(() => {

        async function getSupervisorDetails(){
            axios.get(`http://localhost:8070/supervisor/${props.match.params.id}`, config).then((res) => {
                setSupervisorID(res.data._id)
                setStudentID(user._id)
                setName(res.data.name)
                setFields(res.data.fields)
                setImgUrl(res.data.imgUrl)
                setTitle(res.data.title)
                setTopic(res.data.topic)
                setBatchgroup(res.data.batchgroup)
            }).catch((error) => {
                console.log(error)
                alert("Failed to fetch supervisor")
            })
        }
        getSupervisorDetails();
    }, [props])

    
    function sendData(e){
        e.preventDefault();
        const newRequest ={
            supervisorID,
            studentID,
            topic,
            batchgroup
        }

        localStorage.setItem("supervisorrequest", JSON.stringify(newRequest))
        
        axios.post("http://localhost:8070/request/add", newRequest).then(() => {
            alert ("Successful Request")
            localStorage.removeItem("supervisorrequest")
            history.push(`/supervisor/ViewSupervisor`)
        }).catch((error) => {
            alert(error)
        })
    }


    return (
        <div className='container' align = "center">
            <div className='row'>
                <div className='col-1'>
                </div>
                <div className='col-11'>
                    <div className='pb-2 px-5 d-flex align-items-center justify-content-between'>
                        <h2>Request Supervisor</h2>
                    </div>
                </div>
            </div>

            <div className='boxUpdate px-5'>
                < div className='row'>
                    <div div className='col-5 green-card mt-4 p-5'>
                        <img src={`${imgUrl}`} className='previewImg' alt="profile pic" />
                            <div className='form-group'>
                                <label htmlFor='profilepic'>
                                    <input
                                        style={{display: 'none'}}
                                        id="profilepic"
                                        name="profilepic"
                                        type="file"
                                        />
                                </label>
                            </div>
    
                        <div className='row'>
                            <h4>{title} {name}</h4>
                            <h5 style={{ color: blue[500] }}>{fields}</h5>
                        </div>
                    </div>

                    <form onSubmit={ sendData}className="col-6 mt-5">
                        < div className="row">
                            <div className="col-md-12 mb-4 mx-3">
                                <div className="form-group">
                                    <OutlinedInput
                                        type="text" id="student" placeholder="Group Name" readOnly fullWidth
                                        value={user.groupname}
                                        inputProps={{ style: { padding: 12 } }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 mb-4 mx-3">
                                <div className="form-group">
                                    <OutlinedInput
                                        type="text" id="supervisor" placeholder="Supervisor" required readOnly fullWidth
                                        value={title + ' ' + name}
                                        inputProps={{ style: { padding: 12 } }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 mb-4 mx-3">
                                <div className="form-group">
                                    <TextField
                                        multiline rows={1}
                                        id="batchgroup" placeholder="Batch Group (EX: SE_REG_2020)" 
                                        required fullWidth variant="outlined" 
                                        onChange={(e)=>setBatchgroup(e.target.value)}
                                        inputProps={{style: {padding: 12}}}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12 mb-4 mx-3">
                                <div className="form-group">
                                    <TextField
                                        multiline rows={2}
                                        id="topic" placeholder="Topic Name" 
                                        required fullWidth variant="outlined" 
                                        onChange={(e)=>setTopic(e.target.value)}
                                        inputProps={{style: {padding: 12}}}
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <input className="form-submit-btn mb-0" type="submit" value="Make a Request" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default AddRequest