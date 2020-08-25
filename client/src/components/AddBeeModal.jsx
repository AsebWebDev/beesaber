import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {    MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, 
            MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBInput
        } from 'mdbreact';
import { newNotification } from '../actioncreators'
import api from '../api';
import '../styles/AddBeeModal.scss'

function AddBeeModal(props) {

    let [activeItem, setActiveItem] = useState('1')
    let [query, setQuery] = useState('')
    let [foundUser, setFoundUser] = useState(null)
    let [userAlreadyAdded, setUserAlreadyAdded] = useState(null)

    useEffect(() => {
        // check if user alread exists in bees list
        if (foundUser) setUserAlreadyAdded(props.userdata.bees.some(item => item.playerId === foundUser.playerId))
    }, [foundUser])

    const handleChange = (e) => setQuery(e.target.value)
    
    const handleSearch = () => {
        const mode = activeItem === '1' ? 'id' : 'username'
        api.getScoreSaberUserInfo(query, mode)
            .then(result => {
                let foundUser = null
                if (mode === 'id') foundUser = result ? { ...result.playerInfo, ...result.scoreStats } : null
                if (mode === 'username') foundUser = result ? { ...result.players[0] } : null
                // if (mode === 'username') foundUser = result ? { ...result.players } : null //TODO: Integrate multiple users found
                console.log("handleSearch -> foundUser", foundUser)
                setFoundUser(foundUser)
            })
    }

    const cleanUp = () => {
        setQuery('')
        setFoundUser(null)
    }

    const handleSave = () => {
        console.log("Handle Save")
        console.log(props.userdata.bees.some(item => item.playerId === foundUser.playerId))
        if (!userAlreadyAdded) {
            console.log("Saving...")
            api.saveBee(props.userdata._id, foundUser)
            .then(userdata => {
                console.log("handleSave -> userdata", userdata)
                props.dispatch(newNotification("User " + foundUser.playerName + " successfully added."))
                props.dispatch({ type: "UPDATE_USER_DATA", userdata })
                cleanUp()
            })
        } else {
            console.log("User existiert bereits")
            // TODO: Error Message
        }
    }

    const switchTab = (tab) => {
        cleanUp()
        if (activeItem !== tab) setActiveItem(tab)
    }

    return (
        <div id="adbeesmodal">
            <MDBContainer>
                {/* <MDBBtn onClick={toggle}>Modal</MDBBtn> */}
                <MDBModal isOpen={true} toggle={props.toggleModal}>
                    <MDBModalHeader toggle={props.toggleModal}>Add a new Bee</MDBModalHeader>
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
                                    <MDBInput onChange={e => handleChange(e)} value={query} label="Search ID" icon="hashtag" group type="number" validate error="wrong"
                                    success="right" />
                                </div>
                                {/* // TODO: Create Component for this part, DRY code:  */}
                                {foundUser && 
                                    <div className="result"> 
                                        User found
                                        {foundUser.playerName}
                                        {userAlreadyAdded && <b>User already added</b>}
                                    </div>}
                            </MDBTabPane>

                            {/* // Search by Username // */}
                            <MDBTabPane tabId="2" role="tabpanel">
                                <div className="grey-text">
                                    <MDBInput onChange={e => handleChange(e)} value={query} label="Search Username" icon="user" group type="text" validate error="wrong"
                                    success="right" />
                                </div>
                                {/* // TODO: Create Component for this part, DRY code:  */}
                                {foundUser && 
                                    <div className="result">
                                        User found
                                        {foundUser.playerName}
                                        {userAlreadyAdded && <b>User already added</b>}
                                    </div>}
                            </MDBTabPane>
                        </MDBTabContent>
                    </MDBModalBody>
                    <MDBModalFooter>
                    {query !== '' && <MDBBtn color="primary" onClick={handleSearch}>Search</MDBBtn>}
                    <MDBBtn color="secondary" onClick={props.toggleModal}>Close</MDBBtn>
                    {foundUser && !userAlreadyAdded && <MDBBtn color="success" onClick={handleSave}>Add {foundUser.playerName}</MDBBtn>}
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
      userdata: reduxState.userdata,
    }
  }
  
export default connect(mapStateToProps)(AddBeeModal)