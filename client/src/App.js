import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { checkForNews } from './helper/checkForNews'
import { newNotification } from './actioncreators'
import api from './api';
import Menu from './components/pages/Menu';
import Main from './components/pages/Main';
import Notification from './components/Notification'
import './styles/pages/App.scss';

function App(props) {
  const { dispatch, userdata, notifications } = props;
  const { bees, scoreData, _id } = userdata
  const myScoreSaberId = (userdata) ? userdata.myScoreSaberId : null; // get ScoreSaberID from Store or use null
  let intervalUpdatecheck = (userdata & userdata.settings) // set Interval Frequency
                                  ? userdata.settings.Performance.intervalUpdatecheck // get Interval Frequency for cheking data
                                  : 9000 // or use 2 minutes as default 120000

  const fetchData = async () => {
    console.log("Updating your data...")
    const { scoresRecent, scoredSongsIds } = userdata.scoreData
    let scoreDataExist = (scoresRecent && scoresRecent.length > 0 && userdata.totalPlayCount) //check for any Scoredata
    let dataUpdateNeeded = false; 

    // check if Database latest Score is different from Scoresaber...
    if (scoreDataExist) await api.dataUpdateNeeded(userdata.totalPlayCount, userdata.myScoreSaberId)
        .then(result => {
          console.log("Data refresh needed?: ", result)
          dataUpdateNeeded = (result) ? result : null
          // dataUpdateNeeded = true //FIXME: Testing...
        })

    //... if yes / or no Data ever has been fetched, get all Scores
    if (dataUpdateNeeded || !scoreDataExist) {
      await api.getScores(myScoreSaberId)
        .then((scoreData) => {
          api.getScoreSaberUserInfo(myScoreSaberId, 'id')
            .then(scoreSaberUserInfo => {
              const userdata = { ...props.userdata, ...scoreSaberUserInfo, scoreData }
              api.saveUserData(userdata._id, userdata)
              dispatch({ type: "UPDATE_USER_DATA", userdata })
            })
      })
    }
    dispatch(newNotification("Updated your data..."))
  }

  // GET BASIC USERDATA FROM BACKEND DATABASE
  useEffect(() => {
    if (api.isLoggedIn() && api.getLocalStorageUser()) {
      const { _id } = api.getLocalStorageUser()
      api.getUserData(_id).then(userdata => {
        dispatch({ type: "UPDATE_USER_DATA", userdata })
      })
    }
  }, [dispatch])

  // GET SCORES ONCE & THEN REGULARLY FROM SCORESABER WHEN ID EXISTS
  useEffect(() => {
    if (myScoreSaberId) fetchData(myScoreSaberId) // check for data once when new id is provided 
  }, [myScoreSaberId, userdata.totalPlayCount])


  useEffect(() => {
    if (userdata && bees && scoreData && scoreData.scoresRecent && _id ) checkForNews(bees, scoreData.scoresRecent, scoreData.scoredSongsIds, _id)
        .then(async result =>  {
          let data = { ...userdata, bees: result.bees}
          await api.saveUserData(_id, data)
            .then(() => dispatch({ type: "UPDATE_USER_DATA", userdata: data }))
            dispatch({ type: "UPDATE_USER_DATA", userdata: data })
    })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myScoreSaberId])

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
