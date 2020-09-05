import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { newNotification, setFetchStatus } from './actioncreators'
import api from './api';
import Menu from './components/pages/Menu';
import Main from './components/pages/Main';
import Notification from './components/Notification'
import './styles/pages/App.scss';

function App(props) {
  const { dispatch, userdata, notifications } = props;
  const { _id } = userdata
  const myScoreSaberId = (userdata) ? userdata.myScoreSaberId : null; // get ScoreSaberID from Store or use null
  let intervalUpdatecheck = (userdata & userdata.settings) // set Interval Frequency
                                  ? userdata.settings.Performance.intervalUpdatecheck // get Interval Frequency for cheking data
                                  : 120000 // or use 2 minutes as default 120000
  const fetchDataRegularly = () => setInterval(() => fetchData(), intervalUpdatecheck);
  

  const fetchData = async () => {
      dispatch(setFetchStatus(true, 'Checking data...'))
      await api.updateData(myScoreSaberId, _id).then(async result => {
        const { updatedNews, newUserData, needsUpdate } = result
        console.log("UPDATE DATA RESULT: ", result)
        if (!!updatedNews.length) updatedNews.map( news => dispatch(newNotification(news) ) )
        if (needsUpdate) {
          dispatch(setFetchStatus(true, 'Updating data...'))
          await api.saveUserData(_id, newUserData)
          .then(() => dispatch({ type: "UPDATE_USER_DATA", userdata: newUserData }))
        }
      }).catch((err) => {
          dispatch(newNotification({text: err.message}))
          dispatch(setFetchStatus(false))
        })
      dispatch(setFetchStatus(false))
  }

  // GET BASIC USERDATA FROM BACKEND DATABASE
  useEffect(() => {
    if (api.isLoggedIn() && api.getLocalStorageUser()) {
      const { _id } = api.getLocalStorageUser()
      api.getUserData(_id).then(userdata => dispatch({ type: "UPDATE_USER_DATA", userdata }) )
    }
  }, [dispatch])

  // GET SCORES ONCE
  useEffect(() => {
    if (myScoreSaberId) fetchData(myScoreSaberId) // check for data once when new id is provided 
  }, [myScoreSaberId])

  // CHECK REGULARLY FOR UPDATES
  useEffect(() => {
    if (_id) fetchDataRegularly()
    return () => clearInterval(fetchDataRegularly)
  }, [userdata, myScoreSaberId, _id])

  return (
    <div id="App">
      <Menu />
      <Main />

      {/* Notifications Top Right */}
      <div style={{
              position: "fixed",
              top: "10px",
              right: "10px",
              zIndex: 9999
          }}>
          {notifications && !!notifications.length && <Notification notifications={notifications}/>}
      </div>
    </div>
  );
}

function mapStateToProps(reduxState){
  return {
    userdata: reduxState.userdata,
    notifications: reduxState.notifications,
    fetchingData: reduxState.fetchingData
  }
}

export default connect(mapStateToProps)(App);
