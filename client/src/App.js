import React, { useEffect } from 'react';
import api from './api';
import './App.css';

function App() {

  useEffect(() => {
    console.log("use effect")
    api.getScores()
    return () => {
      
    }
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
