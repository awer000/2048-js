const subscribers = [];
const initialState = {
  'grid': new Array(4 * 4).fill('')
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
    subscriber();
  });
};

Store.prototype.reduce = function(action, state) {
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



export default Store;
