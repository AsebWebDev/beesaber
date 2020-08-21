import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ScoreOverview from "../ScoreOverview";
import ScoreBox from "../ScoreBox";

function Dashboard(props) {
    const { scoreData } = props.userdata;
    const myScoreSaberId = (props.userdata) ? (props.userdata.myScoreSaberId) : null;

    return (
        <div>
            <h1>Dashboard</h1>
            <header className="App-header">
                {myScoreSaberId &&
                    <div>
                        {scoreData && scoreData.scoresRecent &&
                            <div>
                                <ScoreBox data={scoreData.scoresRecent} />
                                <ScoreOverview data={scoreData.scoresRecent} />
                            </div>}
                        {scoreData && !scoreData.scoresRecent && <p>Loading...</p>}
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