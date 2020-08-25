import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { MDBIcon, MDBBtn } from 'mdbreact';
import Dashboard from './Dashboard';
import MyProfile from './MyProfile';
import MyHive from './MyHive';
import GoolgeLogin from '../GoolgeLogin';
import '../../styles/pages/Main.scss'
import api from '../../api';

function Main(props) {
    const { dispatch, userdata } = props;

    let handleLogout = () => {
        api.logout();
        let userdata = { username: null, profilePic: null }
        dispatch({ type: "UPDATE_USER_DATA", userdata })
    }

    return (
        <div id="main">
            <div id="header">
                {/* Google Profile Data */}
                {api.isLoggedIn() && userdata && 
                    <div id="profile-login-icon">
                        {userdata.profilePic && <img src={userdata.profilePic} id="profile-pic-sm" alt="profile pic"/>}
                        {userdata.username}
                    </div>
                }
                {/* TODO: Move Google Login right */}
                {!api.isLoggedIn() && <GoolgeLogin id="googlelogin"/>} 
                {api.isLoggedIn() && 
                    <MDBBtn onClick={handleLogout} size="sm" color="danger">
                        Logout
                        <MDBIcon icon="sign-out-alt" className="ml-1" />
                    </MDBBtn>}
                
            </div>
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/myprofile" component={MyProfile} />
                <Route path="/myhive" component={MyHive} />
                <Route render={() => <h2>404</h2>} />
            </Switch>
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
        userdata: reduxState.userdata
    }
  }
  
  export default connect(mapStateToProps)(Main)
