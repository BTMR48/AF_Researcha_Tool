import React, { useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { blue } from '@material-ui/core/colors';
import axios from 'axios'
import TextField from '@mui/material/TextField';
import './AddCoRequest.css'

function AddCoRequest(props) {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [coSupervisorID, setcoSupervisorID] = useState("");
  const [studentID, setStudentID] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [supervisorName, setsupervisorName] = useState("")
  const [fields, setFields] = useState("");
  const [topic, setTopic] = useState("");
  const [batchgroup, setBatchgroup] = useState(""); 
  const [type,setType]=useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isAdmin,setIsAdmin]=useState(false)
  const history = useHistory()

  const config = {
    headers: {
        "content-type" : "application/json"
    }
  };

  useEffect(() => {
    if(localStorage.getItem("user")){
      setUser(JSON.parse(localStorage.getItem('user')))
    }
  
    if(localStorage.getItem("adminAuthToken")){
      setIsAdmin(true)
    }

    async function getCoSupervisorDetails(){
      axios.get(`https://af-research-tool.herokuapp.com/cosupervisor/${props.match.params.id}`, config).then((res) => {
        setcoSupervisorID(res.data._id)
        setStudentID(user._id)
        setName(res.data.name)
        setFields(res.data.fields)
        setImgUrl(res.data.imgUrl)
        setTitle(res.data.title)
        setsupervisorName(res.data.supervisorName)
        setTopic(res.data.topic)
        setBatchgroup(res.data.batchgroup)
        setType(res.data.type)

      }).catch((error) => {
        console.log(error)
        alert("Failed to fetch Co-supervisor")
      })
    }
    getCoSupervisorDetails();
  }, [props])

  function sendData(e){
    e.preventDefault();
    const newRequest ={
        coSupervisorID,
        studentID,
        topic,
        supervisorName,
        batchgroup,
        type
    }

    localStorage.setItem("cosupervisorrequest", JSON.stringify(newRequest))
    
    axios.post("https://af-research-tool.herokuapp.com/corequest/add", newRequest).then(() => {
        alert ("Successful Request")
        localStorage.removeItem("cosupervisorrequest")
        history.push(`/supervisor/ViewSupervisor`)
    }).catch((error) => {
        alert(error)
    })
  }
    
  return (
    <div className='container' align="center">
        <div className='row'>
            <div className='col-1'>
            </div>
            <div className='col-11'>
                <div className='pb-2 px-5 d-flex align-items-center justify-content-between'>
                    <h2>Request Co-Supervisor</h2>
                </div>
            </div>
        </div>

        <div className='boxUpdate px-5'>
            <div className='row'>
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
                    <div className="row">
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
                                        type="text" id="cosupervisor" placeholder="Co-Supervisor" required readOnly fullWidth
                                        value={title + ' ' + name}
                                        inputProps={{ style: { padding: 12 } }}
                                    />
                                </div>
                        </div>

                        <div className="col-md-12 mb-4 mx-3">
                                <div className="form-group">
                                    <TextField
                                        multiline rows={1}
                                        id="supervisorName" placeholder="Supervisor Name" 
                                        required fullWidth variant="outlined" 
                                        onChange={(e)=>setsupervisorName(e.target.value)}
                                        inputProps={{style: {padding: 1}}}
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
                                        inputProps={{style: {padding: 1}}}
                                    />
                                </div>
                        </div>

                        <div className="col-md-12 mb-4 mx-3">
                            <div className="form-group">
                                <TextField
                                    multiline rows={1}
                                    id="topic" placeholder="Topic Name" 
                                    required fullWidth variant="outlined" 
                                    onChange={(e)=>setTopic(e.target.value)}
                                    inputProps={{style: {padding: 1}}}
                                />
                            </div>
                        </div>

                        <div className="row">
                        <div className="col-md-12 mb-4">
                            <div className="form-group">
                                    <div>
                                        {isAdmin === true ? 
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input 
                                                        className="form-check-input" type="radio" name="Type" id="Approve" value="Approve" required
                                                        onChange={(e)=>setType(e.target.value)}
                                                    />
                                                    <label className="form-check-label" for="Approve" >
                                                         Approve
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input 
                                                        className="form-check-input" type="radio" name="Type" id="Reject" value="Reject" required
                                                        onChange={(e)=>setType(e.target.value)}
                                                    />
                                                    <label className="form-check-label" for="Reject" >
                                                         Reject
                                                    </label>
                                                </div> 
                                            </div>
                                            :
                                            <div className="form-check form-check-inline">

                                                <input 
                                                     className="form-check-input" type="radio" name="Type" id="Request" value="Request" required
                                                    onChange={(e)=>setType(e.target.value)}
                                                />
                                                <label className="form-check-label" for="Request" >
                                                     Request
                                                </label>
                                            </div>
                                        }
                                    </div>
                            </div>
                        </div>
                    </div>
                        <div className="col-12">
                            <div className="form-group">
                                <input className="form-submit-btn mb-0" type="submit" value="Request" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AddCoRequest
