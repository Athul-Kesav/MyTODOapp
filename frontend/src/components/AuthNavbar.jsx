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
                <Link to='/' className='logo'>
                    DoneIT
                </Link>
            </h2>
            <h2>
                Hello, 
            </h2>
            <h2 className='username'>
                {Cookies.get('username')}
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