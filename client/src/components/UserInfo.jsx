import React, { Component } from 'react';
import BeeTag from './BeeTag'
import localeEmoji from 'locale-emoji';
import avatar from '../media/251.jpg'
import '../styles/UserInfo.scss'

export default class UserInfo extends Component {

    render() {
        const { userInfoData } = this.props;
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
                                <td>
                                    {/* <img src={`https://new.scoresaber.com/api/static/avatars/${userInfoData.playerId}.jpg`} alt="Avatar"/> */}
                                    <img src={url} alt="Avatar"/>
                                </td>
                                <td>{localeEmoji(`${userInfoData.country}`)}&nbsp;<BeeTag userName={userInfoData.playerName}/></td>
                                <td>#{userInfoData.rank}</td>
                                {userInfoData.countryRank && <td>#{userInfoData.countryRank}</td>}
                                {userInfoData.totalPlayCount && <td>{userInfoData.totalPlayCount}</td>}
                            </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
