import React from 'react';
import { connect } from 'react-redux';
import { MDBBadge, MDBIcon, MDBTableBody, MDBTable } from 'mdbreact';
import BeeTag from './BeeTag'
import avatarPlaceholder from '../media/bee.jpg'
import '../styles/UserInfo.scss'

function UserInfo(props) {

        const { userInfoData, handleChose } = props;
        const { rank, countryRank, country, totalPlayCount, pp, playerId } = userInfoData;
        const isAlreadyAdded = props.userdata.bees.some(item => item.playerId === playerId)

        const url = ( userInfoData.avatar === '/images/steam.png' || userInfoData.avatar === '/images/oculus.png')
            ? avatarPlaceholder 
            : `https://new.scoresaber.com/api/static/avatars/${userInfoData.playerId}.jpg`

        if (userInfoData) return (
            <div id="userinfo" className="col-md-12 card-container">
                <div className="table table-sm">
                    <div id="userinfo-head">
                        <div className="d-flex player-head left">
                            <BeeTag bee={userInfoData}/>
                        </div>
                        <div className="d-flex player-head right">
                            {rank && <MDBBadge color="light"><i className="fas fa-globe"/>#{rank}</MDBBadge>}
                            {countryRank && <MDBBadge color="light">{country && <i className={country.toLowerCase() +" flag"}></i>}#{countryRank}</MDBBadge>}
                            <img src={url} alt="Avatar"/>
                        </div>
                    </div>
                    <div id="userinfo-body">
                        <MDBTable striped>
                            <MDBTableBody>
                                <tr>
                                    {totalPlayCount && <td>Total Playcount</td>}
                                    {totalPlayCount && <td><MDBBadge color="light">{totalPlayCount}</MDBBadge></td>}
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
                    </div> 
                                              
                </div>
                <div>
                    {handleChose && <p id="plusicon">
                        <MDBIcon onClick={() => handleChose(userInfoData)} icon="plus-circle" className={isAlreadyAdded ? "plusicon-grey" : ''}/>
                    </p>}
                </div>   
            </div>
        ) 
        else return null;
}

function mapStateToProps(reduxState){
    return {
      userdata: reduxState.userdata,
    }
  }
  
export default connect(mapStateToProps)(UserInfo)
