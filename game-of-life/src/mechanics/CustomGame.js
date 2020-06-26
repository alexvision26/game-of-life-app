import React from 'react';
import ReactDOM from 'react-dom';



class CustomGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPaused: true,
            count: 0,
            renderCanvas: true,
            running: true,
            color: '#282c34',
            colorPanel: false,
            start: true,
            drawMode: false,
            gridMode: localStorage.getItem('gridMode'),
            inputScale: 800,
            gridFps: localStorage.getItem('gridFPS'),
            updateFps: ''
        }
    }

    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext('2d')

        console.log(this.state.gridMode)

        canvas.addEventListener(this.state.drawMode === true ? 'mousemove' : 'click', handleClick)
        // canvas.addEventListener('mousemove', handleClick)

        const size = this.state.inputScale // size of the canvas
        const resolution = 20 // size of each individual pixel or cell
        localStorage.setItem('gridMode', 'custom')

        canvas.width = size
        canvas.height = size
        const COLS = canvas.width / resolution
        const ROWS = canvas.height / resolution
        var grid = this.state.gridMode === 'custom' ? setupGrid() : this.randomGrid(COLS, ROWS)
        console.log(grid)

        // if (this.state.start){
        //     var inGrid = initGrid()
        //     this.displayGrid(inGrid, ctx, resolution)
        //     this.setState({start: this.state.start = false})
        // }

        function handleClick(e) {
            ctx.fillStyle = 'black'

            ctx.fillRect(Math.floor(e.offsetX / resolution) * resolution,
            Math.floor(e.offsetY / resolution) * resolution,
            resolution, resolution)

            let x = Math.floor(e.offsetX / resolution)
            let y = Math.floor(e.offsetY / resolution)

            grid[x][y] = 1
        }

        function setupGrid() {
            return new Array(COLS).fill(null).map(() => new Array(ROWS).fill(0))
        }

        // function initGrid() { // initGrid allows user to select their grid points
        //     return new Array(COLS).fill(null).map(() => new Array(ROWS).fill(0))
        // }
        this.displayGrid(grid, ctx, resolution)
        

        // controlling speed of animation

        let fps = this.state.gridFps

        const play = () => { // the loop for the game with a pause flag
            // setTimeout(function() {
            //     requestAnimationFrame(play)
            // }, 1000 / fps)
            this.animate(play, fps)
            
            if (this.state.isPaused === false){
                grid = this.nextGrid(grid)
                this.displayGrid(grid, ctx, resolution)
                this.setState({count: this.state.count += 1})
            }
        }
        play()
        
    } //componentDidMount

    animate = (play, fps) => {
        function go() {
        setTimeout(function() {
            requestAnimationFrame(play)
        }, 1000 / fps)
        }
        go()
    }

    // componentDidUpdate() {
        
    //     }

    displayGrid = (grid, ctx, resolution) => { //Display the grid in the DOM
        for (let c = 0; c < grid.length; c++){ // Loop through columns
            for (let r = 0; r < grid[c].length; r++){ //Loop through the rows
                const cell = grid[c][r] // creates a cell for each point

                ctx.beginPath() // creating the visual display of the grid
                ctx.rect(c * resolution, r * resolution, resolution, resolution)
                ctx.fillStyle = cell ? this.state.color : 'white' // if the cell has no value, it is white, if it is 1, it is black
                ctx.fill()

                if (this.state.running === true) {
                    ctx.stroke()
                }
                
            }
        }
    }

    randomGrid = (COLS, ROWS) => {
        return new Array(COLS).fill(null).map(() => new Array(ROWS).fill(0)
        .map(() => Math.floor(Math.random() * 2)))
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
            isPaused: !this.state.isPaused,
            running: !this.state.running
        })
        // console.log("Paused?", this.state.isPaused)
        // console.log("Running?", this.state.running)
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

    handleColor = (color) => {
        this.setState({
            color: color,
            colorPanel: this.state.colorPanel = false
        })
    }

    showColor = () => {
        this.setState({
            colorPanel: this.state.colorPanel = true
        })
    }

    setDrawMode = () => {
        this.setState({
            drawMode: !this.state.drawMode
        })

        console.log(this.state.drawMode)
    }

    handleGrid = () => {
        // this.setState({
        //     gridMode: this.state.gridMode === 'custom' ? 'random' : 'custom'
        // })
        if (this.state.gridMode === 'custom') {
            localStorage.setItem('gridMode', 'random')
        } else if (this.state.gridMode === 'random') {
            localStorage.setItem('gridMode', 'custom')
        }
        
        console.log(this.state.gridMode)
    }

    setFps = (e) => {
        this.setState({gridFps: this.state.updateFps})
        localStorage.setItem('gridFPS', this.state.updateFps)
        this.props.update()
    }

    handleFpsChange = (e) => {
        this.setState({
            updateFps: e.target.value
        })
    }

    render() {
    return (
        <>
        {this.state.renderCanvas ? (<canvas id='game' ref='canvas'></canvas>) : null}
            <div className="controls">

            {this.state.colorPanel === false ? (<><h3 className='toggle-panel' onClick={this.showColor}>^</h3></>) : <div className='boxes'>
                <div className='box red' onClick={() => this.handleColor('rgb(255, 68, 68)')}></div>
                <div className='box blue' onClick={() => this.handleColor('cadetblue')}></div>
                <div className='box orange' onClick={() => this.handleColor('orange')}></div>
                <div className='box pink' onClick={() => this.handleColor('#e091af')}></div>
                <div className='box teal' onClick={() => this.handleColor('#008080')}></div>
                <div className='box purple' onClick={() => this.handleColor('#843ab6')}></div>
                </div>}

                <button className="start" onClick={this.handlePause}>{this.state.isPaused ? "Play" : "Pause"}</button>
                <button className="clear" onClick={this.props.update}>Clear</button>
                {/* <button className={this.state.drawMode ? "click-mode" : "draw-mode"} onClick={this.setDrawMode}>{this.state.drawMode ? 'Click Mode' : 'Draw Mode'}</button> */}
                <button className='rand' onClick={() => {
                    this.handleGrid()
                    this.props.update()
                }} >{this.state.gridMode === 'custom' ? "Random Grid" : "Custom Grid"}</button>
                {/* <button className='fps'>Change FPS</button> */}
                <form>
                <input value={this.state.updateFps} onChange={this.handleFpsChange} placeholder='Input FPS...'></input><span><button type='button' name='fps' onClick={this.setFps}>Update</button> FPS: {this.state.gridFps}</span>
                </form>
                
                <h4>Generation Number: {this.state.count}</h4>
            </div>
            
        </>
    )
    }
}

export default CustomGame;
