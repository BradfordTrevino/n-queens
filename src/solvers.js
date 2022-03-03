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



window.foundRook = function(board, r, n, callback) {
  if (r === n) {
    return callback(board);
  }

  for (let c = 0; c < n; c++) {
    board.togglePiece(r, c);
    if (!board.hasAnyRowConflicts(r) && !board.hasAnyColConflicts(c)) {
      var solutionBoard = foundRook(board, r + 1, n, callback);
      if (solutionBoard) {
        return solutionBoard;
      }
    }
    board.togglePiece(r, c);
  }
};

window.findNRooksSolution = function(n) {
  var solution;
  var board = new Board({n:n});

  foundRook(board, 0, n, function(board) {
    return solution = board.rows();
  });

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  foundRook(board, 0, n, function(board) {
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.foundQueen = function(board, r, n, callback) {
  if (r === n) {
    return callback(board);
  }

  for (let c = 0; c < n; c++) {
    board.togglePiece(r, c);
    if (!board.hasAnyQueenConflictsOn(r, c)) {
      var solutionBoard = foundQueen(board, r + 1, n, callback);
      if (solutionBoard) {
        return solutionBoard;
      }
    }
    board.togglePiece(r, c);
  }
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = board.rows();

  foundQueen(board, 0, n, function() {
    return solution = board.rows();
  });

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  foundQueen(board, 0, n, function() {
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
