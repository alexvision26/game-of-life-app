import React from 'react';
import './App.css';
import Game from './mechanics/game';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>The Game of Life</h1>
        <Game/>
      </header>
    </div>
  );
}

export default App;
