import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {    MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, 
            MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBInput
        } from 'mdbreact';
import { newNotification } from '../actioncreators'
import UserInfo from './UserInfo.jsx';
import Spinner from './Spinner';
import api from '../api';
import '../styles/AddBeeModal.scss'

function AddBeeModal(props) {
    const { dispatch } = props

    let [activeItem, setActiveItem] = useState('1')
    let [query, setQuery] = useState('')
    let [foundUser, setFoundUser] = useState(null)
    let [foundUsers, setFoundUsers] = useState(null)
    let [userAlreadyAdded, setUserAlreadyAdded] = useState(null)
    let [processing, setProcessing] = useState({status: false, statusText: null})

    useEffect(() => {
        // check if user alread exists in bees list
        if (foundUser) setUserAlreadyAdded(props.userdata.bees.some(item => item.playerId === foundUser.playerId))
    }, [foundUser])

    const cleanUp = () => {
        setQuery('')
        setFoundUser(null)
        setFoundUsers(null)
    }

    const handleChange = (e) => setQuery(e.target.value)
    
    const handleSearch = async () => {
        const mode = activeItem === '1' ? 'id' : 'username'
        setProcessing({status: true, statusText: 'Searching...' })
        await api.getScoreSaberUserInfo(query, mode)
            .then(result => {
                (Array.isArray(result))         // If result is an array, multiple Users have been found...
                    ? setFoundUsers(result)     // ... then add this to foundUsers in state
                    : setFoundUser(result)      // If its not an array, only one user is found and can be added to foundUser
            }).catch(err => dispatch(newNotification({text: err.message})))
            setProcessing({status: false, statusText: null })
    }

    const handleChose = (user) => {
        setFoundUser(user)
        setFoundUsers(null)
    }

    const handleSave = async() => {
        if (!userAlreadyAdded) {
            let userdata = {}
            setProcessing({status: true, statusText: 'Adding ' + foundUser.playerName + ' to your hive' })

            // If the found user is coming from an array (more than one user found, one needs to be picked of the Array on UI) there is
            // only few data coming from the api, so we need complete user data 
            if (!foundUser.hasOwnProperty('totalPlayCount'))
            await api.getScoreSaberUserInfo(foundUser.playerId, 'id')
                .then( ScoreSaberUserInfo => userdata = { ...userdata, ...ScoreSaberUserInfo } )

            // Get scores from the found user to the userdata and finally save it to the database
            await api.getScores(foundUser.playerId).then((scoreData) => {
                userdata = { ...userdata, ...foundUser, scoreData }
                api.saveBee(props.userdata._id, userdata)
                    .then(userdata => dispatch({ type: "UPDATE_USER_DATA", userdata }))
            }).catch(err => dispatch(newNotification({text: err.message})))
            dispatch(newNotification({text: "User " + foundUser.playerName + " successfully added."}))
            
            setProcessing({status: false, statusText: null })
            cleanUp()
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
                <MDBModal isOpen={true} toggle={props.toggleModal} size="lg">
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
                                        <UserInfo userInfoData={foundUser}/>
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
                                        <UserInfo userInfoData={foundUser}/>
                                        {userAlreadyAdded && <b>User already added</b>}
                                    </div>}
                                {foundUsers &&
                                    foundUsers.map(user => <UserInfo userInfoData={user} handleChose={handleChose}/>)}
                            </MDBTabPane>
                        </MDBTabContent>
                    </MDBModalBody>

                    {/* /// Show Buttons OR Status bar /// */}
                    {!processing.status &&  <MDBModalFooter>
                                                {query !== '' && <MDBBtn color="primary" onClick={handleSearch}>Search</MDBBtn>}
                                                <MDBBtn color="secondary" onClick={props.toggleModal}>Close</MDBBtn>
                                                {foundUser && !userAlreadyAdded && <MDBBtn color="success" onClick={handleSave}>Add {foundUser.playerName}</MDBBtn>}
                                            </MDBModalFooter>}
                    {processing.status &&   <MDBModalFooter>
                                                {processing.status && <Spinner text={processing.statusText}/>}
                                            </MDBModalFooter>}
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