const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const size = 10000 // size of the canvas
const resolution = 80 // size of each individual pixel or cell

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

var grid = setupGrid()

let isPaused = false;

function play() { // Play function that loops using requestAnimationFrame keeps recalling the function to repaint the screen. Meanwhile, grid is constantly being set to nextGrid on each iteration, effectively running it through the rules algorithm
    grid = nextGrid(grid)
    displayGrid(grid)
    if (isPaused) {
        requestAnimationFrame(play)
    }
}

window.onkeydown = function() {
    isPaused = !isPaused
}

play()


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

    for (c = 1; c < grid.length - 1; c++) {
        for (let r = 1; r < grid[c].length - 1; r++){ // looping through the entire grid, need to build cases for each cell that checks the neighboring cells.
            // could add up all the surrounding cells, if it equals 2 or 3, then cell stays.
            // if surrounding cells sum is less than 2, cell is set to 0
            // if surrounding cells sum is more than 2, cell is also set to 0

            //figure out how to ignore cells on the edge of the grid
            const cell = grid[c][r]
            sum = 0 // this variable stores the number of neighboring cells for each cell in the entire game. Once the sum is found, it goes through the if statement below
            sum += grid[c - 1][r]
            sum += grid[c - 1][r - 1]
            sum += grid[c - 1][r + 1]
            sum += grid[c + 1][r]
            sum += grid[c + 1][r - 1]
            sum += grid[c + 1][r + 1]
            sum += grid[c][r + 1]
            sum += grid[c][r - 1]
            // console.log(sum)

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
            
    
            // sum = 0
            // if (grid[c][r - 1] === undefined || grid[c + 1][r] === undefined || grid[c - 1][r] === undefined || grid[c][r + 1] === undefined) {
            // //     grid[c][r] = 1
            // //     // break
            // } else {
            // }
            
        }
    }
    return nextGrid
}
