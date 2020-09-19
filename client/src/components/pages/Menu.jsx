import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MDBAnimation } from 'mdbreact';
import GoolgeOAuth from '../GoolgeOAuth';
import GoogleProfileData from '../GoogleProfileData';
import '../../styles/pages/Menu.scss';

function Menu(props) {
    const  {isLoggedIn} = props

    return (
        <div id="menu">
            <MDBAnimation type="flip">
                <div id="brandlogo">
                    {/* neon honeycomb logo: */}
                    <div><span className="neon-yellow">I</span></div>
                    <div><span className="neon-yellow">I</span></div>
                    <div><span className="neon-yellow">I</span></div>
                    <div><span className="neon-yellow">I</span></div>
                    <div><span className="neon-yellow">I</span></div>
                    <div><span className="neon-yellow">I</span></div>
                    <div className="neon-red saber"></div>
                    <div className="neon-blue saber"></div>            
                </div>
            </MDBAnimation>
            
            <div id="menu-main">
                <div id="menu-head">
                    <GoogleProfileData />
                    <h1 className="beesaber-title"><span className="neon-red">Bee</span><br></br><span className="neon-blue">Saber</span></h1>
                    <GoolgeOAuth />
                </div> 
                <div id="menu-points">
                    <Link to="/"><span className="neon-red">Dashboard</span></Link>
                    {isLoggedIn && <Link to="/myprofile"><span className="neon-red">My</span> <span className="neon-blue">Profile</span></Link>}
                    {isLoggedIn && <Link to="/myhive"><span className="neon-red">My</span> <span className="neon-blue">Hive</span></Link>}
                </div>  
                
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
