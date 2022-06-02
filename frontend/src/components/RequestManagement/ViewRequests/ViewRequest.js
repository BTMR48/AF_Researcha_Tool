import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import 'react-multi-carousel/lib/styles.css';
import { blue, red, orange } from '@mui/material/colors'
import './ViewRequest.css'
import ViewCorequest from '../../CoSupervisorRequest/ViewCorequest';

function ViewRequest() {

  const[requests, setRequests] = useState([])
  const history = useHistory()
  const location = useLocation()

  const [isSupervisor,setIsSupervisor]=useState(false)
  const [isCoSupervisor,setIsCoSupervisor]=useState(false)
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
  
    if(localStorage.getItem("supervisorAuthToken")){
        setIsSupervisor(true)
    }

    if(localStorage.getItem("cosupervisorAuthToken")){
      setIsCoSupervisor(true)
    }

      async function getViewRequests(){
          axios.get('http://localhost:8070/request/').then((res) => {
              setRequests(res.data)
          }).catch((error) => {
              alert("Failed to fetch Supervisors")
          })
      }
      getViewRequests()
    },[location])

    async function deleteRequest(id){
      await axios.delete(`http://localhost:8070/request/delete/${id}`,config).then(() => {
        alert("Cancel Request")
        history.push('/request/allrequest/')
      }).catch((error) => {
        alert(`Cancellation Failed\n${error.message}`)
      }) 
    }

    function view(id){
      history.push(`/request/update/${id}`)
    }
  
  return (
    <div className="container">
      <div className="row">
          <div className="col-4">
            {isCoSupervisor === false ?
              <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                  <h2>Supervisor Requests</h2>
              </div>
              :
              <div></div>
            }
          </div>
      </div>
          <div className="col-5">
          {isCoSupervisor === false ?
            <div className="requestGrid"  > 
                    {requests.map((Request,key) => (
                      <div key={key}>
                        <div className='RequestCard'>
                          <div className='p-3'>
                            <h6>{Request.topic}</h6>
                            <h6 style={{color:blue[500]}}>{Request.batchgroup}</h6>
                            <h6 style={{color:red[300]}}>{Request.type}</h6>
                            <div align ="center">
                                <div>
                                  {isSupervisor === true ?
                                    <div>
                                      <button className='cancelBtn' style={{backgroundColor:orange[500]}} onClick={()=>view(Request._id)}> Reply </button>
                                    </div>
                                    :
                                    <div>
                                      <button className='cancelBtn' style={{backgroundColor:orange[500]}} onClick={()=>deleteRequest(Request._id)}> Cancel </button>
                                    </div>
                                  }
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
            </div>
          :
            <div></div>  
          }
          </div>
          <br></br>
          <div>
        
            {isSupervisor === false ?
              <div>
                <ViewCorequest />
              </div>
              :
              <div></div>
            }
          </div>
    </div>
  )
}

export default ViewRequest