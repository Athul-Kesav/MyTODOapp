import { useState, useEffect, useCallback } from 'react';
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
} from "react-router-dom";
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import User from './User.jsx';
import { LoginContext } from '../contexts/loginContext.jsx';

function App() {

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = () => setLoggedIn(true);
  const logout = () => setLoggedIn(false);

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 3000)

    if (!Cookies.get('token') && window.location.pathname === '/User') {
      window.location.href = '/';
    }

    if(Cookies.get('token')) {
      setLoggedIn(true);
    }
    
  }, []);

  return (
    <LoginContext.Provider value={{ login, logout }}>
    <Router>
      {loading ? <PreLoader /> : (
        <>
          {loggedIn ? <AuthNavBar /> : <UnAuthNavBar />}
          <Routes>
            <Route exact path="/" element={<Hero />} />
            <Route path="/Signup" element={<Signup/>} />
            <Route path="/Login" element={<Login />} />
            <Route path='/User' element={<User />} />
          </Routes>
        </>
      )}
    </Router>
    </LoginContext.Provider>
  );
}

export default App;


