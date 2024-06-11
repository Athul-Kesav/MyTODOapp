import React from 'react'
import './Navbar.css'
import searchIcon from '../assets/search-solid.svg'
import menu from '../assets/barcode-solid.svg'
const Navbar = () => {
    function search() {

    }

    return (
        <div className='navbar'>
            <img id='menu' src={menu} alt='menuHam' />
            <h2>DoneIT</h2>
            <div>
                <ul>
                    <li>
                        <div>
                            login
                        </div>
                    </li>
                    <li>
                        <div>
                            signup
                        </div>
                    </li>
                </ul>
                <div className='searchBar'>
                    <input type="text" placeholder='Search' />
                    <img onClick={search} src={searchIcon} alt='searchIcon' />
                </div>
            </div>
        </div>
    )
}

export default Navbar