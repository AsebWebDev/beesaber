import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { MDBBtn, MDBIcon } from 'mdbreact';
import AddBeeModal from '../AddBeeModal';
import UserInfo from '../UserInfo';
import api from '../../api';

function MyHive(props) {
    let { userdata } = props
    let [modal, setModal] = useState(false);
    let beesExists = (userdata.bees) ? userdata.bees.length > 0 : false

    const toggleModal = () => setModal(!modal)

    if ( api.isLoggedIn() ) {
        return (
            <div>
                <h1 className="page-title"><span className="neon-red">My</span> <span className="neon-blue">Hive</span></h1>
                <MDBBtn onClick={toggleModal} outline color="success">
                    Add a bee
                    <MDBIcon icon="plus" className="ml-1" />
                </MDBBtn>
                {userdata.bees && userdata.bees.map((bee, i) => <UserInfo key={i} userInfoData={bee}/>)}
                {!beesExists && <p>No bees yet</p>}

                {/* // MODAL ADD beeS //  */}
                {modal && <AddBeeModal toggleModal={toggleModal}/>}

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

export default connect(mapStateToProps)(MyHive);