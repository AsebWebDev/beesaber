import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ScoreBox from "../ScoreBox";
import HiveBox from "../HiveBox";
import Spinner from "../Spinner";

function Dashboard(props) {
    const { scoreData } = props.userdata;
    const myScoreSaberId = (props.userdata) ? (props.userdata.myScoreSaberId) : null;

    useEffect(() => {
        console.log("Dashboard useeffect")
    }, [props.userdata])

    return (
        <div id="dashboard">
            <h1>Dashboard</h1>
            <header className="App-header">
                {myScoreSaberId &&
                    <div>
                        {scoreData && scoreData.scoresRecent &&
                            <div>
                                <ScoreBox data={scoreData.scoresRecent} />
                                <HiveBox />
                            </div>}
                        {scoreData && !scoreData.scoresRecent && < Spinner text="Loading..." />}
                    </div>}
                {!myScoreSaberId && <p>No ID provided.</p>}
            </header>
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
        userdata: reduxState.userdata
    }
}

export default connect(mapStateToProps)(Dashboard);