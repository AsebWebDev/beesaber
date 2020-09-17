import React, { useEffect, useState } from 'react';
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
                                  : 15000 // or use 2 minutes as default 120000
  let [intervalIds, setIntervalIds] = useState([])

  const errHandler= (err) => {
    if (err = "Could not find user.") {
      intervalIds.forEach(id => clearInterval(id))
      api.logout();
      dispatch({ type: "LOGOUT" })
    }
    dispatch(newNotification({text: err.message ? err.message : err}))
    dispatch(setFetchStatus(false))
  }
  
  const fetchData = async () => {
    dispatch(setFetchStatus(true, 'Checking data...'))
    if (myScoreSaberId) {
      await api.updateData(myScoreSaberId, _id).then(async result => {
        const { updatedNews, newUserData, needsUpdate } = result
        if (!!updatedNews.length) updatedNews.map( news => dispatch(newNotification(news) ) )
        if (needsUpdate) {
          newUserData.news.sort((a,b) => (a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0)) // SORT NEWS BY DATE
          dispatch(setFetchStatus(true, 'Updating data...'))
          await api.saveUserData(_id, newUserData)
            .then(() => dispatch({ type: "UPDATE_USER_DATA", userdata: newUserData }))
      }
      }).catch((err) => errHandler(err))
    }
    dispatch(setFetchStatus(false))
  }

  // GET BASIC USERDATA FROM BACKEND DATABASE
  useEffect(() => {
    if (api.isLoggedIn() && api.getLocalStorageUser()) {
      const { _id } = api.getLocalStorageUser()
      api.getUserData(_id)
        .then(userdata => dispatch({ type: "UPDATE_USER_DATA", userdata }) )
        .catch((err) => errHandler(err))
    }
  }, [dispatch])

  // GET SCORES ONCE
  useEffect(() => {
    if (myScoreSaberId) fetchData(myScoreSaberId) // check for data once when new id is provided 
  }, [myScoreSaberId])

  // CHECK REGULARLY FOR UPDATES
  useEffect(() => {
    let interval
    if (_id && myScoreSaberId) {
      interval = setInterval(() => fetchData(), intervalUpdatecheck)
      setIntervalIds(intervalIds.push(interval))
    }
    return () => {
      console.log("Clearing ID: ", interval)
      return interval ? clearInterval(interval) : null
    }
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
