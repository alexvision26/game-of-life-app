import React, { useState } from 'react';
import './App.scss';
import CustomGame from './mechanics/CustomGame';
 

function App() {

  const [update, setUpdate] = useState(true);

  const [showRules, setShowRules] = useState("rules")

  const switchRules = () => {
    setShowRules("rules")
  }

  const switchAbout = () => {
    setShowRules("about")
  }

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
        <div className='links'>
        </div>
        <div className='game-section'>
              <CustomGame update={forceUpdate}/>
        </div>
        <div className='rules-section'>
        <div className="selector">
          <a className="rules-tab" onClick={switchRules}>Rules</a>
          <a className="about-tab" onClick={switchAbout}>About</a>
        </div>

        {showRules == "about" ?
          <div className="about-page">
            <h3>About John Conway & The Game of Life</h3>
            <p>
              John Horton Conway was an English mathmetician who was born in 1937 in Liverpool. He spent the first half of his career at the University of Cambridge before moving to the United States and spending the rest of his career at Princeton University. Although he was active in many mathematical theories, he was most known for his cellular automaton game called The Game of Life. The game was created in 1970 and first featured in October 1970 issue of 'Scientific American'. From there, the game became very widely known. Unfortanately, John Conway has passed away on April 11th, 2020.
            </p>
            <p>
              The Game of Life is a zero-player game. It is an automated algorithm that is simulated based off an initial state of a grid. Each cell changes and patterns emerege based off of the rules listed below. 
            </p>
          </div>
          :
          <div className="rules-page">
            <h3>The Rules:</h3>
            <ol className='rules-list'>
                <li>If a cell has less than two neighboring cells, then the cell dies, such as underpopulation</li>
                <li>If a cell has two or three neighboring cells, it continues to the next generation</li>
                <li>If a cell has more than three neighboring cells, it dies, as if by overpopulation</li>
                <li>Any dead cells may become alive if it has exactly three live neighbor cells, as if by reproduction</li>
              </ol></div>
          }
          </div>
          
      </div>
    
    </div>
  );
}

export default App;
