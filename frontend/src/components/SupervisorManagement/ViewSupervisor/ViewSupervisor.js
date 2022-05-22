import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import './ViewSupervisor.css'
import axios from 'axios'
import 'react-multi-carousel/lib/styles.css';
import { blue } from '@mui/material/colors'

function ViewSupervisor(){

    const[supervisors, setSupervisors] = useState([])
    const history = useHistory()
    const location = useLocation()

      useEffect(() => {
          async function getViewSupervisor(){
              axios.post('http://localhost:8070/supervisor').then((res) => {
                  setSupervisors(res.data)
              }).catch((error) => {
                  alert("Failed to fetch Supervisors")
              })
          }
          getViewSupervisor()
      },[location])

      function filterContent(data, searchTerm){
          const result = data.filter((Supervisor) =>
          Supervisor.name.toLowerCase().includes(searchTerm) ||
          Supervisor.fields.toLowerCase().includes(searchTerm)
          )
          setSupervisors(result)
      }

      function handleSearch(event){
        const searchTerm = event.currentTarget.value
        axios.post(`http://localhost:8070/supervisor`).then((res) => {
          filterContent(res.data, searchTerm.toLowerCase())
        }).catch((error) => {
          alert("Failed to fetch Supervisors")
        })
      }

      function request(id){
        history.push(`/student/request/${id}`)
      }

      return(
          <div>
            <div className='container' align="center">
              <div className='row'>
                <div className='col-4'>
                  <div className='pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between'>
                    <h2>Research Supervisors</h2>
                  </div>
                </div>
                <div className='col-3'>
                </div>
                <div className='col-5'>
                    <div className='px-3 search' align="right">
                      <input
                        type="text"
                        name='search'
                        id='search'
                        placeholder='Search'
                        onChange={handleSearch}
                        required
                        />
                      </div>
                </div>
              </div>
              <div className='supervisorGrid'>
                {supervisors.map((Supervisor,key) => (
                  <div key={key}>
                    <div className='supervisorsCard'>
                      <div className='supervisorsImg'>
                        {Supervisor.imgUrl === ""?
                          <img src="/images/avatar.jpg" className="supervisorImgHeight" alt="supervisor"/>
                        :
                          <img src={`${Supervisor.imgUrl}`} className="supervisorImgHeight" alt="supervisor"/>
                        }
                      </div>
                      <div className='p-3'>
                        <h6>{Supervisor.name}</h6>
                        <h6 style={{color:blue[500]}}>{Supervisor.fields}</h6>
                        <div align ="center">
                          <button className='reqSupervisorBtn' style={{backgroundColor:'#2f89fc'}} onClick={()=>request(Supervisor._id)}> Request </button>
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
export default ViewSupervisor