import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import MyProfile from './MyProfile';
import LoginBox from '../LoginBox';
import '../../styles/pages/Main.scss'
import api from '../../api';

function Main(props) {

    let handleLogout = () => {
        api.logout();
        let userdata = { username: null, profilePic: null }
        props.dispatch({ type: "UPDATE_USER_DATA", userdata })
    }

    return (
        <div id="main">
            <div id="header">
                <h1>Main</h1>
                {props.username && <p>{props.username}</p>}
                {!api.isLoggedIn() && <LoginBox />}
                {api.isLoggedIn() && <p onClick={handleLogout}>Logout</p>}
            </div>
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/myprofile" component={MyProfile} />
                <Route render={() => <h2>404</h2>} />
            </Switch>
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
      username: reduxState.username,
      profilePic: reduxState.profilePic
    }
  }
  
  export default connect(mapStateToProps)(Main)
