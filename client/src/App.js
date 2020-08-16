import React, { useEffect, useState } from 'react';
import axios from 'axios'
import api from './api';
import './App.css';

function App() {

  let [data, setData] = useState([])
  let [currentID, setCurrentID] = useState('76561198037132296')
  let scores = []
  let noResult = false

  const fetchData = async () => {
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
    fetchData().finally(() => setData(scores))
  }, [])

  
  return (
    <div className="App">
      <header className="App-header">
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
