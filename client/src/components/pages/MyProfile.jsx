import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import api from '../../api';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';

function MyProfile(props) {
    const { dispatch } = props;
    // console.log("MyProfile ->  props.userdata",  props.userdata)

    let [myScoreSaberId, setMyScoreSaberId] = useState(
            (props.userdata.myScoreSaberId) 
                ? props.userdata.myScoreSaberId 
                : ''
        )

    const handleChange = (e) => setMyScoreSaberId(e.target.value)

    const handleSave = () => {
        const userdata = { ...props.userdata, myScoreSaberId }
        console.log("handleSave -> userdata", userdata)
        api.saveUserData(props.userdata._id, userdata)
        dispatch({ type: "UPDATE_USER_DATA", userdata })
    }

    if ( api.isLoggedIn() ) {
        return (
            <div>
                <h1>My Profile</h1>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="6">
                        <form>
                            <div className="grey-text">
                                <MDBInput onChange={e => handleChange(e)} value={myScoreSaberId} label="Your ScoreSaber ID" icon="user" group type="text" validate error="wrong"
                                success="right" />
                            </div>
                            <div className="text-center">
                            <MDBBtn onClick={handleSave} outline color="secondary">
                                Save
                                <MDBIcon far icon="paper-plane" className="ml-1" />
                            </MDBBtn>
                            </div>
                        </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
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