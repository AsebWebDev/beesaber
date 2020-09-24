import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {    MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, 
            MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBInput
        } from 'mdbreact';
import { newNotification } from '../actioncreators'
import UserInfo from './UserInfo.jsx';
import Spinner from './Spinner';
import Message from './Message';
import api from '../api';
import '../styles/AddBeeModal.scss'

function AddBeeModal(props) {
    const { dispatch, userdata } = props
    let [activeItem, setActiveItem] = useState('1')
    let [query, setQuery] = useState('')
    let [foundUser, setFoundUser] = useState(null)
    let [foundUsers, setFoundUsers] = useState(null)
    let [userAlreadyAdded, setUserAlreadyAdded] = useState(null)
    let [processing, setProcessing] = useState({status: false, statusText: null})
    let [thatIsYou, setThatIsYou] = useState(false)
    
    useEffect(() => {
        // check if user alread exists in bees list
        if (foundUser && userdata.bees) setUserAlreadyAdded(userdata.bees.some(item => item.playerId === foundUser.playerId))
    }, [foundUser, userdata.bees])

    const cleanUp = () => {
        setFoundUser(null)
        setFoundUsers(null)
        setUserAlreadyAdded(false)
        setThatIsYou(false)
    }

    const handleChange = (e) => setQuery(e.target.value)

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSearch()
    }
    
    const handleSearch = async () => {
        cleanUp()
        const mode = activeItem === '1' ? 'id' : 'username'
        setProcessing({status: true, statusText: 'Searching...' })
        await api.getScoreSaberUserInfo(query, mode)
            .then(result => {
                if (!result) {
                    dispatch(newNotification({text: "Sorry, user could not be found."}))
                    return
                }
                if (Array.isArray(result)) {                            // If result is an array, multiple Users have been found...
                    if (result.length === 1) setFoundUser(result[0])    // If array only has one item, set it as single found user
                    else setFoundUsers(result)                          // else add all found users to foundUsers in state
                } else {
                    setFoundUser(result)                                // If its not an array, only one user is found and can be added to foundUser
                    setThatIsYou(result.playerId === userdata.myScoreSaberId)   // check, if you found yourself
                }    
            }).catch(err => dispatch(newNotification({text: err.message ? err.message : err})))
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
            }).catch(err => dispatch(newNotification({text: err.message ? err.message : err})))
            dispatch(newNotification({text: "User " + foundUser.playerName + " successfully added."}))
            
            setProcessing({status: false, statusText: null })
            setQuery('')
            cleanUp()
        } else dispatch(newNotification({text: "Sorry, user is already in you hive."}))
    }

    const switchTab = (tab) => {
        setQuery('')
        cleanUp()
        if (activeItem !== tab) setActiveItem(tab)
    }

    return (
        <div id="addbeesmodal">
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
                                    success="right" onKeyPress={handleKeyPress}/>
                                </div>
                                {foundUser && <UserInfo userInfoData={foundUser}/>}
                            </MDBTabPane>

                            {/* // Search by Username // */}
                            <MDBTabPane tabId="2" role="tabpanel">
                                <div className="grey-text">
                                    <MDBInput onChange={e => handleChange(e)} value={query} label="Search Username" icon="user" group type="text" validate error="wrong"
                                    success="right" onKeyPress={handleKeyPress}/>
                                </div>
                                {foundUser && <UserInfo userInfoData={foundUser}/>}
                                <div id="found-users">
                                    {foundUsers &&
                                        foundUsers.map(user => <UserInfo userInfoData={user} handleChose={handleChose}/>)}  
                                </div>
                            </MDBTabPane>
                            {userAlreadyAdded && !thatIsYou && <Message text='User already added' type='danger' /> }
                            {thatIsYou && <Message text='You found yourself! What a noble goal in life, but not helping you on Beesaber ;)' type='danger' /> }
                        </MDBTabContent>
                    </MDBModalBody>

                    {/* /// Show Buttons OR Status bar /// */}
                    {!processing.status &&  <MDBModalFooter>
                                                {query !== '' && <MDBBtn color="primary" onClick={handleSearch}>Search</MDBBtn>}
                                                <MDBBtn color="secondary" onClick={props.toggleModal}>Close</MDBBtn>
                                                {foundUser && !userAlreadyAdded && !thatIsYou && <MDBBtn color="success" onClick={handleSave}>Add {foundUser.playerName}</MDBBtn>}
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