import React, { Component } from 'react';
import { MDBBadge, MDBIcon, MDBTableBody, MDBTable } from 'mdbreact';
import BeeTag from './BeeTag'
import avatar from '../media/bee.jpg'
import '../styles/UserInfo.scss'

export default class UserInfo extends Component {

    render() {
        const { userInfoData, handleChose } = this.props;
        const { rank, countryRank, country, totalPlayCount, pp } = userInfoData;
        const url = ( userInfoData.avatar === '/images/steam.png' || userInfoData.avatar === '/images/oculus.png')
            ? avatar 
            : `https://new.scoresaber.com/api/static/avatars/${userInfoData.playerId}.jpg`
        if (userInfoData) return (
            <div id="userinfo" className="col-md-12 card-container">
                <div className="table table-sm">
                    <div id="userinfo-head">
                        <div className="d-flex player-head left">
                            <BeeTag bee={userInfoData}/>
                        </div>
                        <div className="d-flex player-head right">
                            {rank && <MDBBadge color="light"><i className="fas fa-globe"></i>#{rank}</MDBBadge>}
                            {countryRank && <MDBBadge color="light">{country && <i className={country.toLowerCase() +" flag"}></i>}#{countryRank}</MDBBadge>}
                            <img src={url} alt="Avatar"/>
                        </div>
                    </div>
                    <div id="userinfo-body">
                        <MDBTable striped>
                            <MDBTableBody>
                                <tr>
                                    <td>Total Playcount</td>
                                    <td><MDBBadge color="light">{totalPlayCount}</MDBBadge></td>
                                    <td>PP</td>
                                    <td><MDBBadge color="light"> {pp}</MDBBadge></td>
                                </tr>
                                <tr>
                                    <td>Rank</td>
                                    <td><MDBBadge color="light"> #{rank}</MDBBadge></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </MDBTableBody>
                        </MDBTable>
                        {handleChose && <p id="plusicon"><MDBIcon onClick={() => handleChose(userInfoData)} icon="plus-circle" /></p>}
                    </div>                              
                </div>
            </div>
        ) 
        else return null;
    }
}
