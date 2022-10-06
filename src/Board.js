
// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var board = this.rows();
      // assign input row to a variable
      var conflictRow = board[rowIndex];
      var count = 0;
      // iterate through the input row
      for (var i = 0; i < conflictRow.length; i++) {
        // if a piece exists on the current space
        if (conflictRow[i] === 1) {
          // increment count
          count++;
        }
      }
      // after iteration, if count is greater than one, a conflict exists
      if (count > 1) {
        return true;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var board = this.rows();
      // iterate through the board, run conflict detection function on each row
      for (var i = 0; i < board.length; i++) {
        // if a conflict is detected at any row, return true
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var board = this.rows();
      var count = 0;
      // iterate through the board
      for (var i = 0; i < board.length; i++) {
        // check for pieces at each space in the given column
        if (board[i][colIndex] === 1) {
          // if a piece is present, increment count
          count++;
        }
        // after iteration, if count is greater than one, a conflict exists
      } if (count > 1) {
        return true;
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var board = this.rows();
      // iterate through the board, run conflict detection function on each column
      for (var i = 0; i < board.length; i++) {
        // if a conflict is detected at any column, return true
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {

      var board = this.rows();
      // instatiate count, row, and column variables
      var count = 0;
      var row, column;
      // identify starting space coordinates
      if (majorDiagonalColumnIndexAtFirstRow >= 0) {
        row = 0;
        column = majorDiagonalColumnIndexAtFirstRow;
      } else if (majorDiagonalColumnIndexAtFirstRow < 0) {
        row = majorDiagonalColumnIndexAtFirstRow * (-1);
        column = 0;
      }
      // determine the number of iterations needed
      var numberOfIterations = board.length - row - column;
      // iterate through diagonal, checking for pieces
      for (var i = 0; i < numberOfIterations; i++) {
        // if a piece is found, increase count by 1
        if (board[row][column] === 1) {
          count++;
        }
        // increase column and row to check next space in diagonal
        column++;
        row++;
      }
      // check count after all spaces in diagonal have been checked
      if (count > 1) {
        return true;
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var board = this.rows();
      // determine the number of diagonals based on the board length
      var boardLength = board.length - 1;
      // convert to negative number to account for "negative" diagonals
      var currentDiagonal = boardLength * -1;
      // run callback on each diagonal to find conflicts
      while (currentDiagonal <= boardLength) {
        if (this.hasMajorDiagonalConflictAt(currentDiagonal)) {
          return true;
        } else {
          currentDiagonal++;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {

      var board = this.rows();
      var count = 0;
      var row = 0;
      var column = minorDiagonalColumnIndexAtFirstRow;
      for (var i = 0; i < board.length; i++) {
        if (board[row][column] === 1) {
          count++;
        }
        column--;
        row++;
      }
      if (count > 1) {
        return true;
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var board = this.rows();
      // determine board length
      var boardLength = board.length - 1;
      // multiply by 2 to get total number of diagonals
      var totalDiagonals = boardLength * 2;
      var count = 0;
      // run callback on each diagonal to find conflicts
      while (count <= totalDiagonals) {
        if (this.hasMinorDiagonalConflictAt(count)) {
          return true;
        } else {
          count++;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
