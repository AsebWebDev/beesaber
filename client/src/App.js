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
  let [data, setData] = useState([])
  let [query, setQuery] = useState(null)
  let [currentID, setCurrentID] = useState('76561198101951971')
  let scores = []
  let noResult = false

  const fetchData = async (currentID) => {
    let count = 1;
    while (!noResult) {
      await axios('https://new.scoresaber.com/api/player/'+ currentID +'/scores/recent/'+ count++)
        .then(scoreReply => {
          if (scoreReply.ok) noResult = true;
          scores.push(...scoreReply.data.scores)
          return scores
        })
    }
  };

  useEffect(() => {
    fetchData(currentID).finally(() => setData(scores))
  }, [])

  useEffect(() => {
    if (api.isLoggedIn() && api.getLocalStorageUser()) {
      const { username, profilePic, _id } = api.getLocalStorageUser()
      const userdata = { username, profilePic }
      dispatch({ type: "UPDATE_USER_DATA", userdata })
      // api.getUserSettings(_id)
      // .then(settings => dispatch({ type: "UPDATE_USER_SETTINGS", settings}))
      // .catch(err => dispatch(newNotification(err.toString())))
    }
  }, [dispatch])

  useEffect(() => {
    console.log("Data has changed")
    setQuery(null)
  }, [data])

  function clickSubmit (e) {
    console.log(query)
    setCurrentID(query)
    fetchData(query).finally(() => setData(scores))
  }

  function handleChange (e) {
    setQuery(e.target.value)
  }
  
  return (
    <div id="App">
      <Menu />
      <Main />
    </div>
  );
}

function mapStateToProps(reduxState){
  return {
    profilePic: reduxState.profilePic,
    username: reduxState.username
  }
}

export default connect(mapStateToProps)(App);
