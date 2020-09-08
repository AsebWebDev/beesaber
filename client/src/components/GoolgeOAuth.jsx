import React from 'react';
import { connect } from 'react-redux';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
// import keys from '../configs/keys';
import api from '../api';
import '../styles/GoolgeLogin.scss'

function GoolgeOAuth(props) {
  const { dispatch } = props
  const responseOauth = async (response) => {
    const googleId = response.googleId;
    const username = response.profileObj.name;
    const profilePic = response.profileObj.imageUrl;
    await api.googleLogin(googleId, username, profilePic)
    .then(userdata => {
      if (userdata ) {
        props.dispatch({ type: "UPDATE_USER_DATA", userdata })
      }
    }).catch(err => console.log(err))
  }

  const logout = async (response) => {
    api.logout();
    let userdata = { username: null, profilePic: null }
    dispatch({ type: "UPDATE_USER_DATA", userdata })
    dispatch({ type: "LOGOUT" })
  }

  return (
    <div id="loginbox">
          {/* GOOGLE OAUTH */}
          {props.type === 'login' && 
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
              buttonText="Google Login"
              onSuccess={responseOauth}
              onFailure={responseOauth}
              isSignedIn={true}
              cookiePolicy={'single_host_origin'}
            />}
          {props.type === 'logout' && 
            <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
              buttonText="Logout"
              onLogoutSuccess={logout}
            />}
    </div>
  )
}

function mapStateToProps(reduxState){
  return {
    userdata: reduxState.userdata,
  }
}

export default connect(mapStateToProps)(GoolgeOAuth)
