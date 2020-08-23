import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { newNotification } from './actioncreators'
import api from './api';
import Menu from './components/pages/Menu';
import Main from './components/pages/Main';
import Notification from './components/Notification'
import './styles/pages/App.scss';

function App(props) {
  const { dispatch } = props;
  const myScoreSaberId = (props.userdata) ? props.userdata.myScoreSaberId : null; // get ScoreSaberID from Store or use null
  console.log("App -> myScoreSaberId", myScoreSaberId)
  let intervalUpdatecheck = (props.userdata & props.userdata.settings) 
                                  ? props.userdata.settings.Performance.intervalUpdatecheck // get Interval Frequency for cheking data
                                  : 30000 // or use 30 second as default

  const fetchData = async () => {
    console.log("Fetch Data triggered")
    dispatch(newNotification("Fetch Data triggered"))
    let scoreDataExist = (props.userdata.scoreData.scoresRecent && props.userdata.scoreData.scoresRecent.length > 0) //check for any Scoredata
    let dataUpdateNeeded = false; 

    // check if Database latest Score is different from Scoresaber...
    if (scoreDataExist) await api.dataUpdateNeeded(props.userdata.scoreData.scoresRecent[0], props.userdata.myScoreSaberId)
        .then(result => {
          console.log("Data refresh needed?: ", result)
          dataUpdateNeeded = result
        })
    //... if yes / or no Data ever has been fetched, get all Scores
    if (dataUpdateNeeded || !scoreDataExist) await api.getScores(myScoreSaberId).then((scoresRecent) => {
        const scoresTop = [...scoresRecent] 
        scoresTop.sort((a,b) => b.score - a.score )
        const userdata = { ...props.userdata, scoreData: { scoresRecent, scoresTop } }
        api.saveUserData(props.userdata._id, userdata)
        dispatch({ type: "UPDATE_USER_DATA", userdata })
    })
  }

  // GET BASIC USERDATA FROM BACKEND DATABASE
  useEffect(() => {
    if (api.isLoggedIn() && api.getLocalStorageUser()) {
      const { _id } = api.getLocalStorageUser()
      api.getUserData(_id)
        .then(userdata => {
          dispatch({ type: "UPDATE_USER_DATA", userdata })
        })
    }
  }, [dispatch])

  // GET SCORES FROM SCORESABER WHEN ID EXISTS
  useEffect(() => {
      if (myScoreSaberId) fetchData(myScoreSaberId)
      if (api.isLoggedIn()) setInterval(() => {
          console.log("Interval: check for Data...")
          if (myScoreSaberId) fetchData(myScoreSaberId)
      }, intervalUpdatecheck);
  }, [myScoreSaberId])

  return (
    <div id="App">
      <Menu />
      <Main />
      <div style={{
              position: "fixed",
              top: "10px",
              right: "10px",
              zIndex: 9999
          }}>
          {props.notifications && !!props.notifications.length && <Notification notifications={props.notifications}/>}
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
