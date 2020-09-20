import React from 'react'
import { connect } from 'react-redux';
import '../styles/GoogleProfileData.scss'
import profilePicPlaceholderUrl from '../media/beesaberlogo.png'

function GoogleProfileData(props) {
    const { userdata } = props;

    if (userdata) return (
        <div id="google-profile-data">
            {userdata.profilePic &&     
                <img 
                    referrerPolicy="no-referrer" //avoids broken img due to 403 response from google
                    src={userdata.profilePic ? userdata.profilePic : profilePicPlaceholderUrl} 
                    id="profile-pic-sm" alt="profile pic"/>}
            <span>{userdata.username}</span>
        </div>                                                                  
    )
    else return null
}

function mapStateToProps(reduxState){
    return {
        userdata: reduxState.userdata,
        fetchingData: reduxState.fetchingData
    }
  }
  
export default connect(mapStateToProps)(GoogleProfileData)