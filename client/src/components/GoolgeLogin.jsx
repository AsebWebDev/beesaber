import React from 'react';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
// import keys from '../configs/keys';
import api from '../api';
import '../styles/GoolgeLogin.scss'

function LoginBox(props) {

  const responseOauth = async (response) => {
    console.log("responseOauth -> response", response)
    const googleId = response.googleId;
    const username = response.profileObj.name;
    const profilePic = response.profileObj.imageUrl;
    await api.googleLogin(googleId, username, profilePic)
    .then(userdata => {
      if (userdata ) {
        props.dispatch({ type: "UPDATE_USER_DATA", userdata })
        // if (props.history) props.history.push("/") // Redirect to the home page FIXME: Not usefull for now? Maybe remove
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
