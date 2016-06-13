import Store from './store';

const Game = function Game(size) {
  this.size = size;
  this.setup();
};

Game.prototype.setup = function() {
  this.store = new Store();
  this.store.subscribe(this.render);
  this.store.dispatch({
    type: 'INIT'
  });
};

Game.prototype.render = function() {
  console.log('rendering');
};

export default Game;
