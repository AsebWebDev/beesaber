import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import api from '../../api';

function Dashboard(props) {
    const { dispatch, myScoreSaberId } = props;
    let [data, setData] = useState([])
    let [query, setQuery] = useState(null)
    let [myScores, setMyScores] = useState(null)
    let [currentID, setCurrentID] = useState(myScoreSaberId ? myScoreSaberId : '76561198101951971')
    
    useEffect(() => {
        if (api.isLoggedIn() && api.getLocalStorageUser()) {
            const { username, profilePic, _id } = api.getLocalStorageUser()
            const userdata = { username, profilePic, myScores }
            props.dispatch({ type: "UPDATE_USER_DATA", userdata })
            // api.getUserSettings(_id)
            // .then(settings => dispatch({ type: "UPDATE_USER_SETTINGS", settings}))
            // .catch(err => dispatch(newNotification(err.toString())))
        }
    }, [dispatch])

    useEffect(() => {
        const fetchData = async () => {
            await api.getScores(currentID).then((scores) => setData(scores))
        }
        fetchData()
    }, [])
    
    useEffect(() => {
        console.log("Data has changed")
        setQuery(null)
    }, [data])
    
    function clickSubmit (e) {
        console.log(query)
        setCurrentID(query)
        api.getScores(query).finally((scores) => setData(scores))
    }
    
    function handleChange (e) {
        setQuery(e.target.value)
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <header className="App-header">
                <input onChange={e => handleChange(e)} type="number" />
                <button onClick={clickSubmit}>Submit</button>
                <h1>DATA:</h1>
                <p>Länge: {data.length} </p>
                {(data.length > 0) && data.map((item, i) => <p key={i}>{item.score}</p>)}
                {(data.length <= 0) && <p>Loading...</p>}
            </header>
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
      profilePic: reduxState.profilePic,
      username: reduxState.username,
      myScores: reduxState.myScores
    }
}

export default connect(mapStateToProps)(Dashboard);