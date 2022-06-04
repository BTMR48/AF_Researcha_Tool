import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import './ViewPanelMember.css';
import axios from 'axios'
import 'react-multi-carousel/lib/styles.css';
import { blue } from '@mui/material/colors'

function ViewPanelMember(){

    const[PanelMembers, setPanelMembers] = useState([])
    const history = useHistory()
    const location = useLocation()

      useEffect(() => {
          async function getViewPanelMember(){
              axios.post('https://af-research-tool.herokuapp.com/panelmember').then((res) => {
                  setPanelMembers(res.data)
              }).catch((error) => {
                  alert("Failed to fetch Panel Members")
              })
          }
          getViewPanelMember()
      },[location])

      function filterContent(data, searchTerm){
          const result = data.filter((Panelmember) =>
          Panelmember.name.toLowerCase().includes(searchTerm) ||
          Panelmember.fields.toLowerCase().includes(searchTerm)
          )
          setPanelMembers(result)
      }

      function handleSearch(event){
        const searchTerm = event.currentTarget.value
        axios.post(`https://af-research-tool.herokuapp.com/panelmember`).then((res) => {
          filterContent(res.data, searchTerm.toLowerCase())
        }).catch((error) => {
          alert("Failed to fetch Panel Members")
        })
      }

      function request(id){
        history.push(`/panelmember/${id}`)
      }

      return(
          <div>
            <div className='container' align="center">
              <div className='row'>
                <div className='col-4'>
                  <div className='pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between'>
                    <h2>Research Panel Members</h2>
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
              <div className='panelmemberGrid'>
                {PanelMembers.map((panelmember,key) => (
                  <div key={key}>
                    <div className='panelmembersCard'>
                      <div className='panelmembersImg'>
                        {panelmember.imgUrl === ""?
                          <img src="/images/avatar.jpg" className="panelmemberImgHeight" alt="panelmember"/>
                        :
                          <img src={`${panelmember.imgUrl}`} className="panelmemberImgHeight" alt="panelmember"/>
                        }
                      </div>
                      <div className='p-3'>
                        <h6>{panelmember.title} {panelmember.name}</h6>
                        <br></br>
                        <h6>Contact Info</h6>
                        <h6>Email : {panelmember.email}</h6>
                        <h6>Tel No: {panelmember.phoneno}</h6>
                        <h6 style={{color:blue[500]}}>{panelmember.fields}</h6>
                        <div align ="center">
                          {/* <button className='reqpanelmemberBtn' style={{backgroundColor:'#2f89fc'}} onClick={()=>request(panelmember._id)}> View </button> */}
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
export default ViewPanelMember