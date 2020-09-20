import React from 'react';
import { connect } from 'react-redux';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import NeonButton from "./NeonButton";
import api from '../api';
import '../styles/GoolgeOAuth.scss'

function GoolgeOAuth(props) {
  const { dispatch, isLoggedIn } = props

  const onSuccess = async (response) => {
    const googleId = response.googleId;
    const username = response.profileObj.name;
    const profilePic = response.profileObj.imageUrl;
    await api.googleLogin(googleId, username, profilePic)
    .then(userdata => {
      if (userdata ) {
        props.dispatch({ type: "UPDATE_USER_DATA", userdata })
        props.dispatch({ type: "LOGIN" })
      }
    }).catch(err => console.log(err))
  }

  const onFailure = (reponse) => {
    console.log("onFailure -> reponse", reponse)
    this.logout()
    throw new Error('Google Login failed')
  }

  const logout = async (response) => {
    api.logout();
    let userdata = { username: null, profilePic: null }
    dispatch({ type: "UPDATE_USER_DATA", userdata })
    dispatch({ type: "LOGOUT" })
  }

  return (
    <div id="google-oauth">
          {/* GOOGLE OAUTH */}
          {!isLoggedIn && 
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
              render={renderProps => (
                <span onClick={renderProps.onClick} disabled={renderProps.disabled} >
                  <NeonButton text="Login" logo="google" />
                </span> 
              )}
              onSuccess={onSuccess}
              onFailure={onFailure}
              isSignedIn={true} // maybe remove, might cause problems after timeout
              cookiePolicy={'single_host_origin'}
            />}

          {isLoggedIn && 
            <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
              render={renderProps => (
                <span onClick={renderProps.onClick} disabled={renderProps.disabled} >
                  <NeonButton text="Logout" logo="google"/>
                </span>             
              )}
              onLogoutSuccess={logout}
            />}
    </div>
  )
}

function mapStateToProps(reduxState){
  return {
    userdata: reduxState.userdata,
    isLoggedIn: reduxState.isLoggedIn
  }
}

export default connect(mapStateToProps)(GoolgeOAuth)
