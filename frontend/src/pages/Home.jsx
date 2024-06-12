import { useState, useEffect } from 'react';
import './Home.css';
import NavBar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx';
import PreLoader from '../components/PreLoader.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Signup from './Signup.jsx';
import Login from './Login.jsx'

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 3000)
  }, []);

  return (
    <Router>
      {loading ? <PreLoader /> : (
        <>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Hero />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;


