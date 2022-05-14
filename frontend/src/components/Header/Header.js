import React, {useEffect, useState} from 'react';
import { useHistory, useLocation,Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import DehazeIcon from '@material-ui/icons/Dehaze';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import FeedbackIcon from '@material-ui/icons/Feedback';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import onClickOutside from "react-onclickoutside";
import ForumIcon from '@mui/icons-material/Forum'
import { blue } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import axios from 'axios';
import './Header.css';
import './Sidebar.css';

function Header() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [cartCount, setCartCount] = useState();
    const [user, setUser] = useState("");
    const [URL, setURL] = useState("/patient");
    const history = useHistory();
    const location = useLocation();
    const [sidebar, setSidebar] = useState(false);

    const SidebarItem = [
        {
          title: 'Home',
          path: `/evolution/levels`,
          icon: <HomeIcon/>,
          cName: 'nav-text'
        },
        {
          title: 'Profile',
           path: `${URL}/profile`,
          icon: <PersonIcon/>,
          cName: 'nav-text'
        },
        {
          title: 'Topic Registration',
          path: `/Registration/${user._id}`,
          icon: <EventAvailableIcon/>,
          cName: 'nav-text'
        },
        {
          title: 'Marking Schema',
          path: `/marking`,
          icon: <AssignmentIcon/>,
          cName: 'nav-text'
        },
        {
            title: 'Chat',
            path: `/student/chat/${user._id}`,
            icon: <ForumIcon />,
            cName: 'nav-text'
        }
    ];

    useEffect(() => {
        //check whether user has signed in
        if(localStorage.getItem("studentAuthToken") || localStorage.getItem("supervisorAuthToken") || localStorage.getItem("adminAuthToken") ){
            setIsSignedIn(true)

            //get user data
            if(localStorage.getItem("user")){
                setUser(JSON.parse(localStorage.getItem('user')))
            }
            
            // async function getCartCount() {
            //     await axios.get(`http://localhost:8070/cart/${user._id}&shopping`).then((res) => {
            //         let result = res.data.result;
            //         setCartCount(result.length) 
            //     }).catch((error) => {
            //         console.log(error)
            //     })
            // }
            // getCartCount();

        
            if(localStorage.getItem("studentAuthToken")){
                setURL(`/student`)
            }

            if(localStorage.getItem("supervisorAuthToken")){
                setURL(`/supervisor`)
            }
        }else{
            setIsSignedIn(false)
        }
    }, [user._id,location])

    function profile() {
        history.push(`${URL}/profile/`)
    }


    function signin() {
        history.push('/')
    }

    function signup() {
        history.push('/student/signup')
    }
    
    //logout
    async function logout(){
        localStorage.clear();
        history.push('/')
    }

    const showSidebar = () => setSidebar(!sidebar);

    Header.handleClickOutside = () => setSidebar(false);

    function home(){
        history.push('/')
    }
    
    return (
        <header>
            <div className="container-fluid">
                <nav className="navbar navbar-inverse navbar-expand-lg navbar-light fixed-top header-bg">
                    <div className="container-fluid ">
                        <ul>
                            {sidebar ? <IconButton><DehazeIcon fontSize="large" style={{ color: blue[0] }}/></IconButton> :
                            <IconButton onClick={showSidebar}>
                                <DehazeIcon fontSize="large"/>
                            </IconButton>
                            } 
                        </ul>
                        <div className="header-title">
                            <h3 onClick={home}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SLIIT&nbsp;Research&nbsp;Management Tool </h3>
                        </div>
                        <ul className="mx-3">
                            {isSignedIn ?

                            
                                <div>
                                    <IconButton onClick={profile}>
                                        <Avatar alt="user" src={`${user.imgUrl}`} />
                                    </IconButton> 
                                </div>
                                :
                                <div>
                                    <button className="btn btn-outline-primary mx-2" onClick={signin}>
                                        Sign In
                                    </button>
                                    <button className="btn btn-outline-primary" onClick={signup}>
                                        Sign Up
                                    </button>
                                </div>
                            }
                        </ul>
                    </div>
                </nav>
                {isSignedIn &&
                    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className='nav-menu-items' onClick={showSidebar}>
                            <li className='mb-4 mt-3' align="center">
                                {/* <img src="/images/Logo.png" width="150px"  height="90px" alt="logo"/> */}
                                {/* <img src="/images/sliit-web-logo.png" width="150px" alt="logo"/> */}
                                <img src="/images/SLIIT_Logo.png" width="100px" height="120px" alt="logo"/>
                            </li>
                            {SidebarItem.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span className="nav-span">{item.title}</span>
                                    </Link>
                                </li>
                            );
                            })}
                            
                                <div className="sidebar-bottom" align="center">
                                    <Button variant="contained" color="secondary" disableElevation size="small" onClick={logout}
                                    endIcon={<ExitToAppIcon/>}>
                                        Log Out  
                                    </Button>
                                </div>
                            
                        </ul>
                    </nav>
                }
            </div>
        </header>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => Header.handleClickOutside
};

export default onClickOutside(Header, clickOutsideConfig);