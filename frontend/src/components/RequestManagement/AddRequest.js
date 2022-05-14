import React, { useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { blue } from '@material-ui/core/colors';
import './Request.css';
import axios from 'axios'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import TimePicker from '@mui/lab/TimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';



function AddRequest(props) {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [supervisorID, setSupervisorID] = useState("");
    const [studentID, setStudentID] = useState("");
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [fields, setFields] = useState("");
    const [topic, setTopic] = useState("");
    const [time, setTime] = useState(new Date('2021-09-10T14:20:00'));
    const [date, setDate] = useState(new Date());  
    const [imgUrl, setImgUrl] = useState("");
    const history = useHistory() 
    
    const config = {
        headers: {
            "content-type" : "request/json"
        }
    };

    useEffect(() => {
        async function getSupervisorDetails(){
            axios.get(`http://localhost:8070/supervisor/${props.match.params.id}`, config).then((res) => {
                setSupervisorID(res.data._id)
                setStudentID(user._id)
                setName(res.data.name)
                setFields(res.data.fields)
                setTopic(res.data.topic)
                setImgUrl(res.data.imgUrl)
                setTitle(res.data.title)
            }).catch((error) => {
                console.log(error)
                alert("Failed to fetch supervisor")
            })
        }
        getSupervisorDetails();
    }, [props])

    const startDate = new Date();

    function disablePrevDates(startDate) {
      const startSeconds = Date.parse(startDate);
      return (date) => {
        return Date.parse(date) < startSeconds;
      }
    }

    function sendData(e){
        e.preventDefault();
        const newRequest ={
            supervisorID,
            studentID,
            fields,
            topic,
            title,
            time,
            date
        }
        localStorage.setItem("request", JSON.stringify(newRequest))
        history.push(`/student/requestconfirm`)
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
            <div className='row'>
                <div className='col-5 green-card mt-4 p-5'>
                </div>
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
            </div>
            <div className='row'>
                <h4>{title} {name}</h4>
                <h5 style={{ color: blue[500] }}>{fields}</h5>
                <p className="mb-0">{topic}</p>
            </div>
        </div>

        <form onSubmit={ sendData }className="col-6 mt-5">
        <div className="row">
            <div className="col-md-12 mb-4 mx-3">
                <div className="form-group">
                <OutlinedInput
                    type="text" id="student" placeholder="Group Name" readOnly fullWidth
                    value={user.groupname + '' }
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
                  <OutlinedInput
                    type="text" id="topic" placeholder="Topic Name" required readOnly fullWidth
                    value={ ' ' }
                    inputProps={{ style: { padding: 12 } }}
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
  )
}

export default AddRequest