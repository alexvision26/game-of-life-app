import React, { useState } from 'react';
import './App.css';
import Game from './mechanics/game';

function App() {

  const [update, setUpdate] = useState(true);

  const forceUpdate = () => {
    setUpdate(!update)
    window.location.reload()
  }

  return (
    <div className="App">

      <div className="App-header">
        <h1>The Game of Life</h1>
      </div>
      
      <div className="main-content">
        <Game update={forceUpdate}/>
      </div>
    
    </div>
  );
}

export default App;
