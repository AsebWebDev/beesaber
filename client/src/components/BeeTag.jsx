import React from 'react'
import { MDBContainer, MDBTooltip, MDBBadge, MDBIcon} from "mdbreact";
import { parseSongPicUrl, parseAvatarUrl } from '../helper/parser'
import avatarPlaceholder from '../media/bee.jpg'
import '../styles/BeeTag.scss'

export default function BeeTag(props) {
    const { playerName, country, countryRank, rank, avatar, playerId, averageRankedAccuracy, totalPlayCount, rankedPlayCount } = props.bee
    const lastPlayedSong = props.bee.scoreData ? props.bee.scoreData.scoresRecent[0] : null
    const url = ( !playerId || avatar === '/images/steam.png' || avatar === '/images/oculus.png')
            ? avatarPlaceholder 
            : parseAvatarUrl(playerId)

    return (
        <MDBContainer id="beetag" >
            <MDBTooltip domElement tag="span" placement="top">
                <span id="badge-yellow" className="tag badge badge-warning"><i className="fab fa-forumbee" aria-hidden="true"></i>{playerName}</span>

                {/* TOOLTIP SHOWING ONLY ON HOVER */}
                <div className="userInfoPopup">
                    <div id="beetag-header">
                        <img src={url} alt="Avatar"/>
                        <p><b>{playerName}</b></p>
                    </div>
                    <div id="beetag-tags" className="d-flex">
                        {countryRank && <MDBBadge color="light">{country && <i className={country.toLowerCase() +" flag"}></i>}#{countryRank}</MDBBadge>}
                        {rank && <MDBBadge color="light"><i className="fas fa-globe"/>#{rank}</MDBBadge>}
                        {averageRankedAccuracy && <MDBBadge color="light"><MDBIcon far icon="dot-circle" />{averageRankedAccuracy.toFixed(2)}%</MDBBadge>}
                        {totalPlayCount && <MDBBadge color="light"><MDBIcon icon="calculator" />Total Play Count: {totalPlayCount}</MDBBadge>}
                        {rankedPlayCount && <MDBBadge color="light"><MDBIcon icon="calculator" />Ranked Play Count: {rankedPlayCount}</MDBBadge>}
                        {lastPlayedSong && <div id="last-played">
                            <MDBBadge color="dark">
                                Last-
                                <MDBIcon icon="music" />
                                <img src={parseSongPicUrl(lastPlayedSong.songHash)} alt="Last played song"/>
                                <p>{lastPlayedSong.songName} by {lastPlayedSong.songAuthorName}</p>
                            </MDBBadge>
                        </div>}
                    </div>
                </div>
            </MDBTooltip>
        </MDBContainer>
    )
}
