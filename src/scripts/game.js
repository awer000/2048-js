import Store from './store';

const Game = function Game(size) {
  this.size = size;
  this.$table = document.querySelector('.grid-container');
  this.setup();
};

Game.prototype.setup = function() {
  this.store = new Store();
  this.store.subscribe(this.render.bind(this));
  this.store.dispatch({
    type: 'INIT'
  });
};

Game.prototype.render = function(state) {
  const grid = state.grid;
  for(let i=0; i<grid.length; i++) {
    let row = Math.floor(i / this.size);
    let col = i % 4;
    let node = this.$table.rows[row].cells[col];
    node.innerHTML = grid[i];
  }
};

export default Game;
