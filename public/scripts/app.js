(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _game = require("./game");

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
  var game = new _game2.default(4);
});

},{"./game":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Game = function Game(size) {
  this.size = size;
  this.setup();
};

Game.prototype.setup = function () {
  this.store = new _store2.default();
  this.store.subscribe(this.render);
  this.store.dispatch({
    type: 'INIT'
  });
};

Game.prototype.render = function () {
  console.log('rendering');
};

exports.default = Game;

},{"./store":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var subscribers = [];
var initialState = {
  'grid': new Array(4 * 4).fill('')
};

var Store = function Store() {
  this.oldState = {};
  this.state = initialState;
};

Store.prototype.subscribe = function (cb) {
  subscribers.push(cb);
};

Store.prototype.triggerSubscribers = function () {
  subscribers.forEach(function (subscriber) {
    subscriber();
  });
};

Store.prototype.reduce = function (action, state) {
  return state;
};

Store.prototype.dispatch = function (action) {
  this.oldState = this.state;
  this.state = this.reduce(action, this.state);
  this.triggerSubscribers();
};

Store.prototype.getState = function () {
  return this.state;
};

exports.default = Store;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9hcHAuanMiLCJzcmMvc2NyaXB0cy9nYW1lLmpzIiwic3JjL3NjcmlwdHMvc3RvcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFZO0FBQ3hELE1BQU0sT0FBTyxtQkFBUyxDQUFULENBQWI7QUFDRCxDQUZEOzs7Ozs7Ozs7QUNGQTs7Ozs7O0FBRUEsSUFBTSxPQUFPLFNBQVMsSUFBVCxDQUFjLElBQWQsRUFBb0I7QUFDL0IsT0FBSyxJQUFMLEdBQVksSUFBWjtBQUNBLE9BQUssS0FBTDtBQUNELENBSEQ7O0FBS0EsS0FBSyxTQUFMLENBQWUsS0FBZixHQUF1QixZQUFXO0FBQ2hDLE9BQUssS0FBTCxHQUFhLHFCQUFiO0FBQ0EsT0FBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixLQUFLLE1BQTFCO0FBQ0EsT0FBSyxLQUFMLENBQVcsUUFBWCxDQUFvQjtBQUNsQixVQUFNO0FBRFksR0FBcEI7QUFHRCxDQU5EOztBQVFBLEtBQUssU0FBTCxDQUFlLE1BQWYsR0FBd0IsWUFBVztBQUNqQyxVQUFRLEdBQVIsQ0FBWSxXQUFaO0FBQ0QsQ0FGRDs7a0JBSWUsSTs7Ozs7Ozs7QUNuQmYsSUFBTSxjQUFjLEVBQXBCO0FBQ0EsSUFBTSxlQUFlO0FBQ25CLFVBQVEsSUFBSSxLQUFKLENBQVUsSUFBSSxDQUFkLEVBQWlCLElBQWpCLENBQXNCLEVBQXRCO0FBRFcsQ0FBckI7O0FBSUEsSUFBTSxRQUFRLFNBQVMsS0FBVCxHQUFpQjtBQUM3QixPQUFLLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxPQUFLLEtBQUwsR0FBYSxZQUFiO0FBQ0QsQ0FIRDs7QUFLQSxNQUFNLFNBQU4sQ0FBZ0IsU0FBaEIsR0FBNEIsVUFBUyxFQUFULEVBQWE7QUFDdkMsY0FBWSxJQUFaLENBQWlCLEVBQWpCO0FBQ0QsQ0FGRDs7QUFJQSxNQUFNLFNBQU4sQ0FBZ0Isa0JBQWhCLEdBQXFDLFlBQVc7QUFDOUMsY0FBWSxPQUFaLENBQW9CLFVBQUMsVUFBRCxFQUFnQjtBQUNsQztBQUNELEdBRkQ7QUFHRCxDQUpEOztBQU1BLE1BQU0sU0FBTixDQUFnQixNQUFoQixHQUF5QixVQUFTLE1BQVQsRUFBaUIsS0FBakIsRUFBd0I7QUFDL0MsU0FBTyxLQUFQO0FBQ0QsQ0FGRDs7QUFJQSxNQUFNLFNBQU4sQ0FBZ0IsUUFBaEIsR0FBMkIsVUFBUyxNQUFULEVBQWlCO0FBQzFDLE9BQUssUUFBTCxHQUFnQixLQUFLLEtBQXJCO0FBQ0EsT0FBSyxLQUFMLEdBQWEsS0FBSyxNQUFMLENBQVksTUFBWixFQUFvQixLQUFLLEtBQXpCLENBQWI7QUFDQSxPQUFLLGtCQUFMO0FBQ0QsQ0FKRDs7QUFNQSxNQUFNLFNBQU4sQ0FBZ0IsUUFBaEIsR0FBMkIsWUFBVztBQUNwQyxTQUFPLEtBQUssS0FBWjtBQUNELENBRkQ7O2tCQU1lLEsiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xuICBjb25zdCBnYW1lID0gbmV3IEdhbWUoNCk7XG59KTtcbiIsImltcG9ydCBTdG9yZSBmcm9tICcuL3N0b3JlJztcblxuY29uc3QgR2FtZSA9IGZ1bmN0aW9uIEdhbWUoc2l6ZSkge1xuICB0aGlzLnNpemUgPSBzaXplO1xuICB0aGlzLnNldHVwKCk7XG59O1xuXG5HYW1lLnByb3RvdHlwZS5zZXR1cCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnN0b3JlID0gbmV3IFN0b3JlKCk7XG4gIHRoaXMuc3RvcmUuc3Vic2NyaWJlKHRoaXMucmVuZGVyKTtcbiAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgdHlwZTogJ0lOSVQnXG4gIH0pO1xufTtcblxuR2FtZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIGNvbnNvbGUubG9nKCdyZW5kZXJpbmcnKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCJjb25zdCBzdWJzY3JpYmVycyA9IFtdO1xuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAnZ3JpZCc6IG5ldyBBcnJheSg0ICogNCkuZmlsbCgnJylcbn07XG5cbmNvbnN0IFN0b3JlID0gZnVuY3Rpb24gU3RvcmUoKSB7XG4gIHRoaXMub2xkU3RhdGUgPSB7fTtcbiAgdGhpcy5zdGF0ZSA9IGluaXRpYWxTdGF0ZTtcbn07XG5cblN0b3JlLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbihjYikge1xuICBzdWJzY3JpYmVycy5wdXNoKGNiKTtcbn07XG5cblN0b3JlLnByb3RvdHlwZS50cmlnZ2VyU3Vic2NyaWJlcnMgPSBmdW5jdGlvbigpIHtcbiAgc3Vic2NyaWJlcnMuZm9yRWFjaCgoc3Vic2NyaWJlcikgPT4ge1xuICAgIHN1YnNjcmliZXIoKTtcbiAgfSk7XG59O1xuXG5TdG9yZS5wcm90b3R5cGUucmVkdWNlID0gZnVuY3Rpb24oYWN0aW9uLCBzdGF0ZSkge1xuICByZXR1cm4gc3RhdGU7XG59O1xuXG5TdG9yZS5wcm90b3R5cGUuZGlzcGF0Y2ggPSBmdW5jdGlvbihhY3Rpb24pIHtcbiAgdGhpcy5vbGRTdGF0ZSA9IHRoaXMuc3RhdGU7XG4gIHRoaXMuc3RhdGUgPSB0aGlzLnJlZHVjZShhY3Rpb24sIHRoaXMuc3RhdGUpO1xuICB0aGlzLnRyaWdnZXJTdWJzY3JpYmVycygpO1xufTtcblxuU3RvcmUucHJvdG90eXBlLmdldFN0YXRlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnN0YXRlO1xufTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IFN0b3JlO1xuIl19
