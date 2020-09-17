import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import MyProfile from './MyProfile';
import MyHive from './MyHive';
import GoolgeOAuth from '../GoolgeOAuth';
import Spinner from '../Spinner';
import '../../styles/pages/Main.scss'
import api from '../../api';
import profilePicPlaceholderUrl from '../../media/beesaberlogo.png'

function Main(props) {
    const { dispatch, userdata, fetchingData } = props;

    useEffect(() => {
    }, [props.userdata.profilePic]) // To avoid broken profile pic - rerender if it changes 

    return (
        <div id="main">
            <div id="header">
                <div className="headerpart" id="header-left">
                    {/* Google Profile Data */}
                    {api.isLoggedIn() && userdata && 
                                        <div id="profile-login-icon">
                                            {userdata.profilePic && 
                                                <img 
                                                    referrerpolicy="no-referrer" //avoids broken img due to 403 response from google
                                                    src={userdata.profilePic ? userdata.profilePic : profilePicPlaceholderUrl} 
                                                    id="profile-pic-sm" alt="profile pic"/>}
                                            {userdata.username}
                                        </div>
                                    }
                </div>
                <div className="headerpart" id="header-center">
                    {/* Fechting Data Status Update */}
                    {api.isLoggedIn() && (fetchingData.status) && <Spinner text={fetchingData.statusText} />}
                </div>
                <div className="headerpart" id="header-right">
                    {!api.isLoggedIn() && <GoolgeOAuth id="googlelogin" type="login"/>} 
                    {api.isLoggedIn() &&  <GoolgeOAuth id="googlelogin" type="logout" />} 
                </div>
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
        userdata: reduxState.userdata,
        fetchingData: reduxState.fetchingData
    }
  }
  
  export default connect(mapStateToProps)(Main)
