import React from 'react'
import Cookies from 'js-cookie'
import { Link } from "react-router-dom";
import './AuthNavbar.css'
import searchIcon from '../assets/search-solid.svg'
import menu from '../assets/barcode-solid.svg'

const Navbar = () => {

    return (
        <div className='navbar'>

            <img id='menu' src={menu} alt='menuHam' />
            <h2>
                <center>
                <Link to='/' className='logo'>
                    Hello, {Cookies.get('username')}
                </Link>
                </center>
            </h2>
            <div>
                <ul>
                    <li>
                        <Link to='/Login' className='navButton'>login</Link>   
                    </li>
                    <li>
                        <Link to='/Signup' className='navButton'>signup</Link>
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