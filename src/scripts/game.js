import Store from './store';
import { flattern } from './utils';

const Game = function Game(size) {
  this.size = size;
  this.$table = document.querySelector('.grid-container');
  this.$tileContainer = document.querySelector('.tile-container');
  this.queue = [];
  this.setup();
};

Game.prototype.setup = function() {
  this.store = new Store();
  this.store.subscribe(this.render.bind(this));
  this.store.dispatch({
    type: 'INIT',
    size: 4
  });
  this.eventListeners();
};

Game.prototype.render = function(state) {
  const grid = state.grid;
  const tiles = flattern(flattern(grid));
  for (let i=0; i < tiles.length; i++) {
    let $tile = document.createElement('div');
    $tile.classList.add('tile');
    $tile.classList.add(`tile-${tiles[i].value}`);
    $tile.classList.add(`tile-position-${tiles[i].x + 1}-${tiles[i].y + 1}`);
    $tile.innerHTML = tiles[i].value;
    this.$tileContainer.appendChild($tile);
  }
};

Game.prototype.eventListeners = function () {
  var map = {
    38: 'UP',
    39: 'RIGHT',
    40: 'DOWN',
    37: 'LEFT',
    75: 'UP',
    76:'RIGHT',
    74: 'DOWN',
    72: 'LEFT'
  };
  document.addEventListener("keydown", (event) => {
    var modifiers = event.altKey || event.ctrlKey || event.metaKey ||
                    event.shiftKey;
    var direction    = map[event.which];

    if (!modifiers) {
      if (direction !== undefined) {
        event.preventDefault();
        this._prepare(direction);
      }
    }
  });
};

Game.prototype._prepare = function(direction) {
  this.store.dispatch({
    type: 'MOVE_TILE',
    direction
  })
};



export default Game;
