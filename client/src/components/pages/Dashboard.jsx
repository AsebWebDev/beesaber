import React from "react";
import { connect } from "react-redux";
import ScoreBox from "../Scorebox/ScoreBox";
import HiveBox from "../HiveBox/HiveBox";
import NewsBox from "../NewsBox/NewsBox";
import Spinner from "../Spinner";
import "../../styles/pages/Dashboard.scss";

function Dashboard(props) {
  const { userdata } = props;
  const { scoreData } = userdata;
  const myScoreSaberId = userdata ? userdata.myScoreSaberId : null;

  return (
    <div>
      <h1 className="page-title">
        <span className="neon-red">Dashboard</span>
      </h1>
      <div>
        {/* SHOW DASHBOARD */}
        {myScoreSaberId && scoreData && scoreData.scoresRecent && (
          <div id="dashboard">
            <ScoreBox data={scoreData} size="m" />
            <NewsBox />
            <HiveBox />
          </div>
        )}

        {/* LOADING */}
        {scoreData && !scoreData.scoresRecent && <Spinner text="Loading..." />}

        {/* NO ID PROVIDED */}
        {!myScoreSaberId && <p>No ID provided.</p>}
      </div>
    </div>
  );
}

function mapStateToProps(reduxState) {
  return {
    userdata: reduxState.userdata,
  };
}

export default connect(mapStateToProps)(Dashboard);
