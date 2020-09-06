import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { MDBIcon, MDBBtn } from 'mdbreact';
import Dashboard from './Dashboard';
import MyProfile from './MyProfile';
import MyHive from './MyHive';
import GoolgeLogin from '../GoolgeLogin';
import Spinner from '../Spinner';
import '../../styles/pages/Main.scss'
import api from '../../api';
import profilePicPlaceholderUrl from '../../media/beesaberlogo.png'

function Main(props) {
    const { dispatch, userdata, fetchingData } = props;

    let handleLogout = () => {
        api.logout();
        let userdata = { username: null, profilePic: null }
        dispatch({ type: "UPDATE_USER_DATA", userdata })
        dispatch({ type: "LOGOUT" })
    }

    useEffect(() => {
    }, [props.userdata.profilePic]) // To avoid broken profile pic - rerender if it changes 

    return (
        <div id="main">
            <div id="header">
                <div className="headerpart" id="header-left">
                    {/* Fechting Data Status Update */}
                    {api.isLoggedIn() && (fetchingData.status) && <Spinner text={fetchingData.statusText} />}
                </div>
                <div className="headerpart" id="header-center">
                </div>
                <div className="headerpart" id="header-right">
                    

                    <div id="username-login-logout">

                        {!api.isLoggedIn() && <GoolgeLogin id="googlelogin"/>}


                        {api.isLoggedIn() && 
                            // <MDBBtn onClick={handleLogout} size="sm" color="danger">
                            //     Logout
                            //     <MDBIcon icon="sign-out-alt" className="ml-1" />
                            // </MDBBtn>
                                <button id="logout-btn" className="neon-red" onClick={handleLogout}>
                                    Logout
                                    <MDBIcon icon="sign-out-alt" className="ml-1" />
                                </button>
                                }


                        {api.isLoggedIn() && userdata && 
                                        <div className="username neon-blue on">
                                            {userdata.username}
                                        </div>
                                    }
                    </div>


                    {/* Google Profile Data */}
                    {api.isLoggedIn() && userdata && 
                                        <div id="profile-login-icon">
                                            {userdata.profilePic && 
                                                <img 
                                                src={userdata.profilePic ? userdata.profilePic : profilePicPlaceholderUrl} 
                                                id="profile-pic-sm" alt="profile pic"/>}
                                            {/* {userdata.username} */}
                                        </div>
                                    }
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
