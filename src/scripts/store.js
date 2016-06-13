const subscribers = [];
const initialState = {
  'grid': new Array(4 * 4).fill('')
};

const Store = function Store() {
  this.oldState = {};
  this.state = {};
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
      return this.getInitialState();
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

Store.prototype.getInitialState = function() {
  let startCount = 2;
  while (startCount > 0) {
    let value = Math.random() < 0.9 ? 2 : 4;
    let index = Math.floor(Math.random() * 16);
    initialState.grid[index] = value;
    startCount--;
  }
  return initialState;
};



export default Store;
