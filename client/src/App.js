import React, { useEffect, useState } from 'react';
import axios from 'axios'
import api from './api';
import './App.css';

function App() {

  let [data, setData] = useState([])
  let [query, setQuery] = useState(null)
  let [currentID, setCurrentID] = useState('76561198037132296')
  let scores = []
  let noResult = false

  const fetchData = async (currentID) => {
    let count = 1;
    while (!noResult) {
      await axios('https://new.scoresaber.com/api/player/'+ currentID +'/scores/recent/'+ count++)
        .then(scoreReply => {
          if (scoreReply.ok) noResult = true;
          scores.push(...scoreReply.data.scores)
          return scores
        })
    }
  };

  useEffect(() => {
    fetchData(currentID).finally(() => setData(scores))
  }, [])

  useEffect(() => {
    console.log("Data has changed")
    setQuery(null)
  }, [data])

  function clickSubmit (e) {
    console.log(query)
    setCurrentID(query)
    fetchData(query).finally(() => setData(scores))
  }

  function handleChange (e) {
    setQuery(e.target.value)
  }
  
  return (
    <div className="App">
      <header className="App-header">
          <input onChange={e => handleChange(e)} type="number" />
          <button onClick={clickSubmit}>Submit</button>
        <h1>DATA:</h1>
        <p>Länge: {data.length} </p>
        {(data.length > 0) && data.map((item, i) => <p key={i}>{item.score}</p>)}
        {(data.length <= 0) && <p>Loading...</p>}
      </header>
      <div>

      </div>
    </div>
  );
}

export default App;
