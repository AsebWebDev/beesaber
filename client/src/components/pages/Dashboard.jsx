import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import api from '../../api';

function Dashboard(props) {
    const { myScoreSaberId } = props.userdata;
    const { dispatch } = props;
    let [data, setData] = useState([])
    let [query, setQuery] = useState(null)
    let [currentID, setCurrentID] = useState((myScoreSaberId) ? myScoreSaberId : '76561198101951971')

    useEffect(() => {
        console.log("Dashboard2 -> props.userdata", props.userdata)

        const fetchData = async () => {
            await api.getScores('76561198101951971').then((scores) => {
                console.log("fetchData -> props.userdata", props.userdata)
                console.log("fetchData -> scores", scores)
                const userdata = { ...props.userdata }
                // setCurrentID(userdata.myScoreSaberId)
                // dispatch({ type: "UPDATE_USER_DATA", userdata })
                setData(scores)
            })
        }
        if (props.userdata) fetchData()
    }, [props.userdata])
    
    useEffect(() => {
        console.log("Data has changed")
        
        setQuery(null)
    }, [data])

    useEffect(() => {
        console.log("Data has changed")
        setCurrentID(props.myScoreSaberId)
    }, [props.myScoreSaberId])
    
    async function clickSubmit (e) {
        // setCurrentID(query)
        // await api.getScores(query).then((scores) => setData(scores))
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
                {(data.length > 0) && data.map((item, i) => <p key={i}>Rank: {item.rank} Score: {item.score}</p>)}
                {(data.length <= 0) && <p>Loading...</p>}
                {!currentID && <p>No ID provided.</p>}
            </header>
        </div>
    )
}

function mapStateToProps(reduxState){
    return {
        userdata: reduxState.userdata
    }
}

export default connect(mapStateToProps)(Dashboard);