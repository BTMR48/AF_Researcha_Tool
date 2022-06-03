import React,{useState} from "react";
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import './CosupervisorSignIn.css';

function CosupervisorLogin() {
    
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history  = useHistory();
      
    //if the authentication is already available do not need to login again

    async function signIn(event){
        event.preventDefault();

        const config = {
            headers: {
                "const-Type": "application/json"
            }
        };
        try {
            
            //getting data from backend
            const {data} = await axios.post("https://af-research-tool.herokuapp.com/cosupervisor/signin", {email, password}, config);

            //setting the cosupervisor authorization token
            localStorage.setItem("cosupervisorAuthToken", `Cosupervisor ${data.token}`)
            localStorage.setItem("user",JSON.stringify(data.result))
        
            history.push('/request/allrequest')
        } catch (error) {
            if(error.response.status === 404){
                alert("Invalid email")
            }
            else if(error.response.status === 400){
                alert("Password Incorrect")
            }
            else{
                alert("Authentication Failed")
            }
        }
    }

    return (
       
     <div className="container" align="center">
        <form className="cosupervisorSignIn" onSubmit={signIn}>
            <h2>Co-Supervisor Sign in</h2>
            <br></br>
            <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                onChange={(event) => {setEmail(event.target.value)}}
                required
            />

            <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(event) => {setPassword(event.target.value)}} 
                required 
             />
              
             <input type="submit" value="Sign In" className="form-submit-btn"/>
                
            <div className="text-muted">
             
             <p> Are you a Panelmember?<Link to="/panelmember/signin"> Click Here</Link></p>
             <p> Are you a student?<Link to="/"> Click Here</Link></p>
            </div>
        </form>
    </div>
      
    )
}

export default CosupervisorLogin;