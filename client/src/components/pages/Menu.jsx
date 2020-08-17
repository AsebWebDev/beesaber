import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/pages/Menu.scss'
import brandlogo from '../../media/brandlogo.jpg'

export default function Menu() {
    return (
        <div id="menu">
            <div id="brandlogo">
                {/* TODO: Check copyright: https://dribbble.com/shots/674978-Bee-logo */}
                <img src={brandlogo} alt="brandlogo"/>   
            </div>
            <div id="menu-main">
                <h1>Menu</h1>
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/myprofile">My Profile</Link></li>
                </ul>
            </div>
        </div>
    )
}
