const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const size = 500 // size of the canvas
const resolution = 20 // size of each individual pixel or cell

canvas.width = size
canvas.height = size
const COLS = canvas.width / resolution
const ROWS = canvas.height / resolution

// Initialize function that creates an array of columns and rows and sets them randomly to 1 or 0
// This is the frame for the game of life. It is dynamically created based on the size of the canvas
function setupGrid() {
    return new Array(COLS).fill(null).map(() => new Array(ROWS).fill(0)
    .map(() => Math.floor(Math.random() * 2)))
}

const grid = setupGrid()
displayGrid(grid)
nextGrid(grid)
console.log(grid)

function displayGrid(grid) { //Display the grid in the DOM
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

function nextGrid(grid) { // function to add the next grid for the animation. Double Buffer
    const nextGrid = grid.map(arr => [...arr])

    for (c = 0; c < grid.length; c++) {
        for (let r = 0; r < grid[c].length; r++){ // looping through the entire grid, need to build cases for each cell that checks the neighboring cells.
            // could add up all the surrounding cells, if it equals 2 or 3, then cell stays.
            // if surrounding cells sum is less than 2, cell is set to 0
            // if surrounding cells sum is more than 2, cell is also set to 0
            const cell = grid[c][r]
            if (grid[c][r] === 0) {
                
            }
        }
    }
}
