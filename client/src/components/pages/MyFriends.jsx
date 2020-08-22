import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { MDBBtn, MDBIcon } from 'mdbreact';
import AddFriendModal from '../AddFriendModal';
import api from '../../api';

function MyFriends(props) {
    let [modal, setModal] = useState(false);

    const handleSave = () => setModal(!modal)

    if ( api.isLoggedIn() ) {
        return (
            <div>
                <h1>My Friends</h1>
                <MDBBtn onClick={handleSave} outline color="success">
                    Add a friend
                    <MDBIcon icon="plus" className="ml-1" />
                </MDBBtn>
                {props.userdata.friends && props.userdata.friends.map(friend => <div>
                    friend.userName
                </div>)}
                {props.userdata.friends && <p>No friends yet</p>}

                {/* // MODAL ADD FRIENDS //  */}
                {modal && <AddFriendModal handleSave={handleSave}/>}

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

export default connect(mapStateToProps)(MyFriends);