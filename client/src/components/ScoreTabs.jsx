import React from 'react'
import { MDBTabPane, MDBBadge } from "mdbreact";
import { parseSongPicUrl } from '../helper/parser'
import moment from 'moment'
import DiffTags from './DiffTag'
import '../styles/ScoreTabs.scss'

export default function ScoreTabs(props) {
    const { tabId, data, size } = props;

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
                                {data.map((data, index) => {
                                    return(
                                        <tr key={index}>
                                            <td><MDBBadge color="pink">{data.rank}</MDBBadge></td>
                                            <td>
                                                <div className="song-data">
                                                    <DiffTags diff={data.difficulty} />
                                                    <img src={parseSongPicUrl(data.songHash)} alt="Cover"/>
                                                    <MDBBadge color="dark">{data.songAuthorName} - {data.songName}<span className="greyed-out"> by {data.levelAuthorName}</span></MDBBadge>
                                                </div>
                                            </td>
                                            <td><MDBBadge color="orange">{data.score}</MDBBadge></td>
                                            <td className="time"><b className="card-link blue-text">{moment(data.timeSet).format('lll')}</b></td>
                                        </tr>
                                    )})
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </MDBTabPane>
        </div>
        
    )
}
