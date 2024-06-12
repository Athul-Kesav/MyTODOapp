import React from 'react'
import { Link } from "react-router-dom";
import './Navbar.css'
import searchIcon from '../assets/search-solid.svg'
import menu from '../assets/barcode-solid.svg'
const Navbar = () => {


    return (
        <div className='navbar'>
            <img id='menu' src={menu} alt='menuHam' />
            <h2>
                <center>
                <Link to='/' className='logo'>
                    DoneIT
                </Link>
                </center>
            </h2>
            <div>
                <ul>
                    <li>
                        <div onClick={() => {
                            window.location.href('../pages/Login.jsx')
                        }}>
                            <Link to='/Login' className='navButton'>login</Link>   
                        </div>
                    </li>
                    <li>
                        <div>
                            <Link to='/Signup' className='navButton'>signup</Link>
                        </div>
                    </li>
                </ul>
                <div className='searchBar'>
                    <input type="text" placeholder='Search' />
                    <img src={searchIcon} alt='searchIcon' />
                </div>
            </div>
        </div>
    )
}

export default Navbar