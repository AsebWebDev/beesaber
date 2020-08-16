import React, { useEffect, useState } from 'react';
import axios from 'axios'
import api from './api';
import './App.css';

function App() {

  let [data, setData] = useState([])

  const fetchData = async () => {
    let scores = []
    let noResult = false
    let count = 1;

    while (!noResult) {
      await axios('https://new.scoresaber.com/api/player/76561198037132296/scores/recent/'+ count++)
        .then(scoreReply => {
          console.log("fetchData -> scoreReply", scoreReply)
          if (scoreReply.ok) {
            noResult = true;
            console.log(scores)
            return
          }
          scores.push(...scoreReply.data.scores)
        })
    }
    setData(scores)
  };

  useEffect(() => {
    console.log("use Effect")
    fetchData()
     .finally(() => console.log(data))
  }, [])

  
  return (
    <div className="App">
      <header className="App-header">
        <h1>DATA:</h1>
      </header>
      <div>
        {(data.length > 0) && data.map((item, i) => <p key={i}>item.score</p>)}
      </div>
    </div>
  );
}

export default App;
