import { generateCells, generateGrid, randomCell, flattern, getCurrent } from './utils';

const subscribers = [];
let id = 0;
const initialState = {
  win: null,
  score: 0,
  cells: generateCells(4, 4),
  grid: generateGrid(4, 4),
  isActual: true
};

const Store = function Store() {
  this.oldState = {};
  this.state = initialState;
};

Store.prototype.subscribe = function(cb) {
  subscribers.push(cb);
};

Store.prototype.triggerSubscribers = function() {
  subscribers.forEach((subscriber) => {
    subscriber(this.state);
  });
};

Store.prototype.reduce = function(action, state) {
  switch (action.type) {
    case 'INIT':
      return this.getInitialState(action.size);
    case 'MOVE_TILE':
      return moveInDirection(action.direction, state);
    case 'ACTUALIZE':
      return actualize(state);
    case 'MERGE_TILE':
      return mergeTiles(state);
  }
  return state;
};

Store.prototype.dispatch = function(action) {
  this.oldState = this.state;
  this.state = this.reduce(action, this.state);
  this.triggerSubscribers();
};

Store.prototype.getState = function() {
  return this.state;
};

Store.prototype.getInitialState = function(size) {
  let startCount = 2;
  let state = this.state;
  let cell;
  while (startCount > 0) {
    cell = randomCell(state.cells);
    console.log(cell);
    state = newTile(state, cell);
    startCount--;
  }
  return state;
};

function newTile(state, cell) {
  state = Object.assign({}, state);
  if (!state.cells.length) return state;

  const x = flattern(flattern(state.grid)).find((t) => {
    return t.value === 'x';
  });

  if (id > 1 && !x) state = addTile(state, cell, "x");
  else state = addTile(state, cell);
  state.cells = state.cells.filter((obj) => {
    return !(obj.x === cell.x && obj.y === cell.y);
  });
  return state;
}

function addTile(state, tile, value) {
  state = Object.assign({}, state);
  tile = Object.assign({}, tile);
  tile.id = id++;
  tile.value = value || 2;
  state.grid[tile.x][tile.y].push(tile);
  return state;
}

function moveInDirection(direction, state) {
  state = Object.assign({}, state);
  let initial = state;
  let directions = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
  let tiles = flattern(flattern(state.grid));

  const check = (current) => {
    if (current !== direction) initial = state;

    directions = directions.filter(dir => dir !== current);
    tiles = sortTiles(tiles, current);
    state = moveTiles(state, tiles, current);

    if (initial === state) {
      if (directions.length) return check(directions[0]);
      return state.win = false;
    }

    return (current !== direction) ? initial : state;
  };

  return check(direction);
}

function sortTiles(tiles, direction) {
  const {axis, value} = getCurrent(direction);
  tiles = tiles.sort((a, b) => {
    return a[axis] - b[axis];
  });
  if (value < 0) tiles = tiles.reverse();
  return tiles;
}

function moveTiles(state, tiles, direction) {
  tiles.forEach(tile => state = moveTile(state, tile, direction));
  return state;
}

function moveTile(state, tile, direction) {
  state = Object.assign({}, state);
  const available = findAvailableCell(state, tile, direction);
  if (available) {
    state.isActual = false;
    state.grid[available.index][available.value].push(tile);
    state.grid[tile.x][tile.y].pop();
  }

  return state;
}

function findAvailableCell(state, tile, direction) {
  let available;
  const {axis, value} = getCurrent(direction);
  let from = tile[axis];
  let to = value < 0 ? (4 - 1) : 0;
  const arr = [];

  if (from <= to) {
    while(from <= to) {
      arr.push(from++);
    }
  } else {
    while(to >= from) {
      arr.push(to--);
    }
  }

  arr.forEach((index) => {
    let path;
    if (axis === 'y') {
      path = {
        index: index,
        value: tile.y
      };
    } else {
      path = {
        index: tile.x,
        value: index
      };
    }

    const cell = state.grid[path.index][path.value];

    if (!isSuitable(cell, tile)) {
      available = null;
      return;
    }

    if (tile.value === "x") {
      if (cell.length === 1 || (!cell.length && !available)) available = path;
    } else {
      available = available || path;
    }
  });

  return available;
}

function isSuitable(cell, tile) {
  const t1 = cell[0] ? cell[0].value : '';
  const t2 = tile.value;

  if (cell.length > 1) return false;
  if (cell.length) {
    if (t1 === 'x' || t2 === 'x') return true;
    if (t1 !== t2) return false;
  }

  return true;
}

function actualize(state) {
  state = Object.assign({}, state);
  let grid = state.grid;

  grid.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (!cell.length) return;
      cell.forEach((tile, index) => {
        if (tile.x !== x || tile.y !== y) {
          grid[x][y][index].x = x;
          grid[x][y][index].y = y;
        }
      });
    });
  });
  state.isActual = true;
  state.grid = grid;
  return state;
}

function mergeTiles(state) {
  state = Object.assign({}, state);
  let cells = [];
  let grid = state.grid;
  let result = 0;

  grid.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (!cell.length) {
        cells.push({x, y});
      }
      if (cell.length > 1) {
        const value = cell.reduce((t1, t2) => calculateTiles(t1, t2));

        result += value;
        // grid = grid.updateIn([x, y], () => List.of(cell.first().merge({value, id: id++})));
        state.win = (value === '2048' || null);
        state.score += value;
      }
    });
  });

  state.cells = cells;
  state.result = result;
  state.grid = grid;

  return state;

}

function calculateTiles(t1, t2) {
  if (t1.value === "x") return t2.value * 2;
  if (t2.value === "x") return t1.value * 2;
  return t1.value + t2.value;
}



export default Store;
