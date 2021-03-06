import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';
import MyProfile from './MyProfile';
import MyHive from './MyHive';
import GoolgeOAuth from '../GoolgeOAuth';
import GoogleProfileData from '../GoogleProfileData';
import Spinner from '../Spinner';
import '../../styles/pages/Main.scss'

function Main(props) {
    const { fetchingData, isLoggedIn, loggingIn } = props;

    return (
        <div id="main">
            {isLoggedIn && <div id="header">
                <div className="headerpart" id="header-left">
                    <GoogleProfileData />
                </div>
                <div className="headerpart" id="header-center">
                    {/* Fechting Data Status Update */}
                    {isLoggedIn && (fetchingData.status) && <Spinner text={fetchingData.statusText} />}
                </div>
                <div className="headerpart" id="header-right">
                    {loggingIn && <span className="bee-yellow bsfont" >Logging you in...</span>}
                    {!loggingIn && <GoolgeOAuth />}
                </div>
            </div>}
            <Switch>
                <Route path="/" exact component={isLoggedIn ? Dashboard : LandingPage} />
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
        fetchingData: reduxState.fetchingData,
        isLoggedIn: reduxState.isLoggedIn,
        loggingIn: reduxState.loggingIn
    }
  }
  
export default connect(mapStateToProps)(Main)
