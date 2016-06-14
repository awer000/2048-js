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
  let tiles = flattern(flattern(state.grid));
  tiles = sortTiles(tiles, direction);
  state = moveTiles(state, tiles, direction);
  return state;
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
  const to = value < 0 ? (4 - 1) : 0;
  const arr = [];

  while(from <= to) {
    arr.push(from++);
  }

  arr.forEach(index => {
    let path;
    if (axis === 'x') {
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



export default Store;
