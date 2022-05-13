import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import axios from 'axios';
import './StudentSignUp.css';



function SignUp() {

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
    const [password,setPassword] = useState("");
    const [confirmpassword,setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState();
    const history = useHistory();
    const [showMessage, setShowMessage] = useState(false)

    function passwordOnFocus(){
        setShowMessage(true)
    }

    function passwordOnBlur(){
        setShowMessage(false)
    }

    //show hide password
    function handleShowPassword(){
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    //header
    const config = {
        headers: {
            "content-Type": "application/json"
        }
    };

    //add new item
    async function register(event){
        event.preventDefault();


        if(password === confirmpassword){

            const newStudent = {groupname, email, phone, member1name, member2name, member3name, member4name, member1reg, member2reg, member3reg, member4reg, password}

            try {
                await axios.post("http://localhost:8070/student/signup", newStudent , config)
                    alert("Registration Successful")
                    history.push('/student/signin')
            } catch (error) {
                if(error.response.status === 409){
                    alert(error.response.data.message)
                }
                else{
                    alert("User Registration failed")
                } 
            }
        }else{
            alert("Passwords don't match");
        }        
    }

    
    return (
            <div className="container" align="center">
                <div className="row">
                    <div className="col-1">
                    </div>
                    <div className="col-11">
                        <div className="pb-2 px-5 d-flex align-items-center justify-content-between">
                            <h2>Sign Up</h2>
                        </div>
                    </div>
                </div>
                <div className="card-form">
                    <form onSubmit={register} className="boxSignUp">
                        <div className="row">
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-md-8 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput  
                                                type="text" id="groupname" placeholder="Group Name" 
                                                required fullWidth
                                                onChange={(event)=> {setGroupName(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-8 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput  
                                                type="email" id="email" placeholder="Email" 
                                                required fullWidth
                                                onChange={(event)=> {setEmail(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-8 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type="tel" id="phone" placeholder="Phone" required fullWidth
                                                onChange={(event)=> {setPhone(event.target.value)}}
                                                inputProps={{style: {padding: 12}, pattern: "[0-9]{10}"}}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type="tel" id="member1name" placeholder="1st Member Name" required fullWidth
                                                onChange={(event)=> {setMember1Name(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type="tel" id="member1reg" placeholder="1st Member Reg Number" required fullWidth
                                                onChange={(event)=> {setMember1Reg(event.target.value)}}
                                                inputProps={{style: {padding: 12}, pattern: '([a-z|A-Z]{2}[0-9]{8})'}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type="tel" id="member2name" placeholder="2nd Member Name" required fullWidth
                                                onChange={(event)=> {setMember2Name(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type="tel" id="member2reg" placeholder="2nd Member Reg Number" required fullWidth
                                                onChange={(event)=> {setMember2Reg(event.target.value)}}
                                                inputProps={{style: {padding: 12}, pattern: '([a-z|A-Z]{2}[0-9]{8})'}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type="tel" id="member3name" placeholder="3rd Member Name" required fullWidth
                                                onChange={(event)=> {setMember3Name(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type="tel" id="member3reg" placeholder="3rd Member Reg Number" required fullWidth
                                                onChange={(event)=> {setMember3Reg(event.target.value)}}
                                                inputProps={{style: {padding: 12}, pattern: '([a-z|A-Z]{2}[0-9]{8})'}}
                                            />
                                        </div>
                                    </div>
                                        
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type="tel" id="member4name" placeholder="4th Member Name" required fullWidth
                                                onChange={(event)=> {setMember4Name(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type="tel" id="member4reg" placeholder="4th Member Reg Number" required fullWidth
                                                onChange={(event)=> {setMember4Reg(event.target.value)}}
                                                inputProps={{style: {padding: 12}, pattern: '([a-z|A-Z]{2}[0-9]{8})'}}
                                            />
                                        </div>
                                    </div>
                                        
                                    
                                    
                                    {/* <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <OutlinedInput  
                                                type="text" id="role" placeholder="Role" 
                                                required fullWidth
                                                // onChange={(event)=> {setRole(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div> */}
                                    
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type={showPassword ? "text" : "password"}
                                                id="password" name="password" placeholder="Password" required fullWidth
                                                onChange={(event)=> {setPassword(event.target.value)}}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                    <IconButton onClick={handleShowPassword}>
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                    </InputAdornment>
                                                }
                                                inputProps={{style: {padding: 12}, pattern: "[A-Za-z0-9]{8,}"}}
                                                onFocus={passwordOnFocus}
                                                onBlur={passwordOnBlur}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <OutlinedInput 
                                                type={showPassword ? "text" : "password"}
                                                id="confirmpassword" name="confirmpassword" placeholder="Confirm Password" required fullWidth
                                                onChange={(event)=> {setConfirmPassword(event.target.value)}}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                    <IconButton onClick={handleShowPassword}>
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                    </InputAdornment>
                                                }
                                                inputProps={{style: {padding: 12}, pattern: "[A-Za-z0-9]{8,}"}}
                                                onFocus={passwordOnFocus}
                                                onBlur={passwordOnBlur}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-12 mb-4">
                                        {showMessage &&
                                            <div className="PWmessage">
                                                <p>Password must contain lowercase letters, uppercase letters, numbers and should consist minimum of 8 characters</p>
                                            </div>
                                        }
                                    </div>
                                    {/* <div className="col-md-12">
                                        <div className="form-group">
                                            <input id="terms" type="checkbox" required/>
                                            <label for="terms">&nbsp;I agree to the <Link to="/terms">Terms and Conditions</Link>.</label>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input className="form-submit-btn" type="submit" value="Sign Up" />
                                </div>
                            </div>
                        </div>
                        <p>Already have an account? <Link to="/student/signin">Sign In</Link></p>
                    </form>             
                </div>                   
            </div>
    )
}

export default SignUp