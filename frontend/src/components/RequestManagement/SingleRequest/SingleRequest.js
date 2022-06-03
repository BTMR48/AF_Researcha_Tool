import React ,{useEffect, useState} from 'react'
import './SingleRequest.css'
import { useHistory } from 'react-router';
import {blue} from '@material-ui/core/colors';
import axios from 'axios'

function SingleRequest(props) {

    const [isAdmin,setIsAdmin]=useState(false)
    const [id,setId] = useState("");
    const [topic, setTopic] = useState("");
    const [batchgroup, setBatchgroup] = useState("");
    const [type,setType]=useState("");
    const history=useHistory()
    const [user, setUser] = useState("");

    useEffect(() => {
        if(localStorage.getItem("user")){
            setUser(JSON.parse(localStorage.getItem('user')))
        }
        
        if(localStorage.getItem("adminAuthToken")){
            setIsAdmin(true)
        }
        
        // async function getSingleRequest() {
        //     axios.get(`https://af-research-tool.herokuapp.com/request/${props.match.params.id}`).then((res) => {
        //         setId(res.data.request._id) 
        //         setTopic(res.data.request.topic)
        //         setType(res.data.request.type)
        //         setBatchgroup(res.data.request.batchgroup)   
        //     }).catch((err) => {
        //         alert("Failed to Fetch Request")
        //     })
        // }
        // getSingleRequest();
        
    }, [props])

    function update(uid){
        history.push(`/request/update/${uid}`)
    }

  return (
      <div></div>
    // <div className='container' align='center'>
    //     <div className='detailRequestCard'>
    //         <div>
    //             <div >
    //                 <h2>{batchgroup}</h2>
    //                 <p>{topic}</p>
    //                 <h6>{type}</h6>
    //             </div>
    //         </div>
    //         <table className='singleRequestBtn'>
    //             <div>
    //                 {isAdmin === true ?
    //                     <div>
    //                         <button className='updateBtn' style={{backgroundColor:blue[400]}} onClick={()=>update(Request._id)}> Update </button>
    //                     </div>
    //                     :
    //                     <div></div>
    //                 }
    //             </div>
    //         </table>
    //     </div>
    // </div>
  )
}

export default SingleRequest