import React, { Component } from 'react';
import localeEmoji from 'locale-emoji';

export default class UserInfo extends Component {

    render() {
        const { userInfoData } = this.props;
console.log(userInfoData);
        return (
            <div className="col-md-12">
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
                                    <img src={`https://new.scoresaber.com/api/static/avatars/${userInfoData.playerId}.jpg`} alt="Avatar"/>
                                </td>
                                <td>{localeEmoji(`${userInfoData.country}`)}&nbsp;{userInfoData.playerName}</td>
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
