import React from 'react'
import { MDBTabPane, MDBBadge, MDBIcon, MDBAnimation, MDBTooltip } from "mdbreact";
import { parseSongPicUrl } from '../helper/parser'
import moment from 'moment'
import DiffTags from './DiffTag'
import BeeTag from './BeeTag'
import '../styles/ScoreTabs.scss'

export default function ScoreTabs(props) {
    const { tabId, data, size } = props;

    const logid = (scoreId) => console.log("scoreId: !", scoreId)

    if(data.length === 0) return null
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
                                {data.map((data, i) => {
                                    return(
                                        <tr key={i} className={data.playedByHive ? "played-by-hive" : ""}>
                                            <td><MDBBadge color="pink">{data.rank}</MDBBadge></td>
                                            <td>
                                                <div className="song-data">
                                                    <DiffTags diff={data.difficulty} />
                                                    <img src={parseSongPicUrl(data.songHash)} alt="Cover"/>
                                                    {/* {data.playedByHive &&  <MDBBadge color="light"><MDBIcon far icon="play-circle" /></MDBBadge>} */}
                                                    {data.playedByHive && 
                                                        <MDBTooltip domElement popover tag="span" placement="top">
                                                            <span><MDBAnimation type="pulse" infinite><MDBIcon far icon="play-circle" /></MDBAnimation></span>
                                                            <div className="also-played-by">
                                                                <table>
                                                                    <thead>
                                                                        <th>Bee</th>
                                                                        <th>Score</th>
                                                                        <th>My Score</th>
                                                                    </thead>
                                                                    <tbody id="bees">
                                                                        {data.playedBy.map((bee, i) => <tr key={i} >
                                                                            <td><BeeTag bee={bee}/></td>
                                                                            <td>{bee.beeScore}</td>
                                                                            <td>{bee.myScore}</td>
                                                                        </tr>)}
                                                                    </tbody>
                                                                </table>
                                                                {/* {data.playedBy.map((bee, i) => <div id="bees" key={i} ><BeeTag bee={bee}/></div>)} */}
                                                            </div>
                                                        </MDBTooltip>}
                                                    <MDBBadge onClick={() => logid(data.songHash)} color="dark">{data.songAuthorName} - {data.songName}<span className="greyed-out"> by {data.levelAuthorName}</span></MDBBadge>
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
