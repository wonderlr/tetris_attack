#! /usr/local/bin/node
/* Run with mocha */
/* global require, describe, it */
var assert = require('assert');
var tileClearControllerModule = require('../bin/tile_clear_controller.js');
var gridModule = require('../bin/grid.js');

describe('TileClearController', function(){
  it('can be created', function(){
    var grid = new gridModule.Grid();
    var controller = new tileClearControllerModule.TileClearController(grid);
  });
  it('must be created with a valid grid', function(){
    var grid = new gridModule.Grid();
    var tmp = gridModule.isValidGrid;
    gridModule.isValidGrid = function(){
      return false;
    };
    var threw = false;
    try{
      var controller = new tileClearControllerModule.TileClearController(grid);
    } catch (e){
      threw = true;
    } finally {
      gridModule.isValidGrid = tmp;
      assert(threw);
    }
  });
});

describe('TileClearController markTilesToClear', function(){
  it('marks three consecutive tiles in same row with same non-empty state', function(){
    var grid = new gridModule.Grid();
    var controller = new tileClearControllerModule.TileClearController(grid);
    var bottomY = grid.height - 1;
    var tile1 = grid.tileAt(2, bottomY);
    var tile2 = grid.tileAt(3, bottomY);
    var tile3 = grid.tileAt(4, bottomY);
    tile1.state = gridModule.TileState.A;
    tile2.state = gridModule.TileState.A;
    tile3.state = gridModule.TileState.A;
    controller.markTilesToClear();
    assert(tile1.markedToClear && tile2.markedToClear && tile3.markedToClear);
  });
  it('does not mark three consecutive tiles in same row with different non-empty state', function(){
    var grid = new gridModule.Grid();
    var controller = new tileClearControllerModule.TileClearController(grid);
    var bottomY = grid.height - 1;
    var tile1 = grid.tileAt(2, bottomY);
    var tile2 = grid.tileAt(3, bottomY);
    var tile3 = grid.tileAt(4, bottomY);
    tile1.state = gridModule.TileState.A;
    tile2.state = gridModule.TileState.B;
    tile3.state = gridModule.TileState.A;
    controller.markTilesToClear();
    assert(!tile1.markedToClear && !tile2.markedToClear && !tile3.markedToClear);
  });
  it('marks all tiles if two sets of consecutive tiles are in the same row', function(){
    var grid = new gridModule.Grid();
    var controller = new tileClearControllerModule.TileClearController(grid);
    var bottomY = grid.height - 1;
    var tile1 = grid.tileAt(0, bottomY);
    var tile2 = grid.tileAt(1, bottomY);
    var tile3 = grid.tileAt(2, bottomY);
    var tile4 = grid.tileAt(3, bottomY);
    var tile5 = grid.tileAt(4, bottomY);
    var tile6 = grid.tileAt(5, bottomY);
    tile1.state = gridModule.TileState.C;
    tile2.state = gridModule.TileState.C;
    tile3.state = gridModule.TileState.C;
    tile4.state = gridModule.TileState.D;
    tile5.state = gridModule.TileState.D;
    tile6.state = gridModule.TileState.D;
    controller.markTilesToClear();
    assert(tile1.markedToClear); 
    assert(tile2.markedToClear); 
    assert(tile3.markedToClear);
    assert(tile4.markedToClear);
    assert(tile5.markedToClear);
    assert(tile6.markedToClear);
  });
  it('does not mark consecutive empty tiles', function(){
    var grid = new gridModule.Grid();
    var controller = new tileClearControllerModule.TileClearController(grid);
    var bottomY = grid.height - 1;
    var tile1 = grid.tileAt(0, bottomY);
    var tile2 = grid.tileAt(1, bottomY);
    var tile3 = grid.tileAt(2, bottomY);
    var tile4 = grid.tileAt(3, bottomY);
    var tile5 = grid.tileAt(4, bottomY);
    var tile6 = grid.tileAt(5, bottomY);
    controller.markTilesToClear();
    assert(!tile1.markedToClear); 
    assert(!tile2.markedToClear); 
    assert(!tile3.markedToClear);
    assert(!tile4.markedToClear);
    assert(!tile5.markedToClear);
    assert(!tile6.markedToClear);
  });
  it('marks three consecutive tiles in same column with same non-empty state', function(){
    var grid = new gridModule.Grid();
    var controller = new tileClearControllerModule.TileClearController(grid);
    var rightX = grid.width - 1;
    var tile1 = grid.tileAt(rightX, 2);
    var tile2 = grid.tileAt(rightX, 3);
    var tile3 = grid.tileAt(rightX, 4);
    tile1.state = gridModule.TileState.A;
    tile2.state = gridModule.TileState.A;
    tile3.state = gridModule.TileState.A;
    controller.markTilesToClear();
    assert(tile1.markedToClear && tile2.markedToClear && tile3.markedToClear);
  });
  it('does not mark three consecutive tiles in same column with different non-empty state', function(){
    var grid = new gridModule.Grid();
    var controller = new tileClearControllerModule.TileClearController(grid);
    var rightX = grid.width - 1;
    var tile1 = grid.tileAt(rightX, 2);
    var tile2 = grid.tileAt(rightX, 3);
    var tile3 = grid.tileAt(rightX, 4);
    tile1.state = gridModule.TileState.A;
    tile2.state = gridModule.TileState.B;
    tile3.state = gridModule.TileState.A;
    controller.markTilesToClear();
    assert(!tile1.markedToClear && !tile2.markedToClear && !tile3.markedToClear);
  });
  it('marks all tiles if two sets of consecutive tiles are in the same column', function(){
    var grid = new gridModule.Grid();
    var controller = new tileClearControllerModule.TileClearController(grid);
    var rightX = grid.width - 1;
    var tile1 = grid.tileAt(rightX, 0);
    var tile2 = grid.tileAt(rightX, 1);
    var tile3 = grid.tileAt(rightX, 2);
    var tile4 = grid.tileAt(rightX, 3);
    var tile5 = grid.tileAt(rightX, 4);
    var tile6 = grid.tileAt(rightX, 5);
    tile1.state = gridModule.TileState.C;
    tile2.state = gridModule.TileState.C;
    tile3.state = gridModule.TileState.C;
    tile4.state = gridModule.TileState.D;
    tile5.state = gridModule.TileState.D;
    tile6.state = gridModule.TileState.D;
    controller.markTilesToClear();
    assert(tile1.markedToClear); 
    assert(tile2.markedToClear); 
    assert(tile3.markedToClear);
    assert(tile4.markedToClear);
    assert(tile5.markedToClear);
    assert(tile6.markedToClear);
  });
  it('allows tiles to be shared vertically and horizontally', function(){
    var grid = new gridModule.Grid();
    var controller = new tileClearControllerModule.TileClearController(grid);
    var tile1 = grid.tileAt(0, grid.height - 1);
    var tile2 = grid.tileAt(1, grid.height - 1);
    var tile3 = grid.tileAt(2, grid.height - 1);
    var tile4 = grid.tileAt(1, grid.height - 2);
    var tile5 = grid.tileAt(1, grid.height - 3);
    tile1.state = gridModule.TileState.C;
    tile2.state = gridModule.TileState.C;
    tile3.state = gridModule.TileState.C;
    tile4.state = gridModule.TileState.C;
    tile5.state = gridModule.TileState.C;
    controller.markTilesToClear();
    assert(tile1.markedToClear); 
    assert(tile2.markedToClear); 
    assert(tile3.markedToClear);
    assert(tile4.markedToClear);
    assert(tile5.markedToClear);
  });
});