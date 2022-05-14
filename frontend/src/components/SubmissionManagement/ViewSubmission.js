import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { red, teal, grey } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import './ViewSubmission.css';

function History(props) {

  const [submissionArr, setSubmissionArr] = useState([])
  const history = useHistory()
  const [isSupervisor, setIsSupervisor] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("supervisorAuthToken")) {
        setIsSupervisor(true)
    } else {
        setIsSupervisor(false)
    }

    async function getSubmission() {
      await axios.get(`http://localhost:8070/submission/${props.match.params.id}`).then((res) => {
        setSubmissionArr(res.data.result)
        
      }).catch((error) => {
        alert("Failed to fetch the submission details")
      })
    }
    getSubmission();
  }, [props])


  function viewOne(id) {
    history.push(`/submission/view/${id}`)
  }

  function filterContent(data, searchTerm) {
    const result = data.filter((submission) =>
    submission.doctorID.name.toLowerCase().includes(searchTerm))
    setsubmissionArr(result)
  }

  function handleSearch(event) {
    const searchTerm = event.currentTarget.value
    axios.get(`http://localhost:8070/submission/${props.match.params.id}`).then((res) => {
      filterContent(res.data.result, searchTerm.toLowerCase())
      console.log(res.data.result)
    }).catch((error) => {
      alert("Failed to search student group with the given key word")
    })
  }

  return (
    <div className="container"  >
      <div className="row">
        <div className="col-4">
          <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between ">
            <h2>Student Submissions</h2>
          </div>
        </div>
        <div className="col-3">
        </div>
        <div className="col-5">
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
        </div>
      </div>

      <div>
            <div className="container">
                {/* check cart type */}
                <div className = "row">
                    <div className="col-4">
                        <div className="dropdown">
                            <span>{isShopping ? <h2>Shopping Cart</h2> : <h2>Prescription Cart</h2> }</span>
                            <div className="dropdown-content">
                                {isShopping ? <a href={`/cart/${props.match.params.id}/prescription`}><h5 className="linkColor">Prescription Cart</h5></a> : <a href={`/cart/${props.match.params.id}/shopping`}><h5 className="linkColor">Shopping Cart</h5></a>}
                            </div>
                        </div>
                    </div>                    
                    <div className="col-3">
                    </div>
                    <div className="col-5">
                        <div className="px-3 search" align="center">
                            <input 
                                type="text" 
                                name="search" 
                                id="search"
                                placeholder="Search" 
                                onChange={handleSearch} 
                                required 
                            />
                        </div>
                    </div>                    
                </div>
                <div className="row">
                    <div className="col-12 exp"> <br/>
                    {/* select all check box*/}
                        <FormControlLabel
                            control={<Checkbox icon={<CheckRound/>}
                            checkedIcon={<CheckCircleIcon style={{color:orange[600]}}/>}
                            id="selectAll" 
                            name="checkedH" />}
                            onChange={handleSelectAll}
                            checked={isCheckAll}
                            label="Select All"
                        />            
                        <br/><br/>
                    </div>                    
                </div>
                <div className="row">
                    <div className="col-xl-8"data-aos="slide-up">
                        {/* map */}
                        {items.map((Item, key) => ( 
                            <div key={key} >                                
                                <div className="cart-box mb-3 shadow">                        
                                    <div className="row align-items-center ">
                                        <div className="col-sm-1">
                                            {/* Check box for item */}
                                            <FormControlLabel                                                    
                                                checked={isCheck.includes(Item._id)}
                                                control={
                                                    <Checkbox icon={<CheckRound />} 
                                                        checkedIcon={<CheckCircleIcon style={{color:orange[600]}}/>}  name="checkedH" 
                                                        id = {Item._id}
                                                        onChange={handleClick}
                                                    />
                                                }
                                            />
                                        </div>
                                        {/* Product Image */}
                                        <div className="col-sm-2">
                                            <div ><img className="product-Img" src={Item.itemid.imgUrl} alt="product"></img></div>
                                        </div>
                                        {/* Product Name and description */}
                                        <div className="col-sm-4">                                                
                                            <h4>{Item.itemid.name}</h4>
                                            <p className="textShort mb-1">{Item.itemid.description}</p>   
                                            <Link to={`/pharmacy/item/${Item.itemid._id}`}>Show more</Link>
                                        </div>
                                        <div className="col-sm-2">
                                            <div>
                                                {/* Quantity decrease button */}
                                                <IconButton onClick={()=>decrease(Item._id,Item.itemid.price)}>
                                                    <SubIcon style={{fontSize:"small"}}></SubIcon>
                                                </IconButton>

                                                {/* Quantity */}
                                                <Input type="text" name="quantity" className="quantity" disableUnderline margin="dense" readOnly value={(Item.quantity)}/>
                                                
                                                {/* Quantity decrease button */}
                                                <IconButton onClick={()=>increment(Item._id,Item.itemid.price)}>
                                                    <AddIcon style={{fontSize:"small"}}></AddIcon>
                                                </IconButton>
                                            </div>
                                        </div>
                                        {/* Price */}
                                        <div className="col-sm-2">
                                            LKR&nbsp;{Item.total}.00
                                            {}
                                        </div>
                                        <div className="col-sm-1">
                                            <IconButton onClick={()=>deleteItem(Item._id)}>
                                                <DeleteOutlinedIcon fontSize="large"></DeleteOutlinedIcon>
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Order Summary Card */}
                    <div className="col-xl-4" >
                        <div className="cardSummary shadow">
                            <h5>Order Summary</h5>
                                <br/>
                                <div className="row">
                                    {/* Address */}
                                    <div className="col-xl-12 mb-3">
                                        <h6>Address:</h6>
                                        <OutlinedInput  
                                            type="text" id="lastname" placeholder="Address" 
                                            required fullWidth
                                            value={user.address}
                                        />                                   
                                    </div>
                                    <hr/>                                                                  
                                    {/* Checkout Button */}
                                    <Button disableElevation style={{backgroundColor:red[500]}} variant="contained" color="secondary" onClick={checkout}>
                                    <b>Checkout</b>
                                    </Button>
                                </div>                                
                        </div>
                        <div>
                            {/* Report Generate Button  */}
                            <center>
                            <Button variant="contained" className="mb-4" disableElevation size="large" onClick={generateReport}
                                style={{ backgroundColor: green[400], color: 'white' }} endIcon={<CloudDownloadIcon/>}>
                                Generate Report
                            </Button>
                            </center>
                        </div>
                    </div>
                </div>        
            </div>               
        </div>
   
      
    </div>
  )
}

export default History
