import React,{useEffect, useState} from 'react'
import { useHistory } from 'react-router';
import axios from 'axios'
import {orange,blue,red } from '@material-ui/core/colors';
import './PanelMemberDetails.css'

function PanelMemberDetails(props){
  const [isAdmin,setIsAdmin]=useState(false)
  const[id,setId]=useState("");
  const[title, setTitle] = useState("");
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[phoneno, setPhoneno] = useState("");
  const[imgUrl,setImgUrl]=useState("");
  const history=useHistory()
  const [user, setUser] = useState("");
  
  const config = {
    headers: {
        "content-Type": "application/json"
    }
  };

  useEffect(() => {
    if(localStorage.getItem("user")){
      setUser(JSON.parse(localStorage.getItem('user')))
    }
  
    if(localStorage.getItem("adminAuthToken")){
      setIsAdmin(true)
    }
     
    async function getPanelMemberDetails() {
      axios.get(`http://localhost:8070/panelmember/${props.match.params.id}`).then((res) => {
        setId(res.data.panelmember._id)  
        setTitle(res.data.panelmember.title)
        setName(res.data.panelmember.name)
        setEmail(res.data.panelmember.email)   
        setPhoneno(res.data.panelmember.phoneno)
        setImgUrl(res.data.panelmember.imgUrl)
      }).catch((error) => {
        alert("Failed to Fetch Panel Member")
      })
    }
    getPanelMemberDetails();

  }, [props]);

  return (
      <div className = "container" align="center">
          {/* <div className="detailPanelmemberCard" >     
              <div className="detailPanelmember">
                          <img src={`${imgUrl}`} alt="PanelMembertDetails" />
                  <div className="box-detailPanelmember">
                      <div className="row">
                            <h2>{title}.{name}</h2>
                            <br></br>
                            <h5>Contact Info</h5>
                            <h5>Email : {email}</h5>
                            <h5>Tel No:{phoneno}</h5>
                      </div>
                  </div>           
              </div>
          </div> */}
      </div>
  )
}

export default PanelMemberDetails
