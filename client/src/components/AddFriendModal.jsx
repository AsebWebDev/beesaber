import React, { useEffect, useState } from 'react';
import {    MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, 
            MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBInput
        } from 'mdbreact';
import api from '../api';
import '../styles/AddFriendsModal.scss'

export default function AddFriendModal(props) {

    let [activeItem, setActiveItem] = useState('1')
    let [query, setQuery] = useState('')
    let [foundUser, setFoundUser] = useState(null)

    const handleChange = (e) => setQuery(e.target.value)
    
    const handleSearch = () => {
        api.getScoreSaberUserInfo(query, 'id')
            .then(result => {
                foundUser = result ? { ...result.playerInfo, ...result.scoreStats } : null
                console.log("handleSearch -> foundUser", foundUser)
                setFoundUser(result)
            })
    }

    const handleSave = () => {
        console.log("Handle Save")
    }

    const switchTab = (tab) => {
        setQuery('')
        if (activeItem !== tab) setActiveItem(tab)
    }

    return (
        <div id="addfriendsmodal">
            <MDBContainer>
                {/* <MDBBtn onClick={toggle}>Modal</MDBBtn> */}
                <MDBModal isOpen={true} toggle={props.toggleModal}>
                    <MDBModalHeader toggle={props.toggleModal}>Add a new friend</MDBModalHeader>
                    <MDBModalBody>
                        <MDBNav className="nav-tabs mt-5">
                            <MDBNavItem>
                                <MDBNavLink link to="#" active={activeItem === "1"} onClick={() => switchTab('1')} role="tab" >
                                    Search by ID
                                </MDBNavLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBNavLink link to="#" active={activeItem === "2"} onClick={() => switchTab('2')} role="tab" >
                                    Search by Username
                                </MDBNavLink>
                            </MDBNavItem>
                        </MDBNav>
                        <MDBTabContent activeItem={activeItem} >
                            {/* // Search by ID // */}
                            <MDBTabPane tabId="1" role="tabpanel">
                                <div className="grey-text">
                                    <MDBInput onChange={e => handleChange(e)} value={query} label="Search by ScoreSaber ID" icon="hashtag" group type="number" validate error="wrong"
                                    success="right" />
                                </div>
                                {foundUser && <div className="result">
                                    User found
                                    {foundUser.playerInfo.playerName}
                                </div>}
                            </MDBTabPane>
                            {/* // Search by Username // */}
                            <MDBTabPane tabId="2" role="tabpanel">
                            <div className="grey-text">
                                    <MDBInput onChange={e => handleChange(e)} value={query} label="Search by ScoreSaber Username" icon="user" group type="text" validate error="wrong"
                                    success="right" />
                                </div>
                            </MDBTabPane>
                        </MDBTabContent>
                    </MDBModalBody>
                    <MDBModalFooter>
                    {query !== '' && <MDBBtn color="primary" onClick={handleSearch}>Search</MDBBtn>}
                    <MDBBtn color="secondary" onClick={props.toggleModal}>Close</MDBBtn>
                    {foundUser !== null && <MDBBtn color="success" onClick={handleSave}>Add {foundUser.playerInfo.playerName}</MDBBtn>}
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        </div>
    )
}
