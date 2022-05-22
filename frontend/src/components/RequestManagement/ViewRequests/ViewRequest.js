import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import 'react-multi-carousel/lib/styles.css';
import { blue } from '@mui/material/colors'
import './ViewRequest.css'

function ViewRequest() {

  const[requests, setRequests] = useState([])
  const history = useHistory()
  const location = useLocation()

  const config = {
    headers: {
        "content-Type": "application/json"
    }
  };

  useEffect(() => {
      async function getViewRequests(){
          axios.get('http://localhost:8070/request').then((res) => {
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

    
  return (
    <div className="container">
      <div className="row">
          <div className="col-4">
            <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                <h2>Supervisor Requests</h2>
            </div>
          </div>
      </div>
          <div className="col-5">
            <div className="requestGrid"  > 
                    {requests.map((Request,key) => (
                      <div key={key}>
                        <div className='RequestCard'>
                          <div className='p-3'>
                            <h6>{Request.topic}</h6>
                            <h6 style={{color:blue[500]}}>{Request.batchgroup}</h6>
                            <div align ="center">
                              <button className='cancelBtn' style={{backgroundColor:'#2f89fc'}} onClick={()=>deleteRequest(Request._id)}> Cancel </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
            </div>
          </div>
    </div>
  )
}

export default ViewRequest