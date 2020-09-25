import React from 'react'
import { MDBContainer, MDBTooltip, MDBBadge } from "mdbreact";
import avatarPlaceholder from '../media/bee.jpg'
import '../styles/BeeTag.scss'

export default function BeeTag(props) {
    const { playerName, country, countryRank, rank, avatar, playerId } = props.bee
    console.log("BeeTag -> props.bee", props.bee)
    const url = ( avatar === '/images/steam.png' || avatar === '/images/oculus.png')
            ? avatarPlaceholder 
            : `https://new.scoresaber.com/api/static/avatars/${playerId}.jpg`

    return (
        <MDBContainer id="beetag" >
            <MDBTooltip domElement tag="span" placement="top">
                <span className="tag badge badge-warning"><i className="fab fa-forumbee" aria-hidden="true"></i>{playerName}</span>
                <div className="userInfoPopup">
                    <div id="beetag-header">
                        <img src={url} alt="Avatar"/>
                        <p><b>{playerName}</b></p>
                    </div>
                    <div id="beetag-tags" className="d-flex">
                        {countryRank && <MDBBadge color="light">{country && <i className={country.toLowerCase() +" flag"}></i>}#{countryRank}</MDBBadge>}
                        {rank && <MDBBadge color="light"><i className="fas fa-globe"/>#{rank}</MDBBadge>}
                    </div>
                </div>
            </MDBTooltip>
        </MDBContainer>
    )
}
