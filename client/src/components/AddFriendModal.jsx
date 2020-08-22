import React, { useEffect, useState } from 'react';
import {    MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, 
            MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink 
        } from 'mdbreact';
import '../styles/AddFriendsModal.scss'

export default function AddFriendModal(props) {

    let [activeItem, setActiveItem] = useState('1')

    const handleSave = () => {
        console.log("Handle Savee")
    }

    const switchTab = (tab) => {
        if (activeItem !== tab) setActiveItem(tab)
    }

    return (
        <div id="addfriendsmodal">
            <MDBContainer>
                {/* <MDBBtn onClick={toggle}>Modal</MDBBtn> */}
                <MDBModal isOpen={true} toggle={props.handleSave}>
                    <MDBModalHeader toggle={props.handleSave}>Add a new friend</MDBModalHeader>
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
                                <p>Search by ID</p>
                            </MDBTabPane>
                            {/* // Search by Username // */}
                            <MDBTabPane tabId="2" role="tabpanel">
                                <p>Search by Username</p>
                            </MDBTabPane>
                        </MDBTabContent>
                    </MDBModalBody>
                    <MDBModalFooter>
                    <MDBBtn color="secondary" onClick={props.toggleModal}>Close</MDBBtn>
                    <MDBBtn color="primary" onClick={handleSave}>Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        </div>
    )
}
