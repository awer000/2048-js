import Store from './store';
import { flattern } from './utils';

const Game = function Game(size) {
  this.size = size;
  this.$table = document.querySelector('.grid-container');
  this.$tileContainer = document.querySelector('.tile-container');
  this.setup();
};

Game.prototype.setup = function() {
  this.store = new Store();
  this.store.subscribe(this.render.bind(this));
  this.store.dispatch({
    type: 'INIT',
    size: 4
  });
};

Game.prototype.render = function(state) {
  const grid = state.grid;
  const tiles = flattern(flattern(grid));
  for (let i=0; i < tiles.length; i++) {
    let $tile = document.createElement('div');
    $tile.classList.add('tile');
    $tile.classList.add(`tile-${tiles[i].value}`);
    $tile.classList.add(`tile-position-${tiles[i].x}-${tiles[i].y}`);
    $tile.innerHTML = tiles[i].value;
    this.$tileContainer.appendChild($tile);
  }
};

export default Game;
