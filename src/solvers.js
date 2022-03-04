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

// window.bitwiseQ = function(Q, u, ee, n, s, H, R) {

//   solutionCount = 0;
//   // s = 0;
//   Q=u?Q:(1<<Q)-1;
//   // If Q is equal to u, Q, else (1 zero fill left shift Q) - 1;
//   H = ~(u|ee|n) & Q;
//   // LET poss = ~(ld | cols | rd) & all
//   // H is not equal to (u or ee or n) & Q (0101 | 1100 | 0111)
//   while(H)
//   // bitwise operator XOR
//   H ^= R =- H & H,s += N(Q, (u|R)<<1, ee|R, (n|R)>>1);
//   //  (ld|bit)<<1, cols|bit, (rd|bit)>>1
//   // Return solution count
//   return solutionCount += ee == Q;
// };


// N = function
// Q = all  a complete solution
// u = ld Major Diagonal
// ee = cols Columns
// n = rd Minor Diagonal
// s = solutionCount
// H = current Row
// R = bit holdes a valid queen placement