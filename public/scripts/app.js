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

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Game = function Game(size) {
  this.size = size;
  this.$table = document.querySelector('.grid-container');
  this.$tileContainer = document.querySelector('.tile-container');
  this.setup();
};

Game.prototype.setup = function () {
  this.store = new _store2.default();
  this.store.subscribe(this.render.bind(this));
  this.store.dispatch({
    type: 'INIT',
    size: 4
  });
};

Game.prototype.render = function (state) {
  var grid = state.grid;
  var tiles = (0, _utils.flattern)((0, _utils.flattern)(grid));
  for (var i = 0; i < tiles.length; i++) {
    var $tile = document.createElement('div');
    $tile.classList.add('tile');
    $tile.classList.add('tile-' + tiles[i].value);
    $tile.classList.add('tile-position-' + tiles[i].x + '-' + tiles[i].y);
    $tile.innerHTML = tiles[i].value;
    this.$tileContainer.appendChild($tile);
  }
};

exports.default = Game;

},{"./store":3,"./utils":4}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var subscribers = [];
var id = 0;
var initialState = {
  win: null,
  score: 0,
  cells: (0, _utils.generateCells)(4, 4),
  grid: (0, _utils.generateGrid)(4, 4),
  isActual: true
};

var Store = function Store() {
  this.oldState = {};
  this.state = initialState;
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
      return this.getInitialState(action.size);
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

Store.prototype.getInitialState = function (size) {
  var startCount = 2;
  var state = this.state;
  var cell = void 0;
  while (startCount > 0) {
    cell = (0, _utils.randomCell)(state.cells);
    state = newTile(state, cell);
    startCount--;
  }
  return state;
};

function newTile(state, tile) {
  state = Object.assign({}, state);
  if (!state.cells.length) return state;

  tile = tile;
  var x = (0, _utils.flattern)(state.grid).find(function (t) {
    return t.value === 'x';
  });

  if (id > 1 && !x) state = addTile(state, tile, "x");else state = addTile(state, tile);
  state.cells = state.cells.filter(function (obj) {
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

exports.default = Store;

},{"./utils":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateCells = generateCells;
exports.generateGrid = generateGrid;
exports.randomCell = randomCell;
exports.flattern = flattern;
function generateCells(x, y) {
  var cells = [];

  for (var i = 0; i < x; i++) {
    for (var j = 0; j < y; j++) {
      cells.push({
        x: i,
        y: j
      });
    }
  }

  return cells;
}

function generateGrid(x, y) {
  var cells = [];

  for (var i = 0; i < x; i++) {
    cells[i] = [];
    for (var j = 0; j < y; j++) {
      cells[i][j] = [];
    }
  }

  return cells;
}

function randomCell(cells) {
  var max = cells.length;
  return cells[Math.floor(Math.random() * (max + 1))];
}

function flattern(arr) {
  arr = arr.slice();
  return arr.reduce(function (a, b) {
    return a.concat(b);
  });
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9hcHAuanMiLCJzcmMvc2NyaXB0cy9nYW1lLmpzIiwic3JjL3NjcmlwdHMvc3RvcmUuanMiLCJzcmMvc2NyaXB0cy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVk7QUFDeEQsTUFBTSxPQUFPLG1CQUFTLENBQVQsQ0FBYjtBQUNELENBRkQ7Ozs7Ozs7OztBQ0ZBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNLE9BQU8sU0FBUyxJQUFULENBQWMsSUFBZCxFQUFvQjtBQUMvQixPQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsT0FBSyxNQUFMLEdBQWMsU0FBUyxhQUFULENBQXVCLGlCQUF2QixDQUFkO0FBQ0EsT0FBSyxjQUFMLEdBQXNCLFNBQVMsYUFBVCxDQUF1QixpQkFBdkIsQ0FBdEI7QUFDQSxPQUFLLEtBQUw7QUFDRCxDQUxEOztBQU9BLEtBQUssU0FBTCxDQUFlLEtBQWYsR0FBdUIsWUFBVztBQUNoQyxPQUFLLEtBQUwsR0FBYSxxQkFBYjtBQUNBLE9BQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsS0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixJQUFqQixDQUFyQjtBQUNBLE9BQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0I7QUFDbEIsVUFBTSxNQURZO0FBRWxCLFVBQU07QUFGWSxHQUFwQjtBQUlELENBUEQ7O0FBU0EsS0FBSyxTQUFMLENBQWUsTUFBZixHQUF3QixVQUFTLEtBQVQsRUFBZ0I7QUFDdEMsTUFBTSxPQUFPLE1BQU0sSUFBbkI7QUFDQSxNQUFNLFFBQVEscUJBQVMscUJBQVMsSUFBVCxDQUFULENBQWQ7QUFDQSxPQUFLLElBQUksSUFBRSxDQUFYLEVBQWMsSUFBSSxNQUFNLE1BQXhCLEVBQWdDLEdBQWhDLEVBQXFDO0FBQ25DLFFBQUksUUFBUSxT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QVMsWUFBVCxDQUFzQixDQUF0QixFQUF5QixDQUF6QixFQUE0QjtBQUNqQyxNQUFJLFFBQVEsRUFBWjs7QUFFQSxPQUFLLElBQUksSUFBRSxDQUFYLEVBQWMsSUFBRSxDQUFoQixFQUFtQixHQUFuQixFQUF3QjtBQUN0QixVQUFNLENBQU4sSUFBVyxFQUFYO0FBQ0EsU0FBSyxJQUFJLElBQUUsQ0FBWCxFQUFjLElBQUUsQ0FBaEIsRUFBbUIsR0FBbkIsRUFBd0I7QUFDdEIsWUFBTSxDQUFOLEVBQVMsQ0FBVCxJQUFjLEVBQWQ7QUFDRDtBQUNGOztBQUVELFNBQU8sS0FBUDtBQUNEOztBQUVNLFNBQVMsVUFBVCxDQUFvQixLQUFwQixFQUEyQjtBQUNoQyxNQUFNLE1BQU0sTUFBTSxNQUFsQjtBQUNBLFNBQU8sTUFBTSxLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsTUFBaUIsTUFBTSxDQUF2QixDQUFYLENBQU4sQ0FBUDtBQUNEOztBQUVNLFNBQVMsUUFBVCxDQUFrQixHQUFsQixFQUF1QjtBQUM1QixRQUFNLElBQUksS0FBSixFQUFOO0FBQ0EsU0FBTyxJQUFJLE1BQUosQ0FBVyxVQUFDLENBQUQsRUFBSSxDQUFKLEVBQVU7QUFDMUIsV0FBTyxFQUFFLE1BQUYsQ0FBUyxDQUFULENBQVA7QUFDRCxHQUZNLENBQVA7QUFHRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGdhbWUgPSBuZXcgR2FtZSg0KTtcbn0pO1xuIiwiaW1wb3J0IFN0b3JlIGZyb20gJy4vc3RvcmUnO1xuaW1wb3J0IHsgZmxhdHRlcm4gfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgR2FtZSA9IGZ1bmN0aW9uIEdhbWUoc2l6ZSkge1xuICB0aGlzLnNpemUgPSBzaXplO1xuICB0aGlzLiR0YWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkLWNvbnRhaW5lcicpO1xuICB0aGlzLiR0aWxlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbGUtY29udGFpbmVyJyk7XG4gIHRoaXMuc2V0dXAoKTtcbn07XG5cbkdhbWUucHJvdG90eXBlLnNldHVwID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc3RvcmUgPSBuZXcgU3RvcmUoKTtcbiAgdGhpcy5zdG9yZS5zdWJzY3JpYmUodGhpcy5yZW5kZXIuYmluZCh0aGlzKSk7XG4gIHRoaXMuc3RvcmUuZGlzcGF0Y2goe1xuICAgIHR5cGU6ICdJTklUJyxcbiAgICBzaXplOiA0XG4gIH0pO1xufTtcblxuR2FtZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgY29uc3QgZ3JpZCA9IHN0YXRlLmdyaWQ7XG4gIGNvbnN0IHRpbGVzID0gZmxhdHRlcm4oZmxhdHRlcm4oZ3JpZCkpO1xuICBmb3IgKGxldCBpPTA7IGkgPCB0aWxlcy5sZW5ndGg7IGkrKykge1xuICAgIGxldCAkdGlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICR0aWxlLmNsYXNzTGlzdC5hZGQoJ3RpbGUnKTtcbiAgICAkdGlsZS5jbGFzc0xpc3QuYWRkKGB0aWxlLSR7dGlsZXNbaV0udmFsdWV9YCk7XG4gICAgJHRpbGUuY2xhc3NMaXN0LmFkZChgdGlsZS1wb3NpdGlvbi0ke3RpbGVzW2ldLnh9LSR7dGlsZXNbaV0ueX1gKTtcbiAgICAkdGlsZS5pbm5lckhUTUwgPSB0aWxlc1tpXS52YWx1ZTtcbiAgICB0aGlzLiR0aWxlQ29udGFpbmVyLmFwcGVuZENoaWxkKCR0aWxlKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcbiIsImltcG9ydCB7IGdlbmVyYXRlQ2VsbHMsIGdlbmVyYXRlR3JpZCwgcmFuZG9tQ2VsbCwgZmxhdHRlcm4gfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3Qgc3Vic2NyaWJlcnMgPSBbXTtcbmxldCBpZCA9IDA7XG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIHdpbjogbnVsbCxcbiAgc2NvcmU6IDAsXG4gIGNlbGxzOiBnZW5lcmF0ZUNlbGxzKDQsIDQpLFxuICBncmlkOiBnZW5lcmF0ZUdyaWQoNCwgNCksXG4gIGlzQWN0dWFsOiB0cnVlXG59O1xuXG5jb25zdCBTdG9yZSA9IGZ1bmN0aW9uIFN0b3JlKCkge1xuICB0aGlzLm9sZFN0YXRlID0ge307XG4gIHRoaXMuc3RhdGUgPSBpbml0aWFsU3RhdGU7XG59O1xuXG5TdG9yZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24oY2IpIHtcbiAgc3Vic2NyaWJlcnMucHVzaChjYik7XG59O1xuXG5TdG9yZS5wcm90b3R5cGUudHJpZ2dlclN1YnNjcmliZXJzID0gZnVuY3Rpb24oKSB7XG4gIHN1YnNjcmliZXJzLmZvckVhY2goKHN1YnNjcmliZXIpID0+IHtcbiAgICBzdWJzY3JpYmVyKHRoaXMuc3RhdGUpO1xuICB9KTtcbn07XG5cblN0b3JlLnByb3RvdHlwZS5yZWR1Y2UgPSBmdW5jdGlvbihhY3Rpb24sIHN0YXRlKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlICdJTklUJzpcbiAgICAgIHJldHVybiB0aGlzLmdldEluaXRpYWxTdGF0ZShhY3Rpb24uc2l6ZSk7XG4gIH1cbiAgcmV0dXJuIHN0YXRlO1xufTtcblxuU3RvcmUucHJvdG90eXBlLmRpc3BhdGNoID0gZnVuY3Rpb24oYWN0aW9uKSB7XG4gIHRoaXMub2xkU3RhdGUgPSB0aGlzLnN0YXRlO1xuICB0aGlzLnN0YXRlID0gdGhpcy5yZWR1Y2UoYWN0aW9uLCB0aGlzLnN0YXRlKTtcbiAgdGhpcy50cmlnZ2VyU3Vic2NyaWJlcnMoKTtcbn07XG5cblN0b3JlLnByb3RvdHlwZS5nZXRTdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zdGF0ZTtcbn07XG5cblN0b3JlLnByb3RvdHlwZS5nZXRJbml0aWFsU3RhdGUgPSBmdW5jdGlvbihzaXplKSB7XG4gIGxldCBzdGFydENvdW50ID0gMjtcbiAgbGV0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgbGV0IGNlbGw7XG4gIHdoaWxlIChzdGFydENvdW50ID4gMCkge1xuICAgIGNlbGwgPSByYW5kb21DZWxsKHN0YXRlLmNlbGxzKTtcbiAgICBzdGF0ZSA9IG5ld1RpbGUoc3RhdGUsIGNlbGwpO1xuICAgIHN0YXJ0Q291bnQtLTtcbiAgfVxuICByZXR1cm4gc3RhdGU7XG59O1xuXG5mdW5jdGlvbiBuZXdUaWxlKHN0YXRlLCB0aWxlKSB7XG4gIHN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpO1xuICBpZiAoIXN0YXRlLmNlbGxzLmxlbmd0aCkgcmV0dXJuIHN0YXRlO1xuXG4gIHRpbGUgPSB0aWxlO1xuICBjb25zdCB4ID0gZmxhdHRlcm4oc3RhdGUuZ3JpZCkuZmluZCgodCkgPT4ge1xuICAgIHJldHVybiB0LnZhbHVlID09PSAneCc7XG4gIH0pO1xuXG4gIGlmIChpZCA+IDEgJiYgIXgpIHN0YXRlID0gYWRkVGlsZShzdGF0ZSwgdGlsZSwgXCJ4XCIpO1xuICBlbHNlIHN0YXRlID0gYWRkVGlsZShzdGF0ZSwgdGlsZSk7XG4gIHN0YXRlLmNlbGxzID0gc3RhdGUuY2VsbHMuZmlsdGVyKChvYmopID0+IHtcbiAgICByZXR1cm4gIShvYmoueCA9PT0gdGlsZS54ICYmIG9iai55ID09PSB0aWxlLnkpO1xuICB9KTtcbiAgcmV0dXJuIHN0YXRlO1xufVxuXG5mdW5jdGlvbiBhZGRUaWxlKHN0YXRlLCB0aWxlLCB2YWx1ZSkge1xuICBzdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKTtcbiAgdGlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHRpbGUpO1xuICB0aWxlLmlkID0gaWQrKztcbiAgdGlsZS52YWx1ZSA9IHZhbHVlIHx8IDI7XG4gIHN0YXRlLmdyaWRbdGlsZS54XVt0aWxlLnldLnB1c2godGlsZSk7XG4gIHJldHVybiBzdGF0ZTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBTdG9yZTtcbiIsImV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUNlbGxzKHgsIHkpIHtcbiAgbGV0IGNlbGxzID0gW107XG5cbiAgZm9yIChsZXQgaT0wOyBpPHg7IGkrKykge1xuICAgIGZvciAobGV0IGo9MDsgajx5OyBqKyspIHtcbiAgICAgIGNlbGxzLnB1c2goe1xuICAgICAgICB4OiBpLFxuICAgICAgICB5OiBqXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY2VsbHM7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlR3JpZCh4LCB5KSB7XG4gIGxldCBjZWxscyA9IFtdO1xuXG4gIGZvciAobGV0IGk9MDsgaTx4OyBpKyspIHtcbiAgICBjZWxsc1tpXSA9IFtdO1xuICAgIGZvciAobGV0IGo9MDsgajx5OyBqKyspIHtcbiAgICAgIGNlbGxzW2ldW2pdID0gW107XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNlbGxzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tQ2VsbChjZWxscykge1xuICBjb25zdCBtYXggPSBjZWxscy5sZW5ndGg7XG4gIHJldHVybiBjZWxsc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4ICsgMSkpXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZXJuKGFycikge1xuICBhcnIgPSBhcnIuc2xpY2UoKTtcbiAgcmV0dXJuIGFyci5yZWR1Y2UoKGEsIGIpID0+IHtcbiAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gIH0pO1xufVxuIl19
