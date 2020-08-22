import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import api from './api';
import LoginBox from './components/LoginBox';
import Menu from './components/pages/Menu';
import Main from './components/pages/Main';
import './styles/pages/App.scss';

function App(props) {
  const { dispatch } = props;
  const myScoreSaberId = (props.userdata) ? props.userdata.myScoreSaberId : null;

  const fetchData = async () => {
    console.log("Fetch Data triggered")
    let scoreDataExist = (props.userdata.scoreData.scoresRecent && props.userdata.scoreData.scoresRecent.length > 0)
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
      setInterval(() => {
        console.log("Interval: check for Data...")
        if (myScoreSaberId) fetchData(myScoreSaberId)
      }, 30000);
  }, [myScoreSaberId])

  return (
    <div id="App">
      <Menu />
      <Main />
    </div>
  );
}

function mapStateToProps(reduxState){
  return {
    userdata: reduxState.userdata,
  }
}

export default connect(mapStateToProps)(App);
