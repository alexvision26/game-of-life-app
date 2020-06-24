import React from 'react';
import ReactDOM from 'react-dom';



class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPaused: false,
            count: 0,
            renderCanvas: true,
            running: false
        }
    }

    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext('2d')

        const size = 1000 // size of the canvas
        const resolution = 10 // size of each individual pixel or cell

        canvas.width = size
        canvas.height = size
        const COLS = canvas.width / resolution
        const ROWS = canvas.height / resolution
        var grid = setupGrid()

        function setupGrid() {
            return new Array(COLS).fill(null).map(() => new Array(ROWS).fill(0)
            .map(() => Math.floor(Math.random() * 2)))
        }
        
        const play = () => { // the loop for the game with a pause flag
            if (this.state.isPaused === true){
                grid = this.nextGrid(grid)
                this.displayGrid(grid, ctx, resolution)
                this.setState({count: this.state.count += 1})
            }
            requestAnimationFrame(play)

            if (this.state.renderCanvas) {
                // grid = this.displayGrid(grid, ctx, resolution)
            }
        }

        play()
        
    } //componentDidMount

    displayGrid = (grid, ctx, resolution) => { //Display the grid in the DOM
        for (let c = 0; c < grid.length; c++){ // Loop through columns
            for (let r = 0; r < grid[c].length; r++){ //Loop through the rows
                const cell = grid[c][r] // creates a cell for each point

                ctx.beginPath() // creating the visual display of the grid
                ctx.rect(c * resolution, r * resolution, resolution, resolution)
                ctx.fillStyle = cell ? 'black' : 'white' // if the cell has no value, it is white, if it is 1, it is black
                ctx.fill()

            }
        }
    }


    nextGrid = (grid) => { // function to add the next grid for the animation. Double Buffer
        const nextGrid = grid.map(arr => [...arr])

        for (let c = 1; c < grid.length - 1; c++) {
            for (let r = 1; r < grid[c].length - 1; r++){ // looping through the entire grid, need to build cases for each cell that checks the neighboring cells.
                // could add up all the surrounding cells, if it equals 2 or 3, then cell stays.
                // if surrounding cells sum is less than 2, cell is set to 0
                // if surrounding cells sum is more than 2, cell is also set to 0

                //figure out how to ignore cells on the edge of the grid
                const cell = grid[c][r]

                grid[c][0] = 0
                grid[c][grid.length - 2] = 0
                grid[0][r] = 0
                grid[grid.length - 1][r] = 0
                let sum = 0 // this variable stores the number of neighboring cells for each cell in the entire game. Once the sum is found, it goes through the if statement below
                sum += grid[c - 1][r]
                sum += grid[c - 1][r - 1]
                sum += grid[c - 1][r + 1]
                sum += grid[c + 1][r]
                sum += grid[c + 1][r - 1]
                sum += grid[c + 1][r + 1]
                sum += grid[c][r + 1]
                sum += grid[c][r - 1]


                nextGrid[c][0] = 0
                nextGrid[c][grid.length - 1] = 0
                nextGrid[0][r] = 0
                nextGrid[grid.length - 1][r] = 0
                // nextGrid[1][r] = 0

                if (grid[c][r] === 0) { // if the current cell on iteration is 0, on the nextGrid generated, either make the cell alive if it has 3 neighbors, otherwise, leave it dead
                    switch(sum) {
                        case 3:
                            nextGrid[c][r] = 1
                            break;
                        default:
                            nextGrid[c][r] = 0
                    }
                } else if (grid[c][r] === 1) { // if the current cell on iteration is alive, then...
                    switch(sum) {
                        case 0:
                        case 1:
                            nextGrid[c][r] = 0 //set cell of the next grid to dead if only 1 neighbor
                            break;
                        case 2:
                        case 3:
                            nextGrid[c][r] = 1 // set cell of next grid to alive if there is 3 neighbors
                            break;
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                            nextGrid[c][r] = 0 // anymore than 4 up to 8 neighbors, set cell to dead for overpopulation
                            break;
                        default:
                            nextGrid[c][r] = 0 // else set to dead...
                    }
                } 
            }
        }
        return nextGrid
    }
    

    // Initialize function that creates an array of columns and rows and sets them randomly to 1 or 0
    // This is the frame for the game of life. It is dynamically created based on the size of the canvas
    
    handlePause = () => {
        this.setState({
            isPaused: !this.state.isPaused
        })
        // console.log(this.state.isPaused)
    }

    handleClear = () => {
        this.setState({
            renderCanvas: this.state.renderCanvas = false,
            count: this.state.count = 0
        })
        this.setState({renderCanvas: this.state.renderCanvas = true})
        
        // var newGrid = this.setup

        // this.props.update
        // console.log(this.props.update)
    }

    render() {
    return (
        <>
        {this.state.renderCanvas ? (<canvas id='game' ref='canvas'></canvas>) : null}
            <div className="controls">
            <button className="start" onClick={this.handlePause}>{this.state.isPaused ? "Pause" : "Play"}</button>
                <button className="clear" onClick={this.props.update}>Clear</button>
                <h4>Generation Number: {this.state.count}</h4>
            </div>
        </>
    )
    }
}

export default Game;
