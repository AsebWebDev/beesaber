import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setFetchStatus } from '../../actioncreators'
import api from '../../api';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
import ScoreBox from "../ScoreBox";
import '../../styles/pages/MyProfile.scss'

function MyProfile(props) {
    const { dispatch } = props;
    const { scoreData } = props.userdata;

    let [myScoreSaberId, setMyScoreSaberId] = useState(
            (props.userdata.myScoreSaberId) 
                ? props.userdata.myScoreSaberId 
                : ''
        )

    const handleChange = (e) => setMyScoreSaberId(e.target.value)

    const handleSave = async () => {
        dispatch(setFetchStatus(true, 'Saving ID...'))
        await api.getScoreSaberUserInfo(myScoreSaberId, 'id')
            .then(async scoreSaberUserInfo => {
                const userdata = { ...props.userdata, ...scoreSaberUserInfo, myScoreSaberId }
                await api.saveUserData(props.userdata._id, userdata)
                dispatch({ type: "UPDATE_USER_DATA", userdata }) 
                await api.getlatestScore(userdata.myScoreSaberId)           
            })
            .catch((err) => console.log(err))  
        dispatch(setFetchStatus(false))
        }

    if ( api.isLoggedIn() ) {
        return (
            <div id="my-profile">
                <h1 className="page-title"><span className="neon-red">My</span> <span className="neon-blue">Profile</span></h1>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6">
                        <form id="myscoresaberidinput">
                            <div className="grey-text">
                                <MDBInput onChange={e => handleChange(e)} value={myScoreSaberId} label="Your ScoreSaber ID" icon="user" group type="text" validate error="wrong"
                                success="right" />
                            </div>
                            <div className="text-center">
                            <MDBBtn onClick={handleSave} size="sm" outline color="secondary">
                                Save    
                                <MDBIcon far icon="paper-plane" className="ml-1" />
                            </MDBBtn>
                            </div>
                        </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                {scoreData && <ScoreBox data={scoreData}/>}
            </div>
        )
    } else {
        props.history.push("/") // Redirect to the main page
        return null
    }
    
}


function mapStateToProps(reduxState){
    return {
      userdata: reduxState.userdata,
    }
}

export default connect(mapStateToProps)(MyProfile);