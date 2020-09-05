import React, { Component } from 'react';
import { MDBIcon } from 'mdbreact';
import BeeTag from './BeeTag'
import localeEmoji from 'locale-emoji';
import avatar from '../media/251.jpg'
import '../styles/UserInfo.scss'

export default class UserInfo extends Component {

    render() {
        const { userInfoData, handleChose } = this.props;
        const url = ( userInfoData.avatar === '/images/steam.png' || userInfoData.avatar === '/images/oculus.png')
            ? avatar 
            : `https://new.scoresaber.com/api/static/avatars/${userInfoData.playerId}.jpg`
        return (
            <div id="userinfo" className="col-md-12">
                <p>{userInfoData.userName} </p>
                <table className="table table-sm">
                   <thead>
                       <tr>
                            <th scope="col"></th>
                            <th scope="col">Player</th>
                            <th scope="col">Global Rank</th>
                           {userInfoData.countryRank &&<th scope="col">Country Rank</th>}
                           {userInfoData.totalPlayCount && <th scope="col">Total Plays</th>}
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <td><img src={url} alt="Avatar"/></td>
                                <td>{localeEmoji(`${userInfoData.country}`)}&nbsp;<BeeTag userName={userInfoData.playerName}/></td>
                                <td>#{userInfoData.rank}</td>
                                {userInfoData.countryRank && <td>#{userInfoData.countryRank}</td>}
                                {userInfoData.totalPlayCount && <td>{userInfoData.totalPlayCount}</td>}
                                {/* If there is handleChose exsting on props, there should be a 'plus' to add this user */}
                                {handleChose && <td><p onClick={() => handleChose(userInfoData)}><MDBIcon icon="plus" className="ml-1" /></p></td>}
                            </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
