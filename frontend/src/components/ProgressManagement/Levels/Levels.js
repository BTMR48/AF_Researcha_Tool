import React,{useEffect, useState} from 'react'
import { useHistory,useLocation } from 'react-router';
import './Levels.css'
import axios from 'axios'
import { red,blue } from '@mui/material/colors';
//import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
//import {AddToCart} from './../../../Utils/CartUtils'
//import GetAppIcon from '@material-ui/icons/GetApp'

function ProgressLevel() {
  const [isAdmin,setIsAdmin]= useState(false)
  const [progresses, setProgresses] = useState([])
  const history = useHistory()
  const location = useLocation()
  const [user, setUser] =  useState("");

  useEffect(() => { 
    if(localStorage.getItem("user")){
      setUser(JSON.parse(localStorage.getItem('user')))
    }
    if(localStorage.getItem("adminAuthToken")){
      setIsAdmin(true)
    }
    async function getAllProgress() {
      axios.get(`https://af-research-tool.herokuapp.com/progress`).then((res) => {
        setProgresses(res.data)  
      }).catch((error) => {
        alert("Failed to fetch Progress")
      })
    }

    async function getPublishProgress() {
      axios.get(`https://af-research-tool.herokuapp.com/progress/PUBLISH`).then((res) => {
        setProgresses(res.data.result) 
      }).catch((error) => {
        alert("Failed to fetch progresses")
      })
    }

    if(isAdmin === true){
      getAllProgress();
    }else{
      getPublishProgress();
    }
  }, [location,isAdmin])
  
  function filterContent(data, searchTerm){
    const result = data.filter((progress) => 
    progress.name.toLowerCase().includes(searchTerm) 
    )
    setProgresses(result)
  }

  function handleSearch(event){
    const searchTerm = event.currentTarget.value
    axios.get(`https://af-research-tool.herokuapp.com/progress/PUBLISH`).then((res) => {
      filterContent(res.data.result, searchTerm.toLowerCase())
    }).catch((error) => {
      alert("Failed to fetch progress")
    })
  }

  function handleSearchAll(event){
    const searchTerm = event.currentTarget.value
    axios.get(`https://af-research-tool.herokuapp.com/progress`).then((res) => {
      filterContent(res.data, searchTerm.toLowerCase())
    }).catch((error) => {
      alert("Admin Failed to fetch progress")
    })
  }
  function view(id){
    history.push(`/evolution/level/${id}`)
  }
  
  function addProgress(){
    history.push(`/evolution/addProgress`)
  }
//   function ProductHistory(){
//     navigate(`/pharmacy/product/history`)
// }
    return (
        <div className="container">
          <div className="row">
              <div className="col-4">
                <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                    <h2>Progress Levels </h2>
                </div>
              </div>
              <div className="col-3">
              </div>
              <div className="col-5">
              
              {isAdmin === true ?
                <div className="px-3 search" align="right">
                  <input 
                    type="text" 
                    name="search" 
                    id="search"
                    placeholder="Search" 
                    onChange={handleSearchAll} 
                    required 
                  />
                </div>
                :
                <div className="px-3 search" align="right">
                    <input 
                      type="text" 
                      name="search" 
                      id="search"
                      placeholder="Search" 
                      onChange={handleSearch} 
                      required 
                    />
                </div> 
              }  
          </div>
        </div>
        <div className="progressGrid"  > 
          {isAdmin && 
            <Button  className="mx-2 progressBtn" style={{backgroundColor:blue[400],color:'white'}} onClick={()=>addProgress()}>
            Add Progress <AddIcon/>
            </Button>  
          }
          {progresses.map((Progress,key)=>( 
                <div key={key}> 
                    <div className="progressCard" >
                        
                        <div className="p-3">
                            <h2>{Progress.name}</h2>
                            <h6>{Progress.description}</h6>
                            &nbsp; <h6>{Progress.date}</h6>
                            <div align="right">
                              <span> 
                                  {/* <button className="progressBtn" style={{backgroundColor:orange[600]}}
                                    onClick={()=>AddToCart(Progress._id, 
                                    //user._id, 
                                    Progress.date)}> 
                                    <ShoppingCartIcon/> 
                                  </button> */}
                                  &nbsp;&nbsp;&nbsp;
                                  <button className="progressBtn" style={{backgroundColor:red[400]}} onClick={()=>view(Progress._id)}> View submission </button>
                              </span> 
                            </div>
                        </div>
                    </div>
                </div>
          ))} 
        </div>
      </div>
    )      
}

export default ProgressLevel
