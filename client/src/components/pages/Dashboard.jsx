import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ScoreBox from "../ScoreBox";
import HiveBox from "../HiveBox";
import NewsBox from "../NewsBox";
import Spinner from "../Spinner";
import '../../styles/pages/Dashboard.scss'

function Dashboard(props) {
    const { userdata } = props;
    const { scoreData } = userdata;
    const myScoreSaberId = (userdata) ? (userdata.myScoreSaberId) : null;

    useEffect(() => {
        console.log("Dashboard useeffect")
    }, [userdata])

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                {/* SHOW DASHBOARD */}
                {myScoreSaberId && scoreData && scoreData.scoresRecent &&
                    <div id="dashboard">
                        <div id="dashboard-top"> 
                            <ScoreBox data={scoreData.scoresRecent} />
                            <div id="dashboard-right">
                                <HiveBox />
                                <NewsBox />
                            </div> 
                        </div>
                        <div id="dashboard-bottom"> 
                        </div>
                    </div>
                }
                {/* LOADING */}
                {scoreData && !scoreData.scoresRecent && < Spinner text="Loading..." />}
                
                {/* NO ID PROVIDED */}
                {!myScoreSaberId && <p>No ID provided.</p>}
            </div>
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
        userdata: reduxState.userdata
    }
}

export default connect(mapStateToProps)(Dashboard);