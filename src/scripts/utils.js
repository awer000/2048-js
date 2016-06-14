export function generateCells(x, y) {
  let cells = [];

  for (let i=0; i<x; i++) {
    for (let j=0; j<y; j++) {
      cells.push({
        x: i,
        y: j
      });
    }
  }

  return cells;
}


export function generateGrid(x, y) {
  let cells = [];

  for (let i=0; i<x; i++) {
    cells[i] = [];
    for (let j=0; j<y; j++) {
      cells[i][j] = [];
    }
  }

  return cells;
}

export function randomCell(cells) {
  const max = cells.length;
  return cells[Math.floor(Math.random() * max)];
}

export function flattern(arr) {
  arr = arr.slice();
  return arr.reduce((a, b) => {
    return a.concat(b);
  });
}

export function getCurrent(direction) {
  let axis;
  const axises = getVector(direction);

  for (const current in axises) {
    if ({}.hasOwnProperty.call(axises, current)) {
      if (axises[current] !== 0) {
        axis = current;
      }
    }
  }

  return {
    axis,
    value: axises[axis]
  };
}

function getVector(direction) {
  const VECTORS = {};
  VECTORS.UP = {x: 1, y: 0};
  VECTORS.LEFT = {x: 0, y: 1};
  VECTORS.DOWN = {x: -1, y: 0};
  VECTORS.RIGHT = {x: 0, y: -1};
  return VECTORS[direction];
}
