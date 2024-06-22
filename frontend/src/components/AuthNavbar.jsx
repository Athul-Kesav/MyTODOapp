import React, { useContext } from 'react'
import Cookies from 'js-cookie'
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from '../contexts/loginContext';
import './AuthNavbar.css'
import searchIcon from '../assets/search-solid.svg'
import menu from '../assets/barcode-solid.svg'

const Navbar = () => {

    const { logout } = useContext(LoginContext);
    const navigate = useNavigate();

    function logOut(){
        Cookies.remove('token');
        Cookies.remove('username');
        logout();
        window.location.href = '/';
    }

    function myTasks(){
        navigate('/user')
    }

    return (
        <div className='navbar'>
            <div>
                <img id='menu' src={menu} alt='menuHam' />
                <h2>
                    <Link to='/' className='logo'>
                        DoneIT
                    </Link>
                </h2>
            </div>
            <h2 className='username'>
                Hello, {Cookies.get('username')}
            </h2>
            <div>
                <ul>
                    <li>
                        <button className='navButton' onClick={logOut}>Logout</button>
                    </li>
                    <li>
                        <div onClick={myTasks} className='navButton'>
                            Tasks
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