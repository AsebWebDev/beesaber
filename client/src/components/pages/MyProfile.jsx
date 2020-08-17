import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';

function MyProfile(props) {
    const { dispatch } = props;

    let [myScoreSaberId, setMyScoreSaberId] = useState((props.userdata.myScoreSaberId) ? props.userdata.myScoreSaberId : '777')

    const handleChange = (e) => setMyScoreSaberId(e.target.value)

    const handleSave = () => {
        const userdata = { ...props.userdata, myScoreSaberId }
        console.log("handleSave -> data", userdata)
        dispatch({ type: "UPDATE_USER_DATA", userdata })
    }

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
}


function mapStateToProps(reduxState){
    return {
      userdata: reduxState.userdata,
    }
}

export default connect(mapStateToProps)(MyProfile);