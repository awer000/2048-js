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
  this.$table = document.querySelector('.grid-container');
  this.setup();
};

Game.prototype.setup = function () {
  this.store = new _store2.default();
  this.store.subscribe(this.render.bind(this));
  this.store.dispatch({
    type: 'INIT'
  });
};

Game.prototype.render = function (state) {
  var grid = state.grid;
  for (var i = 0; i < grid.length; i++) {
    var row = Math.floor(i / this.size);
    var col = i % 4;
    var node = this.$table.rows[row].cells[col];
    node.innerHTML = grid[i];
  }
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
  this.state = {};
};

Store.prototype.subscribe = function (cb) {
  subscribers.push(cb);
};

Store.prototype.triggerSubscribers = function () {
  var _this = this;

  subscribers.forEach(function (subscriber) {
    subscriber(_this.state);
  });
};

Store.prototype.reduce = function (action, state) {
  switch (action.type) {
    case 'INIT':
      return this.getInitialState();
  }
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

Store.prototype.getInitialState = function () {
  var startCount = 2;
  while (startCount > 0) {
    var value = Math.random() < 0.9 ? 2 : 4;
    var index = Math.floor(Math.random() * 16);
    initialState.grid[index] = value;
    startCount--;
  }
  return initialState;
};

exports.default = Store;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9hcHAuanMiLCJzcmMvc2NyaXB0cy9nYW1lLmpzIiwic3JjL3NjcmlwdHMvc3RvcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7Ozs7QUFFQSxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFZO0FBQ3hELE1BQU0sT0FBTyxtQkFBUyxDQUFULENBQWI7QUFDRCxDQUZEOzs7Ozs7Ozs7QUNGQTs7Ozs7O0FBRUEsSUFBTSxPQUFPLFNBQVMsSUFBVCxDQUFjLElBQWQsRUFBb0I7QUFDL0IsT0FBSyxJQUFMLEdBQVksSUFBWjtBQUNBLE9BQUssTUFBTCxHQUFjLFNBQVMsYUFBVCxDQUF1QixpQkFBdkIsQ0FBZDtBQUNBLE9BQUssS0FBTDtBQUNELENBSkQ7O0FBTUEsS0FBSyxTQUFMLENBQWUsS0FBZixHQUF1QixZQUFXO0FBQ2hDLE9BQUssS0FBTCxHQUFhLHFCQUFiO0FBQ0EsT0FBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLElBQWpCLENBQXJCO0FBQ0EsT0FBSyxLQUFMLENBQVcsUUFBWCxDQUFvQjtBQUNsQixVQUFNO0FBRFksR0FBcEI7QUFHRCxDQU5EOztBQVFBLEtBQUssU0FBTCxDQUFlLE1BQWYsR0FBd0IsVUFBUyxLQUFULEVBQWdCO0FBQ3RDLE1BQU0sT0FBTyxNQUFNLElBQW5CO0FBQ0EsT0FBSSxJQUFJLElBQUUsQ0FBVixFQUFhLElBQUUsS0FBSyxNQUFwQixFQUE0QixHQUE1QixFQUFpQztBQUMvQixRQUFJLE1BQU0sS0FBSyxLQUFMLENBQVcsSUFBSSxLQUFLLElBQXBCLENBQVY7QUFDQSxRQUFJLE1BQU0sSUFBSSxDQUFkO0FBQ0EsUUFBSSxPQUFPLEtBQUssTUFBTCxDQUFZLElBQVosQ0FBaUIsR0FBakIsRUFBc0IsS0FBdEIsQ0FBNEIsR0FBNUIsQ0FBWDtBQUNBLFNBQUssU0FBTCxHQUFpQixLQUFLLENBQUwsQ0FBakI7QUFDRDtBQUNGLENBUkQ7O2tCQVVlLEk7Ozs7Ozs7O0FDMUJmLElBQU0sY0FBYyxFQUFwQjtBQUNBLElBQU0sZUFBZTtBQUNuQixVQUFRLElBQUksS0FBSixDQUFVLElBQUksQ0FBZCxFQUFpQixJQUFqQixDQUFzQixFQUF0QjtBQURXLENBQXJCOztBQUlBLElBQU0sUUFBUSxTQUFTLEtBQVQsR0FBaUI7QUFDN0IsT0FBSyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsT0FBSyxLQUFMLEdBQWEsRUFBYjtBQUNELENBSEQ7O0FBS0EsTUFBTSxTQUFOLENBQWdCLFNBQWhCLEdBQTRCLFVBQVMsRUFBVCxFQUFhO0FBQ3ZDLGNBQVksSUFBWixDQUFpQixFQUFqQjtBQUNELENBRkQ7O0FBSUEsTUFBTSxTQUFOLENBQWdCLGtCQUFoQixHQUFxQyxZQUFXO0FBQUE7O0FBQzlDLGNBQVksT0FBWixDQUFvQixVQUFDLFVBQUQsRUFBZ0I7QUFDbEMsZUFBVyxNQUFLLEtBQWhCO0FBQ0QsR0FGRDtBQUdELENBSkQ7O0FBTUEsTUFBTSxTQUFOLENBQWdCLE1BQWhCLEdBQXlCLFVBQVMsTUFBVCxFQUFpQixLQUFqQixFQUF3QjtBQUMvQyxVQUFRLE9BQU8sSUFBZjtBQUNFLFNBQUssTUFBTDtBQUNFLGFBQU8sS0FBSyxlQUFMLEVBQVA7QUFGSjtBQUlBLFNBQU8sS0FBUDtBQUNELENBTkQ7O0FBUUEsTUFBTSxTQUFOLENBQWdCLFFBQWhCLEdBQTJCLFVBQVMsTUFBVCxFQUFpQjtBQUMxQyxPQUFLLFFBQUwsR0FBZ0IsS0FBSyxLQUFyQjtBQUNBLE9BQUssS0FBTCxHQUFhLEtBQUssTUFBTCxDQUFZLE1BQVosRUFBb0IsS0FBSyxLQUF6QixDQUFiO0FBQ0EsT0FBSyxrQkFBTDtBQUNELENBSkQ7O0FBTUEsTUFBTSxTQUFOLENBQWdCLFFBQWhCLEdBQTJCLFlBQVc7QUFDcEMsU0FBTyxLQUFLLEtBQVo7QUFDRCxDQUZEOztBQUlBLE1BQU0sU0FBTixDQUFnQixlQUFoQixHQUFrQyxZQUFXO0FBQzNDLE1BQUksYUFBYSxDQUFqQjtBQUNBLFNBQU8sYUFBYSxDQUFwQixFQUF1QjtBQUNyQixRQUFJLFFBQVEsS0FBSyxNQUFMLEtBQWdCLEdBQWhCLEdBQXNCLENBQXRCLEdBQTBCLENBQXRDO0FBQ0EsUUFBSSxRQUFRLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixFQUEzQixDQUFaO0FBQ0EsaUJBQWEsSUFBYixDQUFrQixLQUFsQixJQUEyQixLQUEzQjtBQUNBO0FBQ0Q7QUFDRCxTQUFPLFlBQVA7QUFDRCxDQVREOztrQkFhZSxLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBHYW1lIGZyb20gJy4vZ2FtZSc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgZ2FtZSA9IG5ldyBHYW1lKDQpO1xufSk7XG4iLCJpbXBvcnQgU3RvcmUgZnJvbSAnLi9zdG9yZSc7XG5cbmNvbnN0IEdhbWUgPSBmdW5jdGlvbiBHYW1lKHNpemUpIHtcbiAgdGhpcy5zaXplID0gc2l6ZTtcbiAgdGhpcy4kdGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZC1jb250YWluZXInKTtcbiAgdGhpcy5zZXR1cCgpO1xufTtcblxuR2FtZS5wcm90b3R5cGUuc2V0dXAgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zdG9yZSA9IG5ldyBTdG9yZSgpO1xuICB0aGlzLnN0b3JlLnN1YnNjcmliZSh0aGlzLnJlbmRlci5iaW5kKHRoaXMpKTtcbiAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7XG4gICAgdHlwZTogJ0lOSVQnXG4gIH0pO1xufTtcblxuR2FtZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgY29uc3QgZ3JpZCA9IHN0YXRlLmdyaWQ7XG4gIGZvcihsZXQgaT0wOyBpPGdyaWQubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihpIC8gdGhpcy5zaXplKTtcbiAgICBsZXQgY29sID0gaSAlIDQ7XG4gICAgbGV0IG5vZGUgPSB0aGlzLiR0YWJsZS5yb3dzW3Jvd10uY2VsbHNbY29sXTtcbiAgICBub2RlLmlubmVySFRNTCA9IGdyaWRbaV07XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCJjb25zdCBzdWJzY3JpYmVycyA9IFtdO1xuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xuICAnZ3JpZCc6IG5ldyBBcnJheSg0ICogNCkuZmlsbCgnJylcbn07XG5cbmNvbnN0IFN0b3JlID0gZnVuY3Rpb24gU3RvcmUoKSB7XG4gIHRoaXMub2xkU3RhdGUgPSB7fTtcbiAgdGhpcy5zdGF0ZSA9IHt9O1xufTtcblxuU3RvcmUucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uKGNiKSB7XG4gIHN1YnNjcmliZXJzLnB1c2goY2IpO1xufTtcblxuU3RvcmUucHJvdG90eXBlLnRyaWdnZXJTdWJzY3JpYmVycyA9IGZ1bmN0aW9uKCkge1xuICBzdWJzY3JpYmVycy5mb3JFYWNoKChzdWJzY3JpYmVyKSA9PiB7XG4gICAgc3Vic2NyaWJlcih0aGlzLnN0YXRlKTtcbiAgfSk7XG59O1xuXG5TdG9yZS5wcm90b3R5cGUucmVkdWNlID0gZnVuY3Rpb24oYWN0aW9uLCBzdGF0ZSkge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSAnSU5JVCc6XG4gICAgICByZXR1cm4gdGhpcy5nZXRJbml0aWFsU3RhdGUoKTtcbiAgfVxuICByZXR1cm4gc3RhdGU7XG59O1xuXG5TdG9yZS5wcm90b3R5cGUuZGlzcGF0Y2ggPSBmdW5jdGlvbihhY3Rpb24pIHtcbiAgdGhpcy5vbGRTdGF0ZSA9IHRoaXMuc3RhdGU7XG4gIHRoaXMuc3RhdGUgPSB0aGlzLnJlZHVjZShhY3Rpb24sIHRoaXMuc3RhdGUpO1xuICB0aGlzLnRyaWdnZXJTdWJzY3JpYmVycygpO1xufTtcblxuU3RvcmUucHJvdG90eXBlLmdldFN0YXRlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnN0YXRlO1xufTtcblxuU3RvcmUucHJvdG90eXBlLmdldEluaXRpYWxTdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICBsZXQgc3RhcnRDb3VudCA9IDI7XG4gIHdoaWxlIChzdGFydENvdW50ID4gMCkge1xuICAgIGxldCB2YWx1ZSA9IE1hdGgucmFuZG9tKCkgPCAwLjkgPyAyIDogNDtcbiAgICBsZXQgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNik7XG4gICAgaW5pdGlhbFN0YXRlLmdyaWRbaW5kZXhdID0gdmFsdWU7XG4gICAgc3RhcnRDb3VudC0tO1xuICB9XG4gIHJldHVybiBpbml0aWFsU3RhdGU7XG59O1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgU3RvcmU7XG4iXX0=
