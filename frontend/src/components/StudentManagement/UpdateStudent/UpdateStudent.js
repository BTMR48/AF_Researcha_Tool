import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from 'axios';
import './UpdateStudent.css';

function UpdateStudent(props) {
    
    const [groupname,setGroupName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [member1name,setMember1Name] = useState("");
    const [member2name,setMember2Name] = useState("");
    const [member3name,setMember3Name] = useState("");
    const [member4name,setMember4Name] = useState("");
    const [member1reg,setMember1Reg] = useState("");
    const [member2reg,setMember2Reg] = useState("");
    const [member3reg,setMember3Reg] = useState("");
    const [member4reg,setMember4Reg] = useState("");

    const history = useHistory();

    //fetching user data
    useEffect(()=>{
        async function fetchUser(){
            await axios.get(`https://af-research-tool.herokuapp.com/student/${props.match.params.id}`).then((res)=>{
                setGroupName(res.data.result.groupname)
                setEmail(res.data.result.email)
                setPhone(res.data.result.phone)
                setMember1Name(res.data.result.member1name)
                setMember1Reg(res.data.result.member1reg)
                setMember2Name(res.data.result.member2name)
                setMember2Reg(res.data.result.member2reg)
                setMember3Name(res.data.result.member3name)
                setMember3Reg(res.data.result.member3reg)
                setMember4Name(res.data.result.member4name)
                setMember4Reg(res.data.result.member4reg)
            }).catch((error)=>{
                alert("Failed to fetch student data")
            })
        }
        fetchUser()
    },[props]);


    //update the user
    async function Update(event){

        const updateStudent = {groupname, email, phone, member1name, member1reg, member2name, member2reg, member3name, member3reg, member4name, member4reg}

        //header with authorization token
        const config = {
            headers: {
                "content-Type": "application/json",
                Authorization: `${localStorage.getItem("studentAuthToken")}`,
            }
        };

        try {
            await axios.put(`https://af-research-tool.herokuapp.com/student/update/${props.match.params.id}`,updateStudent, config);
                alert("Updated Successfully")
                // history.push('/student/profile')
        } catch (error) {
            if(error.response.status === 401){
                alert("Authentication failed. Please Sign In again")
                history.push('/student/signin')
            } else{
                alert("Updating Failed")
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
                        <h2>My Profile</h2>
                    </div>
                </div>
            </div>
            <div className="">
                <form onSubmit={Update} encType="multipart/form-data" className="boxUpdate">
                    <div className="row">
                        <div className="col-8">
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput
                                            type="text" id="groupname" placeholder="Group Name" required fullWidth
                                            value={groupname}
                                            onChange={(event)=> {setGroupName(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                                
                                <div className="col-md-7 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput  
                                            type="email" id="email" placeholder="Email" required fullWidth
                                            value={email}
                                            onChange={(event)=> {setEmail(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-5 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput 
                                            type="tel" id="phone" placeholder="phone" required fullWidth
                                            value={phone}
                                            onChange={(event)=> {setPhone(event.target.value)}}
                                            inputProps={{style: {padding: 12}, pattern: "[0-9]{10}" }}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput 
                                            type="text" id="member1name" placeholder="1st Member Name" required fullWidth
                                            value={member1name}
                                            onChange={(event)=> {setMember1Name(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput 
                                            type="text" id="member1reg" placeholder="1st Member Reg Number" required fullWidth
                                            value={member1reg}
                                            onChange={(event)=> {setMember1Reg(event.target.value.toLowerCase())}}
                                            inputProps={{style: {padding: 12}, pattern: "([a-z|A-Z]{2}[0-9]{8})"}}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput 
                                            type="text" id="member2name" placeholder="2nd Member Name" required fullWidth
                                            value={member2name}
                                            onChange={(event)=> {setMember2Name(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput 
                                            type="text" id="member2reg" placeholder="2nd Member Reg Number" required fullWidth
                                            value={member2reg}
                                            onChange={(event)=> {setMember2Reg(event.target.value.toLowerCase())}}
                                            inputProps={{style: {padding: 12}, pattern: "([a-z|A-Z]{2}[0-9]{8})"}}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput 
                                            type="text" id="member3name" placeholder="3rd Member Name" required fullWidth
                                            value={member3name}
                                            onChange={(event)=> {setMember3Name(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput 
                                            type="text" id="member3reg" placeholder="3rd Member Reg Number" required fullWidth
                                            value={member3reg}
                                            onChange={(event)=> {setMember3Reg(event.target.value.toLowerCase())}}
                                            inputProps={{style: {padding: 12}, pattern: "([a-z|A-Z]{2}[0-9]{8})"}}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput 
                                            type="text" id="member4name" placeholder="4th Member Name" required fullWidth
                                            value={member4name}
                                            onChange={(event)=> {setMember4Name(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput 
                                            type="text" id="member4reg" placeholder="4th Member Reg Number" required fullWidth
                                            value={member4reg}
                                            onChange={(event)=> {setMember4Reg(event.target.value.toLowerCase())}}
                                            inputProps={{style: {padding: 12}, pattern: "([a-z|A-Z]{2}[0-9]{8})"}}
                                        />
                                    </div>
                                </div>
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

export default UpdateStudent
