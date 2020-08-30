import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { newNotification } from './actioncreators'
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
                                  : 15000 // or use 2 minutes as default 120000

  const fetchData = async () => {
    console.log("Updating your data...")
    await api.updateData(myScoreSaberId, _id).then(async result => {
      const { updatedNews, newUserData, needsUpdate } = result
      console.log("UPDATE DATA RESULT: ", result)
      if (!!updatedNews.length) updatedNews.map( news => dispatch(newNotification(news) ) )
      if (needsUpdate) await api.saveUserData(_id, newUserData)
        .then(() => dispatch({ type: "UPDATE_USER_DATA", userdata: newUserData }))
    })
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
    const id = setInterval(() => fetchData(), intervalUpdatecheck);
    return () => clearInterval(id)
  }, [userdata])

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
    notifications: reduxState.notifications
  }
}

export default connect(mapStateToProps)(App);
