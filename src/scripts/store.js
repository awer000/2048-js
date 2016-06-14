import { generateCells, generateGrid, randomCell, flattern } from './utils';

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
    state = newTile(state, cell);
    startCount--;
  }
  return state;
};

function newTile(state, tile) {
  state = Object.assign({}, state);
  if (!state.cells.length) return state;

  tile = tile;
  const x = flattern(state.grid).find((t) => {
    return t.value === 'x';
  });

  if (id > 1 && !x) state = addTile(state, tile, "x");
  else state = addTile(state, tile);
  state.cells = state.cells.filter((obj) => {
    return !(obj.x === tile.x && obj.y === tile.y);
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


export default Store;
