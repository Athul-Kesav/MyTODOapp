import { useState, useEffect } from 'react';
import './Home.css';
import AuthNavBar from '../components/AuthNavbar.jsx'
import UnAuthNavBar from '../components/UnAuthNavbar.jsx'
import Hero from '../components/Hero.jsx';
import PreLoader from '../components/PreLoader.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
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
  }, []);

  return (
    <Router>
      {loading ? <PreLoader /> : (
        <>
          {loggedIn ? <AuthNavBar /> : <UnAuthNavBar />}
          <Routes>
            <Route exact path="/" element={<Hero />} />
            <Route path="/Signup" element={<Signup isLoggedIn={loggedIn}/>} />
            <Route path="/Login" element={<Login isLoggedIn={loggedIn}/>} />
            <Route path='/User' element={<User />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;


