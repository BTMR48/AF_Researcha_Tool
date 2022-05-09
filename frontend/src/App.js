import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header'

import AdminSignIn from './components/AdminManagement/AdminLogin';

import SupervisorSignIn from './components/SupervisorManagement/SupervisorSignIn/SupervisorSignIn'; 
import SupervisorSignUp from './components/SupervisorManagement/SupervisorSignUp/SupervisorSignUp'; 
import CosupervisorSignIn from './components/CosupervisorManagement/CosupervisorSignIn/CosupervisorSignIn'; 
import CosupervisorSignUp from './components/CosupervisorManagement/CosupervisorSignUp/CosupervisorSignUp'; 
import PanelmemberSignIn from './components/PanelmemberManagement/PanelmemberSignIn/PanelmemberSignIn'; 
import PanelmemberSignUp from './components/PanelmemberManagement/PanelmemberSignUp/PanelmemberSignUp'; 

import AllSupervisors from './components/UserManagement/SupervisorList/allsupervisors'; 



function App() {
  return (
    <div className="App">
      <Router>
        <div>
            <Header/>
            
            
            <Route path="/admin/signin" exact component={AdminSignIn} />


            <Route path="/supervisor/signin" exact component = {SupervisorSignIn}/>
            <Route path="/supervisor/signup" exact component = {SupervisorSignUp}/>
            <Route path="/cosupervisor/signin" exact component = {CosupervisorSignIn}/>
            <Route path="/cosupervisor/signup" exact component = {CosupervisorSignUp}/>
            <Route path="/panelmember/signin" exact component = {PanelmemberSignIn}/>
            <Route path="/panelmember/signup" exact component = {PanelmemberSignUp}/>
            <Route path="/users/supervisorlist" exact component = {AllSupervisors}/>
           
        </div>
      </Router>
    </div>
  );
}

export default App;
