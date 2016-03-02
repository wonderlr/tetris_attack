#! /usr/bin/env node
var Cursor = require('./cursor.js');
var GameController = require('./game_controller.js');

(function(){

"use strict";
  
function TerminalInputController(cursor){
  if (!Cursor.isValidCursor(cursor)){
    throw 'Invalid cursor';
  }
  var _cursor = cursor;
  this.onUserInput = function(input){
    if (!input || !input.full){
      return;
    }
    var key = input.full;
    // Quit on Escape, q, or Control-C.
    if (key === 'escape' || key === 'q' || key === 'C-c'){
      return process.exit(0);
    }
    if (key === 'up' || key === 'k'){
      _cursor.goUp();
    }
    if (key === 'down' || key === 'j'){
      _cursor.goDown();
    }
    if (key === 'left' || key === 'h'){
      _cursor.goLeft();
    }
    if (key === 'right' || key === 'l'){
      _cursor.goRight();
    }
    if (key === 'space'){
      _cursor.swapTiles();
    }
    if (key === 'a'){
      // Quickly advance the game four times.
	  var advanceGameWithBoundThis = GameController.advanceGame.bind(GameController);
      setTimeout(advanceGameWithBoundThis, 100);
      setTimeout(advanceGameWithBoundThis, 200);
      setTimeout(advanceGameWithBoundThis, 300);
      setTimeout(advanceGameWithBoundThis, 400);
    }
  };
}
  
module.exports = {
  TerminalInputController: TerminalInputController
};

})();
