/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined;
  var board = new Board({n: n});
  var matrix = board.rows();
  var count = n;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      matrix[i][j] = 1;
      count--;
      if (board.hasRowConflictAt(i) || board.hasColConflictAt(j)) {
        matrix[i][j] = 0;
        count++;
      }
    }
  }
  if (count === 0) {
    solution = matrix;
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board ({n: n});
  var matrix = board.rows();

  var childFunction = function(row) {
    for (var j = 0; j < n; j++) {
      board.togglePiece(row, j);
      if (!board.hasRowConflictAt(row) && !board.hasColConflictAt(j)) {
        if (row === n - 1) {
          solutionCount++;
        } else {
          childFunction(row + 1);
        }
      }
      board.togglePiece(row, j);
    }
    return;
  };
  childFunction(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme
  var queensBoard = new Board({n: n});
  var matrix = queensBoard.rows();

  if (n === 0) {
    return queensBoard.rows();
  }

  var childFunction1 = function(rows) {
    for (var k = 0; k < n; k++) {
      console.log('rows', rows);
      console.log('column (k)', k);
      queensBoard.togglePiece(rows, k);
      console.log('board value', matrix[0][0]);
      console.log('board actual', queensBoard.rows());
      if (!queensBoard.hasRowConflictAt(rows) && !queensBoard.hasColConflictAt(k) && !queensBoard.hasMajorDiagonalConflictAt(k - rows) && !queensBoard.hasMinorDiagonalConflictAt(k + rows)) {
        if (rows === n - 1) {
          solution = queensBoard.rows();
          console.log(solution);
        } else {
          childFunction1(rows + 1);
        }
      }
      queensBoard.togglePiece(rows, k);
    }
    return;
  };
  childFunction1(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});
  var matrix = board.rows();

  var childFunction = function(row) {
    for (var j = 0; j < n; j++) {
      board.togglePiece(row, j);
      if (!board.hasRowConflictAt(row) && !board.hasColConflictAt(j) && !board.hasMajorDiagonalConflictAt(j - row) && !board.hasMinorDiagonalConflictAt(j + row)) {
        if (row === n - 1) {
          solutionCount++;
        } else {
          childFunction(row + 1);
        }
      }
      board.togglePiece(row, j);
    }
    return;
  };
  childFunction(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
