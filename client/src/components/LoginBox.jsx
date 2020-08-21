import React, { useState } from 'react';
import { connect } from 'react-redux';
import { newNotification } from '../actioncreators'
import GoogleLogin from 'react-google-login';
// import keys from '../configs/keys';
import api from '../api';
import '../styles/LoginBox.scss'

function LoginBox(props) {

  const responseOauth = (response) => {
    const googleId = response.googleId;
    const username = response.profileObj.name;
    const profilePic = response.profileObj.imageUrl;
    api.googleLogin(googleId, username, profilePic)
    .then(userdata => {
      if (userdata ) {
        props.dispatch({ type: "UPDATE_USER_DATA", userdata })
        if (props.history) props.history.push("/") // Redirect to the home page
      }
    }).catch(err => console.log(err))
  }

  return (
    <div id="loginbox">
          {/* GOOGLE OAUTH */}
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
            buttonText="Google Login"
            onSuccess={responseOauth}
            onFailure={responseOauth}
            cookiePolicy={'single_host_origin'}
          />
    </div>
  )
}

function mapStateToProps(reduxState){
  return {
    userdata: reduxState.userdata,
  }
}

export default connect(mapStateToProps)(LoginBox)
