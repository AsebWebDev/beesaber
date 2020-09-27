import React from 'react'
import { MDBContainer, MDBTooltip, MDBBadge     } from "mdbreact";
import DiffTags from './DiffTag'

export default function OneNewsText(props) {
    const { type, diff, bee, song, songs, numPlayedMore} = props.oneNews
    const maxSongs = 4
    const classNm = 'card-text'
    const beeNm = <b className="bee-yellow"><i className="fab fa-forumbee" aria-hidden="true"></i>  {bee}</b>

    switch(type) {
        case 'ownNewScores': {
            return (
                <MDBContainer>
                    <MDBTooltip domElement tag="p" placement="top">
                        <p className={classNm}>
                            You gained <b>{diff}</b> new Score{(diff > 1)?'s':''}!
                        </p>
                        <table className="scores-tooltip">
                            {songs && songs.slice(0,maxSongs).map( (song,i) => <tr key={i}>
                                <td><MDBBadge color="pink">{song.rank}</MDBBadge></td>
                                <td><DiffTags diff={song.difficulty} /></td>
                                <td><MDBBadge color="light">{song.songName}</MDBBadge></td>
                            </tr>)} 
                            {songs && songs.length > maxSongs && <p>+{songs.length - maxSongs} more!</p>} 
                        </table>
                    </MDBTooltip>
                </MDBContainer>
            )
        }

        case 'morePlayed': {
            return (<p className={classNm}>
                {beeNm} played <b>{numPlayedMore}</b> new song{(numPlayedMore > 1)?'s':''}!
            </p>)

        }

        case 'beatScore': {
            const { songName, songAuthorName, score, myScore  } = song
            return (<p className={classNm}>
                {beeNm} beat you at <b className="neon-blue">{songName}</b> <i>({songAuthorName}) </i> 
                with a Score of <b>{score}</b> <i>(<span className="greyed-out">You - {myScore}</span>)</i> !
            </p>)
        }

        default: return ( 
                <p className="card-text">{props.oneNews.text}</p>
            )
    }
}
