import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import api from '../../api';
import ScoreOverview from "../ScoreOverview";
import ScoreBox from "../ScoreBox";

function Dashboard(props) {
    const { myScoreSaberId, scoreData } = props.userdata;
    const { dispatch } = props;

    useEffect(() => {
        const fetchData = async () => {
            //get latest Score TODO: move this check somewhere else and compare latest score with currentData
            await api.getlatestScore(myScoreSaberId).then(result => console.log("ONE Score: ", result))
            //get all Scores
            await api.getScores(myScoreSaberId).then((scoresRecent) => {
                const scoresTop = scoresRecent.sort((a,b) => b.score - a.score )
                const userdata = { ...props.userdata, scoreData: { scoresRecent, scoresTop } }
                dispatch({ type: "UPDATE_USER_DATA", userdata })
            })
        }
        if (myScoreSaberId) fetchData()
    }, [myScoreSaberId])

    return (
        <div>
            <h1>Dashboard</h1>
            <header className="App-header">
                {scoreData && scoreData.scoresRecent &&
                    <div>
                        <p>Länge: {scoreData.length} </p>
                        {scoreData && scoreData.scoresRecent.map((item, i) => <p key={i}>Rank: {item.rank} Score: {item.score}</p>)}
                    </div>}
                {scoreData && !scoreData.scoresRecent && <p>Loading...</p>}
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