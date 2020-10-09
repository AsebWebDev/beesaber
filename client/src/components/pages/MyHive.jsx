import React, { useState } from 'react';
import { connect } from 'react-redux';
import { MDBAnimation } from 'mdbreact';
import ScoreBox from "../ScoreBox";
import AddBeeModal from '../AddBeeModal';
import UserInfo from '../UserInfo';
import NeonButton from "../NeonButton";
import api from '../../api';
import '../../styles/pages/MyHive.scss'

function MyHive(props) {
    let { userdata } = props
    let [modal, setModal] = useState(false);
    let [currentBee, setCurrentBee] = useState(null);
    let beesExists = (userdata.bees) ? userdata.bees.length > 0 : false

    const toggleModal = (e) => setModal(!modal)

    const handleChose = (bee) => setCurrentBee(bee)

    if ( api.isLoggedIn() ) {
        return (
            <div id="myhive">
                <h1 className="page-title"><span className="neon-red">My</span> <span className="neon-blue">Hive</span></h1>
                <span onClick={toggleModal}><MDBAnimation infinite type="pulse"><NeonButton text="Add a Bee" color="blue"/></MDBAnimation></span>
                <div id="myhive-bees">
                    {userdata.bees && userdata.bees.map((bee, i) => <div key={i} className="one-userinfo" onClick={() => handleChose(bee)}><UserInfo key={i} userInfoData={bee}/></div>)}
                    {!beesExists && <p>No bees yet</p>}
                </div>

                <div id="current-scores">
                    {currentBee && <ScoreBox data={currentBee.scoreData} bee={currentBee}/>}
                </div>

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