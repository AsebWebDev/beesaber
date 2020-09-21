import React, { Component } from 'react';
import { MDBBadge, MDBIcon  } from 'mdbreact';
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
                <table className="table table-sm">
                   <thead>
                       <tr>
                            <th className="d-flex player">
                                <div className="d-flex player-head left">
                                    <BeeTag bee={userInfoData}/>
                                </div>
                                <div className="d-flex player-head right">
                                    {rank && <MDBBadge color="light"><i className="fas fa-globe"></i>#{rank}</MDBBadge>}
                                    {countryRank && <MDBBadge color="light">{country && <i className={country.toLowerCase() +" flag"}></i>}#{countryRank}</MDBBadge>}
                                    <img src={url} alt="Avatar"/>
                                </div>
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr className="d-flex">
                                <td className="d-flex player">
                                        {totalPlayCount && <span>Total Playcount: <MDBBadge color="light">{totalPlayCount}</MDBBadge></span>}
                                        {pp && <span>PP: <MDBBadge color="light"> {pp}</MDBBadge></span>}
                                </td>
                                
                                {/* If there is handleChose exsting on props, there should be a 'plus' to add this user */}
                                {/* {handleChose && <td><p onClick={() => handleChose(userInfoData)}></p></td>} */}
                                {handleChose && <p id="plusicon"><MDBIcon onClick={() => handleChose(userInfoData)} icon="plus-circle" /></p>}
                            </tr>
                            <tr className="d-flex">
                                <td className="d-flex player">
                                    {rank && <span><i className="fas fa-globe"/>-Rank: <MDBBadge color="light"> #{rank}</MDBBadge></span>}
                                    <span></span>
                                </td>
                            </tr>
                    </tbody>
                </table>
            </div>
        ) 
        else return null;
    }
}
