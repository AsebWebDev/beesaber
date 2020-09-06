import React from 'react'
import { MDBContainer, MDBTooltip } from "mdbreact";
import '../styles/BeeTag.scss'

export default function BeeTag(props) {
    const { playerName, playerId } = props.bee
    return (
        <MDBContainer id="beetag" >
            <MDBTooltip domElement tag="span" placement="top">
                <span className="tag badge badge-warning"><i className="fab fa-forumbee" aria-hidden="true"></i>{playerName}</span>
                <div className="userInfoPopup">
                    <ul>
                    <li><b>{playerName}</b></li>
                    <li>Id: {playerId}</li>
                    </ul>
                </div>
            </MDBTooltip>
        </MDBContainer>
    )
}
