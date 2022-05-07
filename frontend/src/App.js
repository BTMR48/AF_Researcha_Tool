import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header/Header'

import AdminSignIn from './components/AdminManagement/AdminLogin';


function App() {
  return (
    <div className="App">
      <Router>
        <div>
            <Header/>
            
            
            <Route path="/admin/signin" exact component={AdminSignIn} />
           
        </div>
      </Router>
    </div>
  );
}

export default App;
