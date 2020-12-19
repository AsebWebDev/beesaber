import React from 'react'
import { MDBBadge, MDBIcon, MDBAnimation, MDBTooltip } from "mdbreact";
import { parseSongPicUrl } from '../../../helper/parser'
import moment from 'moment'
import DiffTags from '../../DiffTag'
import HighscoreTable from './HighscoreTable'

function HighScoresForOneSong(props) {
    const { highscores } = props;
    const logid = (scoreId) => console.log("scoreId: !", scoreId)

    let scoreColorClass = '';

    if (highscores.playedByHive) {
       scoreColorClass = ( highscores.playedBy.filter(bee => bee.myScore < bee.beeScore).length > 0 )
            ? 'played-by-hive-lost'
            : 'played-by-hive-won'
    } 

    return (
        <tr className={scoreColorClass}>
            <td><MDBBadge color="pink">{highscores.rank}</MDBBadge></td>
            <td>
                <div className="song-data">
                    <DiffTags diff={highscores.difficulty} />
                    <img src={parseSongPicUrl(highscores.songHash)} alt="Cover"/>
                    {highscores.playedByHive && 
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
                                        {highscores.playedBy.map((bee, i) => <HighscoreTable bee={bee} key={i} />)}
                                    </tbody>
                                </table>
                            </div>
                        </MDBTooltip>}
                    <MDBBadge onClick={() => logid(highscores.songHash)} color="dark">{highscores.songAuthorName} - {highscores.songName}<span className="greyed-out"> by {highscores.levelAuthorName}</span></MDBBadge>
                </div>
            </td>
            <td><MDBBadge color="orange">{highscores.score}</MDBBadge></td>
            <td className="time"><b className="card-link blue-text">{moment(highscores.timeSet).format('lll')}</b></td>
        </tr>
    )
}

export default HighScoresForOneSong