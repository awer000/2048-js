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
    $tile.classList.add('tile-position-' + (tiles[i].x + 1) + '-' + (tiles[i].y + 1));
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
    console.log(cell);
    state = newTile(state, cell);
    startCount--;
  }
  return state;
};

function newTile(state, cell) {
  state = Object.assign({}, state);
  if (!state.cells.length) return state;

  var x = (0, _utils.flattern)((0, _utils.flattern)(state.grid)).find(function (t) {
    return t.value === 'x';
  });

  if (id > 1 && !x) state = addTile(state, cell, "x");else state = addTile(state, cell);
  state.cells = state.cells.filter(function (obj) {
    return !(obj.x === cell.x && obj.y === cell.y);
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
  return cells[Math.floor(Math.random() * max)];
}

function flattern(arr) {
  arr = arr.slice();
  return arr.reduce(function (a, b) {
    return a.concat(b);
  });
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9hcHAuanMiLCJzcmMvc2NyaXB0cy9nYW1lLmpzIiwic3JjL3NjcmlwdHMvc3RvcmUuanMiLCJzcmMvc2NyaXB0cy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7OztBQUVBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVk7QUFDeEQsTUFBTSxPQUFPLG1CQUFTLENBQVQsQ0FBYjtBQUNELENBRkQ7Ozs7Ozs7OztBQ0ZBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNLE9BQU8sU0FBUyxJQUFULENBQWMsSUFBZCxFQUFvQjtBQUMvQixPQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsT0FBSyxNQUFMLEdBQWMsU0FBUyxhQUFULENBQXVCLGlCQUF2QixDQUFkO0FBQ0EsT0FBSyxjQUFMLEdBQXNCLFNBQVMsYUFBVCxDQUF1QixpQkFBdkIsQ0FBdEI7QUFDQSxPQUFLLEtBQUw7QUFDRCxDQUxEOztBQU9BLEtBQUssU0FBTCxDQUFlLEtBQWYsR0FBdUIsWUFBVztBQUNoQyxPQUFLLEtBQUwsR0FBYSxxQkFBYjtBQUNBLE9BQUssS0FBTCxDQUFXLFNBQVgsQ0FBcUIsS0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixJQUFqQixDQUFyQjtBQUNBLE9BQUssS0FBTCxDQUFXLFFBQVgsQ0FBb0I7QUFDbEIsVUFBTSxNQURZO0FBRWxCLFVBQU07QUFGWSxHQUFwQjtBQUlELENBUEQ7O0FBU0EsS0FBSyxTQUFMLENBQWUsTUFBZixHQUF3QixVQUFTLEtBQVQsRUFBZ0I7QUFDdEMsTUFBTSxPQUFPLE1BQU0sSUFBbkI7QUFDQSxNQUFNLFFBQVEscUJBQVMscUJBQVMsSUFBVCxDQUFULENBQWQ7QUFDQSxPQUFLLElBQUksSUFBRSxDQUFYLEVBQWMsSUFBSSxNQUFNLE1BQXhCLEVBQWdDLEdBQWhDLEVBQXFDO0FBQ25DLFFBQUksUUFBUSxT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WDtBQUlEO0FBQ0Y7O0FBRUQsU0FBTyxLQUFQO0FBQ0Q7O0FBR00sU0FBUyxZQUFULENBQXNCLENBQXRCLEVBQXlCLENBQXpCLEVBQTRCO0FBQ2pDLE1BQUksUUFBUSxFQUFaOztBQUVBLE9BQUssSUFBSSxJQUFFLENBQVgsRUFBYyxJQUFFLENBQWhCLEVBQW1CLEdBQW5CLEVBQXdCO0FBQ3RCLFVBQU0sQ0FBTixJQUFXLEVBQVg7QUFDQSxTQUFLLElBQUksSUFBRSxDQUFYLEVBQWMsSUFBRSxDQUFoQixFQUFtQixHQUFuQixFQUF3QjtBQUN0QixZQUFNLENBQU4sRUFBUyxDQUFULElBQWMsRUFBZDtBQUNEO0FBQ0Y7O0FBRUQsU0FBTyxLQUFQO0FBQ0Q7O0FBRU0sU0FBUyxVQUFULENBQW9CLEtBQXBCLEVBQTJCO0FBQ2hDLE1BQU0sTUFBTSxNQUFNLE1BQWxCO0FBQ0EsU0FBTyxNQUFNLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixHQUEzQixDQUFOLENBQVA7QUFDRDs7QUFFTSxTQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBdUI7QUFDNUIsUUFBTSxJQUFJLEtBQUosRUFBTjtBQUNBLFNBQU8sSUFBSSxNQUFKLENBQVcsVUFBQyxDQUFELEVBQUksQ0FBSixFQUFVO0FBQzFCLFdBQU8sRUFBRSxNQUFGLENBQVMsQ0FBVCxDQUFQO0FBQ0QsR0FGTSxDQUFQO0FBR0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xuICBjb25zdCBnYW1lID0gbmV3IEdhbWUoNCk7XG59KTtcbiIsImltcG9ydCBTdG9yZSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCB7IGZsYXR0ZXJuIH0gZnJvbSAnLi91dGlscyc7XG5cbmNvbnN0IEdhbWUgPSBmdW5jdGlvbiBHYW1lKHNpemUpIHtcbiAgdGhpcy5zaXplID0gc2l6ZTtcbiAgdGhpcy4kdGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ3JpZC1jb250YWluZXInKTtcbiAgdGhpcy4kdGlsZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aWxlLWNvbnRhaW5lcicpO1xuICB0aGlzLnNldHVwKCk7XG59O1xuXG5HYW1lLnByb3RvdHlwZS5zZXR1cCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnN0b3JlID0gbmV3IFN0b3JlKCk7XG4gIHRoaXMuc3RvcmUuc3Vic2NyaWJlKHRoaXMucmVuZGVyLmJpbmQodGhpcykpO1xuICB0aGlzLnN0b3JlLmRpc3BhdGNoKHtcbiAgICB0eXBlOiAnSU5JVCcsXG4gICAgc2l6ZTogNFxuICB9KTtcbn07XG5cbkdhbWUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gIGNvbnN0IGdyaWQgPSBzdGF0ZS5ncmlkO1xuICBjb25zdCB0aWxlcyA9IGZsYXR0ZXJuKGZsYXR0ZXJuKGdyaWQpKTtcbiAgZm9yIChsZXQgaT0wOyBpIDwgdGlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgJHRpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAkdGlsZS5jbGFzc0xpc3QuYWRkKCd0aWxlJyk7XG4gICAgJHRpbGUuY2xhc3NMaXN0LmFkZChgdGlsZS0ke3RpbGVzW2ldLnZhbHVlfWApO1xuICAgICR0aWxlLmNsYXNzTGlzdC5hZGQoYHRpbGUtcG9zaXRpb24tJHt0aWxlc1tpXS54ICsgMX0tJHt0aWxlc1tpXS55ICsgMX1gKTtcbiAgICAkdGlsZS5pbm5lckhUTUwgPSB0aWxlc1tpXS52YWx1ZTtcbiAgICB0aGlzLiR0aWxlQ29udGFpbmVyLmFwcGVuZENoaWxkKCR0aWxlKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcbiIsImltcG9ydCB7IGdlbmVyYXRlQ2VsbHMsIGdlbmVyYXRlR3JpZCwgcmFuZG9tQ2VsbCwgZmxhdHRlcm4gfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3Qgc3Vic2NyaWJlcnMgPSBbXTtcbmxldCBpZCA9IDA7XG5jb25zdCBpbml0aWFsU3RhdGUgPSB7XG4gIHdpbjogbnVsbCxcbiAgc2NvcmU6IDAsXG4gIGNlbGxzOiBnZW5lcmF0ZUNlbGxzKDQsIDQpLFxuICBncmlkOiBnZW5lcmF0ZUdyaWQoNCwgNCksXG4gIGlzQWN0dWFsOiB0cnVlXG59O1xuXG5jb25zdCBTdG9yZSA9IGZ1bmN0aW9uIFN0b3JlKCkge1xuICB0aGlzLm9sZFN0YXRlID0ge307XG4gIHRoaXMuc3RhdGUgPSBpbml0aWFsU3RhdGU7XG59O1xuXG5TdG9yZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24oY2IpIHtcbiAgc3Vic2NyaWJlcnMucHVzaChjYik7XG59O1xuXG5TdG9yZS5wcm90b3R5cGUudHJpZ2dlclN1YnNjcmliZXJzID0gZnVuY3Rpb24oKSB7XG4gIHN1YnNjcmliZXJzLmZvckVhY2goKHN1YnNjcmliZXIpID0+IHtcbiAgICBzdWJzY3JpYmVyKHRoaXMuc3RhdGUpO1xuICB9KTtcbn07XG5cblN0b3JlLnByb3RvdHlwZS5yZWR1Y2UgPSBmdW5jdGlvbihhY3Rpb24sIHN0YXRlKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlICdJTklUJzpcbiAgICAgIHJldHVybiB0aGlzLmdldEluaXRpYWxTdGF0ZShhY3Rpb24uc2l6ZSk7XG4gIH1cbiAgcmV0dXJuIHN0YXRlO1xufTtcblxuU3RvcmUucHJvdG90eXBlLmRpc3BhdGNoID0gZnVuY3Rpb24oYWN0aW9uKSB7XG4gIHRoaXMub2xkU3RhdGUgPSB0aGlzLnN0YXRlO1xuICB0aGlzLnN0YXRlID0gdGhpcy5yZWR1Y2UoYWN0aW9uLCB0aGlzLnN0YXRlKTtcbiAgdGhpcy50cmlnZ2VyU3Vic2NyaWJlcnMoKTtcbn07XG5cblN0b3JlLnByb3RvdHlwZS5nZXRTdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zdGF0ZTtcbn07XG5cblN0b3JlLnByb3RvdHlwZS5nZXRJbml0aWFsU3RhdGUgPSBmdW5jdGlvbihzaXplKSB7XG4gIGxldCBzdGFydENvdW50ID0gMjtcbiAgbGV0IHN0YXRlID0gdGhpcy5zdGF0ZTtcbiAgbGV0IGNlbGw7XG4gIHdoaWxlIChzdGFydENvdW50ID4gMCkge1xuICAgIGNlbGwgPSByYW5kb21DZWxsKHN0YXRlLmNlbGxzKTtcbiAgICBjb25zb2xlLmxvZyhjZWxsKTtcbiAgICBzdGF0ZSA9IG5ld1RpbGUoc3RhdGUsIGNlbGwpO1xuICAgIHN0YXJ0Q291bnQtLTtcbiAgfVxuICByZXR1cm4gc3RhdGU7XG59O1xuXG5mdW5jdGlvbiBuZXdUaWxlKHN0YXRlLCBjZWxsKSB7XG4gIHN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUpO1xuICBpZiAoIXN0YXRlLmNlbGxzLmxlbmd0aCkgcmV0dXJuIHN0YXRlO1xuXG4gIGNvbnN0IHggPSBmbGF0dGVybihmbGF0dGVybihzdGF0ZS5ncmlkKSkuZmluZCgodCkgPT4ge1xuICAgIHJldHVybiB0LnZhbHVlID09PSAneCc7XG4gIH0pO1xuXG4gIGlmIChpZCA+IDEgJiYgIXgpIHN0YXRlID0gYWRkVGlsZShzdGF0ZSwgY2VsbCwgXCJ4XCIpO1xuICBlbHNlIHN0YXRlID0gYWRkVGlsZShzdGF0ZSwgY2VsbCk7XG4gIHN0YXRlLmNlbGxzID0gc3RhdGUuY2VsbHMuZmlsdGVyKChvYmopID0+IHtcbiAgICByZXR1cm4gIShvYmoueCA9PT0gY2VsbC54ICYmIG9iai55ID09PSBjZWxsLnkpO1xuICB9KTtcbiAgcmV0dXJuIHN0YXRlO1xufVxuXG5mdW5jdGlvbiBhZGRUaWxlKHN0YXRlLCB0aWxlLCB2YWx1ZSkge1xuICBzdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlKTtcbiAgdGlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHRpbGUpO1xuICB0aWxlLmlkID0gaWQrKztcbiAgdGlsZS52YWx1ZSA9IHZhbHVlIHx8IDI7XG4gIHN0YXRlLmdyaWRbdGlsZS54XVt0aWxlLnldLnB1c2godGlsZSk7XG4gIHJldHVybiBzdGF0ZTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBTdG9yZTtcbiIsImV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUNlbGxzKHgsIHkpIHtcbiAgbGV0IGNlbGxzID0gW107XG5cbiAgZm9yIChsZXQgaT0wOyBpPHg7IGkrKykge1xuICAgIGZvciAobGV0IGo9MDsgajx5OyBqKyspIHtcbiAgICAgIGNlbGxzLnB1c2goe1xuICAgICAgICB4OiBpLFxuICAgICAgICB5OiBqXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY2VsbHM7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlR3JpZCh4LCB5KSB7XG4gIGxldCBjZWxscyA9IFtdO1xuXG4gIGZvciAobGV0IGk9MDsgaTx4OyBpKyspIHtcbiAgICBjZWxsc1tpXSA9IFtdO1xuICAgIGZvciAobGV0IGo9MDsgajx5OyBqKyspIHtcbiAgICAgIGNlbGxzW2ldW2pdID0gW107XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNlbGxzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZG9tQ2VsbChjZWxscykge1xuICBjb25zdCBtYXggPSBjZWxscy5sZW5ndGg7XG4gIHJldHVybiBjZWxsc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZXJuKGFycikge1xuICBhcnIgPSBhcnIuc2xpY2UoKTtcbiAgcmV0dXJuIGFyci5yZWR1Y2UoKGEsIGIpID0+IHtcbiAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gIH0pO1xufVxuIl19
