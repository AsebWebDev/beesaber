import React, { useState } from 'react';
import { connect } from 'react-redux';
import { newNotification } from '../actioncreators'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import GoogleLogin from 'react-google-login';
// import keys from '../configs/keys';
import api from '../api';
import '../styles/LoginBox.scss'

function LoginBox(props) {
  const { dispatch } = props;
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [profilePic, setProfilePic] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    api.login(username, password)
    //   .then(() => {
    //     api.getUserSettings(api.getLocalStorageUser()._id)
    //     .then(settings => dispatch({ type: "UPDATE_USER_SETTINGS", settings}))
    //     .catch(err => dispatch(newNotification(err.toString())))
    //   })
      .then(() => {
        // dispatch(newNotification('Successfully logged in, ' +  username))
        // props.history.push("/") // Redirect to the home page
        console.log("Successfull login")
      // }).catch(err => setMessage(err))
    }).catch(err => console.log(err))
  }

  const responseOauth = (response) => {
    console.log("responseOauth hit")
    const googleId = response.googleId;
    const username = response.profileObj.name;
    const profilePic = response.profileObj.imageUrl;
    setUsername(username);
    setProfilePic(profilePic);
    api.googleLogin(googleId, username, profilePic)
    .then(result => {
      console.log("responseOauth -> result", result)
      // dispatch(newNotification('Successfully logged in, ' +  username))
      let userdata = { username, profilePic }
      props.dispatch({ type: "UPDATE_USER_DATA", userdata })
      props.history.push("/") // Redirect to the home page
    // }).catch(err => setMessage(err))
    }).catch(err => console.log(err))
  }

  return (
    <MDBContainer id="loginbox">
      <MDBRow>
        <MDBCol md="12">
          {/* GOOGLE OAUTH */}
          <hr />
          <p className="h5 text-center mb-4">Google Login...</p>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
            buttonText="Google Login"
            onSuccess={responseOauth}
            onFailure={responseOauth}
            cookiePolicy={'single_host_origin'}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

function mapStateToProps(reduxState){
  return {
    username: reduxState.username,
    profilePic: reduxState.profilePic
  }
}

export default connect(mapStateToProps)(LoginBox)
