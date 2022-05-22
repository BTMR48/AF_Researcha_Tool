import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from 'axios';
import './AssignPanelmember.css';

function AssignPanelmember(props) {
    
    const [assignedpanel,setAssignedPanel] = useState("");
    const [panelmembers,setPanelmembers] = useState("");
    const history = useHistory();

    //fetching user data
    useEffect(()=>{
        async function fetchUser(){
            await axios.get(`http://localhost:8070/student/${props.match.params.id}`).then((res)=>{
                setAssignedPanel(res.data.result.panelmember)
                console.log(res)
            }).catch((error)=>{
                alert("Failed to fetch student data")
            })
        }
        fetchUser()
    },[props]);

    //fetching panelmember data
    useEffect(()=>{
        async function fetchPanelmember(){
            await axios.post(`http://localhost:8070/panelmember`).then((res)=>{
                setPanelmembers(res.data)
                console.log(res)
            }).catch((error)=>{
                alert("Failed to fetch panelmember data")
            })
        }
        fetchPanelmember()
    })

    //update the user
    async function Update(event){

        event.preventDefault();

        const updateStudent = {panelmembers}

        //header with authorization token
        const config = {
            headers: {
                "content-Type": "application/json",
                Authorization: `${localStorage.getItem("adminAuthToken")}`,
            }
        };

        try {
            await axios.put(`http://localhost:8070/student/update/${props.match.params.id}`,updateStudent, config);
                alert("Added Successfully")
                history.push('/student/profile')
        } catch (error) {
            if(error.response.status === 401){
                alert("Authentication failed. Please Sign In again")
                history.push('/student/signin')
            } else{
                alert("Adding Failed")
            }
        }    
    }

    return (
        <div className="container" align="center">
            <div className="row">
                <div className="col-1">
                </div>
                 <div className="col-11">
                    <div className="pb-2 px-5 d-flex align-items-center justify-content-between">
                        <h2>Add Panel Member</h2>
                    </div>
                </div>
            </div>
            <div className="">
                <form onSubmit={Update} encType="multipart/form-data" className="boxUpdate">
                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <div className="form-group">
                                <tbody style={{ textAlign: 'center' }}>

                                    {panelmembers.map((Panelmember,key) => (
                                    <tr key={key}>
                                    
                                        <td>
                                            <h6>{Panelmember.name}</h6>                                        
                                        </td>
                                    
                                        <td>
                                            <h6>{Panelmember.email}</h6>
                                        </td>

                                        <td>
                                            <h6>{Panelmember}</h6>
                                        </td>
                                        
                                    </tr> 
                                    ))}
                                
                                </tbody>
                                                                
                            </div>
                        </div>
                    </div>   
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input className="form-submit-btn mb-0" type="submit" value="Update" />
                            </div> 
                        </div>
                    </div> 
                </form>     
            </div>                    
        </div>
    )
}

export default AssignPanelmember
