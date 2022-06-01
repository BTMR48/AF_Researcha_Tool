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
    const [isAdmin, setIsAdmin] = useState(false);
    const [isStudent, setIsStudent] = useState(false);
    const [isSupervisor, setIsSupervisor] = useState(false);
    const [isCosupervisor, setIsCosupervisor] = useState(false);
    const [isPanelmember, setIsPanelmember] = useState(false);
    const [user, setUser] = useState("");
    const [URL, setURL] = useState("/patient");
    const history = useHistory();
    const location = useLocation();
    const [sidebar, setSidebar] = useState(false);

    const SidebarItem = [
        {
          title: 'Home',
          path: `/home`,
          icon: <HomeIcon/>,
          cName: 'nav-text'
        },
        {
          title: 'Profile',
           path: `${URL}/update/${user._id}`,
          icon: <PersonIcon/>,
          cName: 'nav-text'
        },
        isStudent &&{
          title: 'Topic Registration',
          path: `/supervisor/ViewSupervisor`,
          icon: <EventAvailableIcon/>,
          cName: 'nav-text'
        },
        (isStudent || isSupervisor || isCosupervisor) &&{
            title: 'Requests',
            path: `/request/allrequest/`,
            icon: <EventAvailableIcon/>,
            cName: 'nav-text'
        },
        (isStudent || isPanelmember) &&{
            title: 'Topic Evaluation',
            path: `/topiceval/view`,
            icon: <EventAvailableIcon/>,
            cName: 'nav-text'
        },
        {    
          title: 'Marking Schema',
          path: `/marking`,
          icon: <AssignmentIcon/>,
          cName: 'nav-text'
        },
        (isStudent || isSupervisor || isCosupervisor) &&{
            title: 'Chat',
            path: `/student/chat/${user._id}`,
            icon: <ForumIcon />,
            cName: 'nav-text'
        },
        isAdmin && {
            title: 'User Management',
            path: `/users`,
            icon: <PersonIcon/>,
            cName: 'nav-text'
        },
    ];

    useEffect(() => {
        //check whether user has signed in
        if(localStorage.getItem("studentAuthToken") || localStorage.getItem("supervisorAuthToken") || localStorage.getItem("adminAuthToken") || localStorage.getItem("cosupervisorAuthToken") || localStorage.getItem("panelmemberAuthToken")){
            setIsSignedIn(true)

            //get user data
            if(localStorage.getItem("user")){
                setUser(JSON.parse(localStorage.getItem('user')))
            }
                    
            if(localStorage.getItem("adminAuthToken")){
                // setURL(`/admin`)
                setIsAdmin(true)
            }
            if(localStorage.getItem("studentAuthToken")){
                setURL(`/student`)
                setIsStudent(true)
            }

            if(localStorage.getItem("supervisorAuthToken")){
                setURL(`/supervisor`)
                setIsSupervisor(true)
            }
            if(localStorage.getItem("cosupervisorAuthToken")){
                setURL(`/cosupervisor`)
                setIsCosupervisor(true)
            }
            if(localStorage.getItem("panelmemberAuthToken")){
                setURL(`/panelmember`)
                setIsPanelmember(true)
            }

        }else{
            setIsSignedIn(false)
        }
    }, [user._id,location])

    function profile() {
        history.push(`${URL}/update/${user._id}`)
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