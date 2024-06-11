import { useState, useEffect } from 'react';
import './Home.css';
import NavBar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx';
import PreLoader from './components/PreLoader.jsx';

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 3000)
  }, []);

  return (
    <>
      {loading ? <PreLoader /> : (
        <>
        <NavBar/>
        <Hero/>
        </>
      )}
    </>
  );
}

export default App;


