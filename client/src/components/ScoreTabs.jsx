import React from 'react'
import { MDBTabPane, MDBBadge } from "mdbreact";
import moment from 'moment'
import DiffTags from './DiffTag'
import '../styles/ScoreTabs.scss'

export default function ScoreTabs(props) {
    const { tabId, data, size } = props

    return (
        <MDBTabPane tabId={tabId} role="tabpanel" className={"score-box tabs-size-" + size}>
            <p className="mt-2">
                <div className="col-md-12">
                    <table className="table table-box table-hover">
                        <thead>
                            <tr>
                            <th className="rank" scope="col">Rank</th>
                            <th className="song" scope="col">Song</th>
                            <th className="score" scope="col">Score</th>
                            { (size !== "sm") && <th className="time" scope="col">Time</th> }       
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((data, index) => {
                                return(
                                    <tr key={index}>
                                        <td><MDBBadge color="pink">{data.rank}</MDBBadge></td>
                                        <td>
                                            <div className="song-data">
                                                <DiffTags diff={data.difficulty} />
                                                <img src={`https://new.scoresaber.com/api/static/covers/${data.songHash}.png`} alt="Cover"/>
                                                <MDBBadge color="dark">
                                                    {data.songAuthorName} - {data.songName}
                                                    <span className="greyed-out"> 
                                                        { (size !== "sm") && <span> by {data.levelAuthorName}</span>}
                                                    </span>
                                                </MDBBadge>
                                            </div>
                                        </td>
                                        <td><MDBBadge color="orange">{data.score}</MDBBadge></td>
                                        { (size !== "sm") && <td><b className="card-link blue-text">{moment(data.timeSet).format('lll')}</b></td> }
                                    </tr>
                                )})
                            }
                        </tbody>
                    </table>
                </div>
            </p>
        </MDBTabPane>
    )
}
