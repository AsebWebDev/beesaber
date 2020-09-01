import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../../api';
import '../../styles/pages/Menu.scss';
import brandlogo from '../../media/1.jpg';

function Menu() {
    return (
        <div id="menu">
            <div id="brandlogo">
                {/* TODO: Check copyright: https://dribbble.com/shots/674978-Bee-logo */}

                {/* <img src={brandlogo} alt="brandlogo"/>    */}

                {/* neon honeycomb logo: */}
                <div><span className="neon-yellow">I</span></div>
                <div><span className="neon-yellow">I</span></div>
                <div><span className="neon-yellow">I</span></div>
                <div><span className="neon-yellow">I</span></div>
                <div><span className="neon-yellow">I</span></div>
                <div><span className="neon-yellow">I</span></div>
            </div>
            <div id="menu-main">
                <h1 className="beesaber-title"><span className="neon-red">Bee</span><br></br><span className="neon-blue">Saber</span></h1>
                <Link to="/"><span className="neon-red">Dashboard</span></Link>
                {api.isLoggedIn() && <Link to="/myprofile"><span className="neon-red">My</span> <span className="neon-blue">Profile</span></Link>}
                {api.isLoggedIn() && <Link to="/myhive"><span className="neon-red">My</span> <span className="neon-blue">Hive</span></Link>}
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
