// Rules
// 1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// 2. Any live cell with two or three live neighbours lives on to the next generation.
// 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
// 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

// Cell is dead, comes to life if 3 lives neighbors
// Cell is alive, it < 2 or > 3 neighbors, it dies

function makeGrid(cols, rows, rand_populate = false) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    // Populate with random values
    if (rand_populate) {
      for (let j = 0; j < arr[i].length; j++) {
        arr[i][j] = round(random());
      }
    }
  }
  return arr
}

function countNeighbors(grid, x, y) {
  let neighbors = 0;

  if (x == 0 || y == 0 || x == cols - 1 || y == rows - 1) {
    return false;
  }

  for (let i = x - 1; i < x + 2; i++) {
    for (let j = y - 1; j < y + 2; j++) {
      neighbors += grid[i][j]
    }
  }
  neighbors -= grid[x][y]
  return neighbors;
}

function iterate(grid) {
  let next = makeGrid(cols, rows)

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      neighbors = countNeighbors(grid, i, j)
      state = grid[i][j];
      if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0
      } else if (state == 0 && neighbors == 3) {
        next[i][j] = 1
      } else {
        next[i][j] = grid[i][j];
      }
    }
  }


  return next;
}


let rows;
let cols;
let grid;
let resolution = 20;

function setup() {
  createCanvas(1200, 800)
  frameRate(10)
  rows = height / resolution;
  cols = width / resolution;
  grid = makeGrid(cols, rows, rand_populate = true);
}

function draw() {
  background(0)

  // render
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      x = i * resolution;
      y = j * resolution;
      w = resolution;
      if (grid[i][j] == 1) {
        // stroke(255) // Remove grid lines
        rect(x, y, w, w)
      }

    }
  }
  grid = iterate(grid);
}
