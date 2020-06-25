import React, { useState } from 'react';
import './App.css';
import Game from './mechanics/game';
import CustomGame from './mechanics/CustomGame';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
 

function App() {

  const [update, setUpdate] = useState(true);

  const forceUpdate = () => {
    setUpdate(!update)
    window.location.reload()
  }

  return (
    <Router>
    <div className="App">

      <div className="App-header">
        <h1>The Game of Life</h1>
      </div>
      
      <div className="main-content">
        <div className='links'>
          {/* <Link to='/'>Custom</Link>
          <Link to='/random'>Preset</Link> */}
        </div>
        <div className='game-section'>
          <Switch>
            <Route path='/'>
              <CustomGame update={forceUpdate}/>
            </Route>

            <Route path='/random'>
              <Game update={forceUpdate}/>
            </Route>

          </Switch>
        </div>
        <div className='rules-section'><h3>About John Conway's Game of Life</h3>
          <p>
            John Horton Conway was an English mathmetician who was born in 1937 in Liverpool. He spent the first half of his career at the University of Cambridge before moving to the United States and spending the rest of his career at Princeton University. Although he was active in many theories including finite groups, knot theory, number theory and more, he was most known for cellular automaton game called The Game of Life. The game was created in 1970 and first featured in October 1970 issue of 'Scientific American'.
          </p>
          <br/>
          <hr/>
          <h4>The Rules:</h4>
          <ol className='rules-list'>
              <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation</li>
              <li>Any live cell with two or three live neighbours lives on to the next generation</li>
              <li>Any live cell with more than three live neighbours dies, as if by overpopulation</li>
              <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction</li>
            </ol></div>
          
      </div>
    
    </div>
    </Router>
  );
}

export default App;
