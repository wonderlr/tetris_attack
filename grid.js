#! /usr/local/bin/node

(function(){

"use strict";

function Grid() {
  // private
  var _rows = [];
  var populate = function(){
    for (var i = 0; i < that.height; ++i) {
      addRow();
    }
  };
  var addRow = function(){
    var row = [];
    for (var j = 0; j < that.width; ++j) {
      var tile = new Tile();
      row.push(tile);
    }
    _rows.push(row);
  };
  var addPopulatedRow = function(){
    var row = [];
    for (var j = 0; j < that.width; ++j) {
      var tile = new Tile();
      tile.state = randomOccupiedTileState();
      row.push(tile);
    }
    _rows.push(row);
  };
  var removeRow = function(){
    _rows.shift();
  };
  
  // public
  this.height = 16;
  this.width = 8;
  this.tileAt = function(x,y){
    if (x >= this.width ||
        y >= this.height ||
        x < 0 ||
        y < 0){
      throw 'out of bounds';
    }
    return _rows[y][x];
  };
  /**
   * Bring the rows upwards by one and add a new row
   * of occupied tiles to the bottom.
   */
  this.advanceRows = function() {
    addPopulatedRow();
    removeRow();
  };
  var that = this; 
  populate();
}

var __tileCount = 0;
var TileState = {
    EMPTY: 0,
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    COUNT: 5
};
function Tile(){
  this.state = TileState.EMPTY;
  this.id = __tileCount;
  __tileCount += 1;
}
  
function randomOccupiedTileState(){
  var randomFloat = Math.random() * (TileState.COUNT - TileState.A) + TileState.A;
  return Math.floor(randomFloat);
}

module.exports = {
  Grid: Grid,
  TileState: TileState,
  randomOccupiedTileState: randomOccupiedTileState
};
  
})();