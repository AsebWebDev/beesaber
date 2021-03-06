import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MDBAnimation } from 'mdbreact';
import BrandLogo from '../BrandLogo';
import GoolgeOAuth from '../GoolgeOAuth';
import GoogleProfileData from '../GoogleProfileData';
import '../../styles/pages/Menu.scss';

function Menu(props) {
    const  {isLoggedIn} = props

    return (
        <div id="menu">
            <MDBAnimation type="flip">
                <BrandLogo />
            </MDBAnimation>
            
            <div id="menu-main">
                <div id="menu-head">
                    <GoogleProfileData />
                    <h1 className="beesaber-title"><span className="neon-red">Bee</span><br></br><span className="neon-blue">Saber</span></h1>
                    <GoolgeOAuth />
                </div> 
                {isLoggedIn && <div id="menu-points">
                    <Link to="/"><span className="neon-red">Dashboard</span></Link>
                    <Link to="/myprofile"><span className="neon-red">My</span> <span className="neon-blue">Profile</span></Link>
                    <Link to="/myhive"><span className="neon-red">My</span> <span className="neon-blue">Hive</span></Link>
                </div>}  
                
            </div>
            
            {/* alternative logo made with svg: */}
            {/* <svg className="logo"><use xlinkHref="#logo-honeycomb" /></svg> */}
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
      userdata: reduxState.userdata,
      isLoggedIn: reduxState.isLoggedIn
    }
  }
  
export default connect(mapStateToProps)(Menu)
