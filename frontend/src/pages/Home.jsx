import { useState, useEffect } from 'react';
import './Home.css';
import AuthNavBar from '../components/AuthNavbar.jsx'
import UnAuthNavBar from '../components/UnAuthNavbar.jsx'
import Hero from '../components/Hero.jsx';
import PreLoader from '../components/PreLoader.jsx';
import Cookies from 'js-cookie';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import User from './User.jsx';

function App() {

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 3000)

    if (!Cookies.get('token') && window.location.pathname === '/User') {
      window.location.href = '/';
    }
    
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      {loading ? <PreLoader /> : (
        <>
          {loggedIn ? <AuthNavBar /> : <UnAuthNavBar />}
          <Routes>
            <Route exact path="/" element={<Hero />} />
            <Route path="/Signup" element={<Signup onLogin={handleLogin}/>} />
            <Route path="/Login" element={<Login onLogin={handleLogin}/>} />
            <Route path='/User' element={<User />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;


