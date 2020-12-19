import React from 'react'
import { MDBTabPane } from "mdbreact";
import HighScoresForOneSong from './HighScoresForOneSong'
import '../../styles/ScoreTabs.scss'

export default function ScoreTabs(props) {
    const { tabId, scores, size } = props;

    if(scores.length === 0) return null

    return (
        <div id="scoretabs">
            <MDBTabPane tabId={tabId} role="tabpanel" className={"score-box tabs-size-" + size}>
                <div className="mt-2">
                    <div className="col-md-12">
                        <table className="table table-box table-hover">
                            <thead>
                                <tr>
                                <th className="rank" scope="col">Rank</th>
                                <th className="song" scope="col">Song</th>
                                <th className="score" scope="col">Score</th>
                                <th className="time" scope="col">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scores.map((highscoresForOneSong, i) => <HighScoresForOneSong highscores={highscoresForOneSong} key={i} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </MDBTabPane>
        </div>
        
    )
}
