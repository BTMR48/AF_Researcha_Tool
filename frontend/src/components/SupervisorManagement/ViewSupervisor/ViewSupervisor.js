import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import './ViewSupervisor.css'
import axios from 'axios'
import 'react-multi-carousel/lib/styles.css';
import { blue , orange } from '@mui/material/colors'
import Carousel from 'react-multi-carousel';
import ViewCoSupervisor from '../../CosupervisorManagement/ViewCoSupervior/ViewCoSupervior';

function ViewSupervisor(){

    const[supervisors, setSupervisors] = useState([])
    const history = useHistory()
    const location = useLocation()

    const responsive = {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    };
    

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
          Supervisor.fields.toString().toLowerCase().includes(searchTerm)
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
                    <h2>Supervisors</h2>
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
              <Carousel wipeable={true}  responsive={responsive} autoPlay={true} autoPlaySpeed={2000} infinite={true} className="px-5 py-5 mb-2"> 
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
                          <button className='reqSupervisorBtn' style={{backgroundColor:orange[500]}} onClick={()=>request(Supervisor._id)}> Request </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
              <div></div>
              <br></br>
              <br></br>
              < ViewCoSupervisor />
            </div>
          </div>
      )

}
export default ViewSupervisor