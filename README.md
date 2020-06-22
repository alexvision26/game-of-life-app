## John Conway's Game of Life

## The Rules:
    1. Any live cell with fewer than two live neighbor cells dies, underpopulation
    2. Any live cell with two or three live neighbor cells lives on to the next generation
    3. Any cell with more than three live neighbors dies due to overpopulation
    4. Any dead cell with exactly three neighbors becomes a live cell, reproduction

## Technologies Used:

Javascript
Canvas or p5.js

## Plan:
    - Initialize a grid structure. Array of arrays. Cols & Rows that are initialized with with live and dead cells. Live cell will be represented by a 1, dead cell will be represented by a 0. Cols and Rows will be instantiated based off of a set resolution scale.

    - Display this grid structure. When cell is active, set Fill(), when cell is inactive, set to no fill.

    - Grid should be initialized to show random values upon refresh. Will later implement button that will start the game with a fresh instantiation.

    - Grid will have a current grid state, and a next generation grid state. The next state will be generated based off the rules of the game and will be written from the old state.

    - Implement the rules algorithms that will loop cell of the grid and make the specific changes to the cells based off the old grid

    - Once a basic working game of life grid is active, styling and UI to be built to hold the game in an app.