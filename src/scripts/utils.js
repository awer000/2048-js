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
  return cells[Math.floor(Math.random() * (max + 1))];
}

export function flattern(arr) {
  arr = arr.slice();
  return arr.reduce((a, b) => {
    return a.concat(b);
  });
}
