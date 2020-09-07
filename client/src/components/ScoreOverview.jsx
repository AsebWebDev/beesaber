import React, { useState } from 'react';
import { MDBContainer, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import { connect } from 'react-redux';
import ScoreTabs from './ScoreTabs'
import '../styles/ScoreOverview.scss'

function ScoreOverview(props) {
    let [activeItem, setActiveItem] = useState('1')
    const { dataRecent, dataTop } = props;

    const toggle = tab => {
        if (activeItem !== tab) setActiveItem(tab)
    };

    return (
        <MDBContainer id="score-overview" className="score-box">
                <h3>My Scores</h3>
                <MDBNav className="nav-tabs mt-5">
                    <MDBNavItem>
                        <MDBNavLink link to="#" active={activeItem === 1} onClick={() => toggle('1')} role="tab" >
                            Recent
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink link to="#" active={activeItem === 2} onClick={() => toggle('2')} role="tab" >
                            Top
                        </MDBNavLink>
                    </MDBNavItem>
                </MDBNav>
                <MDBTabContent activeItem={activeItem} >
                    <ScoreTabs tabId="1" data={dataRecent} size="lg"/>
                    <ScoreTabs tabId="2" data={dataTop} size="lg"/>
                </MDBTabContent>
            </MDBContainer>
    )
}

function mapStateToProps(reduxState){
    return {
        userdata : reduxState.userdata
    };
}

export default connect(mapStateToProps)(ScoreOverview);