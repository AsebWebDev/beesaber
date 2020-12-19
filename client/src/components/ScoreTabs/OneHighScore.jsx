import React from 'react'
import { MDBBadge, MDBIcon, MDBAnimation, MDBTooltip } from "mdbreact";
import { parseSongPicUrl } from '../../helper/parser'
import moment from 'moment'
import DiffTags from '../DiffTag'
import HighscoreTable from './HighscoreTable'

function OneHighScore(props) {
    const { highscore } = props;
    const logid = (scoreId) => console.log("scoreId: !", scoreId)
    return (
        <tr className={highscore.playedByHive ? "played-by-hive" : ""}>
            <td><MDBBadge color="pink">{highscore.rank}</MDBBadge></td>
            <td>
                <div className="song-data">
                    <DiffTags diff={highscore.difficulty} />
                    <img src={parseSongPicUrl(highscore.songHash)} alt="Cover"/>
                    {highscore.playedByHive && 
                        <MDBTooltip domElement clickable tag="span" placement="top">
                            <span><MDBAnimation type="pulse" infinite><MDBIcon far icon="handshake" /></MDBAnimation></span>
                            <div className="also-played-by">
                                <table>
                                    <thead>
                                        <th>Bee</th>
                                        <th>Score</th>
                                        <th>My Score</th>
                                    </thead>
                                    <tbody id="bees">
                                        {highscore.playedBy.map((bee, i) => <HighscoreTable bee={bee} i={i} />)}
                                    </tbody>
                                </table>
                            </div>
                        </MDBTooltip>}
                    <MDBBadge onClick={() => logid(highscore.songHash)} color="dark">{highscore.songAuthorName} - {highscore.songName}<span className="greyed-out"> by {highscore.levelAuthorName}</span></MDBBadge>
                </div>
            </td>
            <td><MDBBadge color="orange">{highscore.score}</MDBBadge></td>
            <td className="time"><b className="card-link blue-text">{moment(highscore.timeSet).format('lll')}</b></td>
        </tr>
    )
}

export default OneHighScore