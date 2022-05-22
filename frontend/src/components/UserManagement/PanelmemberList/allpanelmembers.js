import React, {useEffect, useState} from 'react';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { red, grey } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';

import './allpanelmembers.css'


function AllPanelmembers() {

    const [panelmembers, setPanelmembers] = useState([]);
    // const [isAdmin,setIsAdmin]=useState(false)
    const history = useHistory()
   
 
    useEffect(() => {        
        // if(localStorage.getItem("adminAuthToken")){
        //     setIsAdmin(true)
        //   }else{
        //     setIsAdmin(false)
        //   }
          async function getPanelmembers() {
            axios.post(`http://localhost:8070/panelmember`).then((res) => {
              setPanelmembers(res.data)  
            }).catch((error) => {
              alert("Failed to fetch Panelmembers")
            })
          }
      
          getPanelmembers()
    })

    async function onDelete(id) {
        const config = {
          headers: {
            "content-Type": "application/json"
          }
        };

        await axios.delete(`http://localhost:8070/panelmember/delete/${id}`, config).then(() => {
        alert("Panelmember deleted successfully")
        setPanelmembers(panelmembers.filter(element => element._id !== id))
        }).catch((error) => {
        alert(`Failed to delete the Panelmember`)
        })
    }

    function filterContent (data, searchTerm){
        
        const result = data.filter((panelmember) =>
            panelmember.name.toLowerCase().includes(searchTerm) ||
            panelmember.fields.map(str => str.toLowerCase().includes(searchTerm))
        )
        setPanelmembers(result)
    }

    function handleSearch(event){
      const searchTerm = event.currentTarget.value
      axios.post(`http://localhost:8070/panelmember`).then((res) => {
          filterContent(res.data, searchTerm.toLowerCase())
      }).catch((error)=>{
          alert(error)
      })
    }

    function update(id) {
        history.push(`/panelmember/update/${id}`)
      }

    function addSupervisor(){
        history.push(`/panelmember/signup`)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                     <h2>Panelmembers</h2>
                    </div>
                   
                </div>

                <br/>

                <div className="col-3">
                </div>

                <div className="col-5">
                    <div className="px-3 search" align="center">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search Panelmembers"
                            onChange={handleSearch}
                            required
                        />
                    </div>
                </div>
            </div>
            {/* {isAdmin &&  */}
                <div align="center">
                    <button className="addStaffBtn" style={{backgroundColor:'#0376c4'}} onClick={()=>addSupervisor()}> Add Panelmember </button>
                </div>
            {/* } */}
            <br/>

            <div className="blue-table">
                <div className="blue-table, box-view-list">
                    <table>
                        <thead >
                            <tr>
                                <th style={{ textAlign: 'center' }}>Name</th>
                                <th style={{ textAlign: 'center' }}>Email</th>
                                <th style={{ textAlign: 'center' }}>Phone</th>
                                <th style={{ textAlign: 'center' }}></th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: 'center' }}>
                            {panelmembers.map((Panelmember,key) => (
                            <tr key={key}>
                            
                                <td>
                                    {
                                      <h6>{Panelmember.title + " " + Panelmember.name}</h6>
                                    }
                                </td>
                            
                                <td>
                                    <h6>{Panelmember.email}</h6>
                                </td>

                                <td>
                                    <h6>{Panelmember.phoneno}</h6>
                                </td>

                                <td>
                                    {/* { isAdmin ? "" : */}
                                        <div style={{verticalAlign:'middle'}}>
                                            <IconButton onClick={() => update(Panelmember._id)}>
                                                <EditIcon style={{ color: grey[500] }} ></EditIcon>
                                            </IconButton>
                                            <IconButton onClick={() => onDelete(Panelmember._id)}>
                                                <DeleteIcon style={{ color: red[500] }} ></DeleteIcon>
                                            </IconButton>
                                        </div>
                                    {/* } */}
                                </td>
                                
                            </tr> 
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>   
        </div>
    )
}

export default AllPanelmembers