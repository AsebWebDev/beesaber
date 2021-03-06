import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { newNotification, setFetchStatus } from "./actioncreators";
import api from "./api";
import { filterBeeIntersections } from "./helper/utils";
import Menu from "./components/pages/Menu";
import Main from "./components/pages/Main";
import Notification from "./components/Notification";
import "./styles/pages/App.scss";

function App(props) {
  const { dispatch, userdata, notifications, isLoggedIn } = props;
  const { _id } = userdata;
  const myScoreSaberId = userdata ? userdata.myScoreSaberId : null; // get ScoreSaberID from Store or use null
  let intervalUpdatecheck =
    userdata & userdata.settings // set Interval Frequency
      ? userdata.settings.Performance.intervalUpdatecheck // get Interval Frequency for cheking data
      : 120000; // or use 2 minutes as default 120000
  let [intervalIds, setIntervalIds] = useState([]);

  const errHandler = (err) => {
    if (err === "Could not find user.") {
      intervalIds.forEach((id) => clearInterval(id));
      api.logout();
      dispatch({ type: "LOGOUT" });
    }
    dispatch(newNotification({ text: err.message ? err.message : err }));
    dispatch(setFetchStatus(false));
  };

  const fetchData = async () => {
    dispatch(setFetchStatus(true, "Checking data..."));
    if (myScoreSaberId) {
      await api
        .updateData(myScoreSaberId, _id)
        .then(async (result) => {
          const { updatedNews, needsUpdate } = result;
          let { newUserData } = result;
          if (!!updatedNews.length)
            updatedNews.map((news) => dispatch(newNotification(news)));

          //FIXME: Hier löscht sich manchmal scoreData und ist beim nächsten mal wieder da

          if (needsUpdate) {
            dispatch(setFetchStatus(true, "Updating data..."));
            newUserData = await filterBeeIntersections(newUserData); // updated with intersections
            newUserData.news.sort((a, b) =>
              a.date > b.date ? -1 : a.date < b.date ? 1 : 0
            ); // SORT NEWS BY DATE
            console.log(
              "🚀 ~ file: App.js ~ line 44 ~ awaitapi.updateData ~ newUserData",
              newUserData
            );
            await api
              .saveUserData(_id, newUserData)
              .then(() =>
                dispatch({ type: "UPDATE_USER_DATA", userdata: newUserData })
              )
              .catch((err) => console.log("Saving went wrong: ", err.message));
          }
        })
        .catch((err) => errHandler(err));
    }
    dispatch(setFetchStatus(false));
  };

  // GET BASIC USERDATA FROM BACKEND DATABASE
  useEffect(() => {
    if (isLoggedIn && api.getLocalStorageUser()) {
      const { _id } = api.getLocalStorageUser();
      api
        .getUserData(_id)
        .then((userdata) => dispatch({ type: "UPDATE_USER_DATA", userdata }))
        .catch((err) => errHandler(err));
    }
  }, [dispatch, isLoggedIn]);

  // GET SCORES ONCE
  useEffect(() => {
    if (myScoreSaberId) fetchData(myScoreSaberId); // check for data once when new id is provided
  }, [myScoreSaberId]);

  // CHECK REGULARLY FOR UPDATES
  useEffect(() => {
    let interval;
    if (_id && myScoreSaberId && intervalIds) {
      interval = setInterval(() => fetchData(), intervalUpdatecheck);
      let newIds = [...intervalIds];
      newIds.push();
      setIntervalIds(newIds);
    }
    return () => (interval ? clearInterval(interval) : null);
  }, [userdata, myScoreSaberId, _id]);

  return (
    <div id="App">
      {isLoggedIn && <Menu />}
      <Main />

      {/* Notifications Top Right */}
      <div
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: 9999,
        }}
      >
        {notifications && !!notifications.length && (
          <Notification notifications={notifications} />
        )}
      </div>
    </div>
  );
}

function mapStateToProps(reduxState) {
  return {
    userdata: reduxState.userdata,
    notifications: reduxState.notifications,
    fetchingData: reduxState.fetchingData,
    isLoggedIn: reduxState.isLoggedIn,
  };
}

export default connect(mapStateToProps)(App);
