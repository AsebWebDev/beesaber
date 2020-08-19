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

  useEffect(() => {
    if (api.isLoggedIn() && api.getLocalStorageUser()) {
      const { _id } = api.getLocalStorageUser()
      api.getUserData(_id)
        .then(userdata => {
        console.log("App -> userdata", userdata)
          dispatch({ type: "UPDATE_USER_DATA", userdata })
        })
    }
  }, [dispatch])

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
