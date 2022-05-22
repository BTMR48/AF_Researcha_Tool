import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header'
// import PrivateRoute from './Routes/PrivateRoute';
// import StudentPrivateRoute from './Routes/StudentPrivateRoute';


import AdminSignIn from './components/AdminManagement/AdminLogin';
import StudentSignIn from './components/StudentManagement/StudentSignIn/StudentSignIn'; 
import StudentSignUp from './components/StudentManagement/StudentSignUp/StudentSignUp'; 
import SupervisorSignIn from './components/SupervisorManagement/SupervisorSignIn/SupervisorSignIn'; 
import SupervisorSignUp from './components/SupervisorManagement/SupervisorSignUp/SupervisorSignUp'; 
import CosupervisorSignIn from './components/CosupervisorManagement/CosupervisorSignIn/CosupervisorSignIn'; 
import CosupervisorSignUp from './components/CosupervisorManagement/CosupervisorSignUp/CosupervisorSignUp'; 
import PanelmemberSignIn from './components/PanelmemberManagement/PanelmemberSignIn/PanelmemberSignIn'; 
import PanelmemberSignUp from './components/PanelmemberManagement/PanelmemberSignUp/PanelmemberSignUp'; 
import AddProgress from './components/ProgressManagement/AddProgress/AddProgress';
import Levels from './components/ProgressManagement/Levels/Levels';
import SingleLevel from './components/ProgressManagement/SingleLevel/SingleLevel';
import UpdateProgress from './components/ProgressManagement/UpdateProgress/UpdateProgress';
import AddSubmission from './components/SubmissionManagement/AddSubmission/AddSubmissionstd';
import Footer from './components/Footer/Footer';
import ViewSubmission from './components/SubmissionManagement/ViewSubmission/ViewSubmission';
import AllSupervisors from './components/UserManagement/SupervisorList/allsupervisors'; 
import ViewSupervisor from './components/SupervisorManagement/ViewSupervisor/ViewSupervisor';
import AddRequest from './components/RequestManagement/AddRequest';



function App() {
  return (
    <div className="App">
      <Router>
        <div>
            <Header/>
            
            <Route path="/admin/signin" exact component={AdminSignIn} />

            <Route path="/" exact component = {StudentSignIn}/>
            <Route path="/student/signup" exact component = {StudentSignUp}/>
            <Route path="/supervisor/signin" exact component = {SupervisorSignIn}/>
            <Route path="/supervisor/signup" exact component = {SupervisorSignUp}/>
            <Route path="/cosupervisor/signin" exact component = {CosupervisorSignIn}/>
            <Route path="/cosupervisor/signup" exact component = {CosupervisorSignUp}/>
            <Route path="/panelmember/signin" exact component = {PanelmemberSignIn}/>
            <Route path="/panelmember/signup" exact component = {PanelmemberSignUp}/>
            <Route path="/users/supervisorlist" exact component = {AllSupervisors}/>
            <Route path="/submission/viewSubmission/:id" exact component = {ViewSubmission}/>
            <Route path="/evolution/addProgress"exact component={AddProgress}/>
            <Route path="/evolution/levels" exact component={Levels}/>
            <Route path="/evolution/level/:id" exact component={SingleLevel}/>
            <Route path="/evolution/level/updateProgress/:id" exact component={UpdateProgress}/>
            <Route path="/submission/addSubmission/:id" exact component= {AddSubmission}/>

            <Route path="/supervisor/ViewSupervisor" exact component={ViewSupervisor}/>
            <Route path="/student/request/:id" exact component={AddRequest}/>

  
            <Footer/>
        </div>
      </Router>
    </div>
  );
}

export default App;
