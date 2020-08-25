import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../../api';
import '../../styles/pages/Menu.scss'
import brandlogo from '../../media/brandlogo.png'

function Menu() {
    return (
        <div id="menu">
            <div id="brandlogo">
                {/* TODO: Check copyright: https://dribbble.com/shots/674978-Bee-logo */}
                <img src={brandlogo} alt="brandlogo"/>   
            </div>
            <div id="menu-main">
                <h1 className="beesaber-title">Beesaber</h1>
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    {api.isLoggedIn() && <li><Link to="/myprofile">My Profile</Link></li>}
                    {api.isLoggedIn() && <li><Link to="/myhive">My Hive</Link></li>}
                </ul>
            </div>
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
      userdata: reduxState.userdata,
    }
  }
  
export default connect(mapStateToProps)(Menu)
