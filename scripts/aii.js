import Game from "./game.js";
export default class Aii {
  constructor() {
    this.game = new Game();
    this.gameState = this.game.board;
    // Define the legal moves
    this.MOVE_UP = 0;
    this.MOVE_RIGHT = 1;
    this.MOVE_DOWN = 2;
    this.MOVE_LEFT = 3;
    // Define the board size
    this.BOARD_SIZE = 4;
    this.MAX_DEPTH = 5;
  }
  copyBoard(state) {
    // Returns a copy of the given game state
    return state.map((row) => [...row]);
  }
  // Define the evaluation function
  evaluateState(state) {
    // Returns a score for the given game state
    let score = 0;
    let maxTile = 0;
    for (let i = 0; i < this.BOARD_SIZE; i++) {
      for (let j = 0; j < this.BOARD_SIZE; j++) {
        score += state[i][j];
        maxTile = Math.max(maxTile, state[i][j]);
      }
    }
    // Add a bonus for having the max tile in the corner
    if (
      state[0][0] === maxTile ||
      state[0][this.BOARD_SIZE - 1] === maxTile ||
      state[this.BOARD_SIZE - 1][0] === maxTile ||
      state[this.BOARD_SIZE - 1][this.BOARD_SIZE - 1] === maxTile
    ) {
      score += maxTile * 10;
    }
    return score;
  }

  // Implement the minimax algorithm with alpha-beta pruning
  minimax(state, depth, alpha, beta, maximizingPlayer) {
    if (depth === 0) {
      return this.evaluateState(state);
    }
    if (maximizingPlayer) {
      let maxEval = -Infinity;
      for (let move of [
        this.MOVE_UP,
        this.MOVE_RIGHT,
        this.MOVE_DOWN,
        this.MOVE_LEFT,
      ]) {
        let newState = this.makeMove(state, move);
        if (newState !== null) {
          let evaluate = this.minimax(newState, depth - 1, alpha, beta, false);
          maxEval = Math.max(maxEval, evaluate);
          alpha = Math.max(alpha, evaluate);
          if (beta <= alpha) {
            break;
          }
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < this.BOARD_SIZE; i++) {
        for (let j = 0; j < this.BOARD_SIZE; j++) {
          if (state[i][j] === 0) {
            let newState = this.copyBoard(state);
            newState[i][j] = 2;
            let evaluate = this.minimax(newState, depth - 1, alpha, beta, true);
            minEval = Math.min(minEval, evaluate);
            beta = Math.min(beta, evaluate);
            if (beta <= alpha) {
              break;
            }
            newState[i][j] = 4;
            evaluate = this.minimax(newState, depth - 1, alpha, beta, true);
            minEval = Math.min(minEval, evaluate);
            beta = Math.min(beta, evaluate);
            if (beta <= alpha) {
              break;
            }
          }
        }
      }
      return minEval;
    }
  }

  makeMove(state, move) {
    // Returns a new game state after making the given move, or null if the move is invalid
    let newState = this.copyBoard(state);
    let moved = false;
    switch (move) {
      case this.MOVE_UP:
        for (let j = 0; j < this.BOARD_SIZE; j++) {
          for (let i = 1; i < this.BOARD_SIZE; i++) {
            if (newState[i][j] !== 0) {
              let k = i;
              while (k > 0 && newState[k - 1][j] === 0) {
                k--;
              }
              if (k !== i) {
                moved = true;
                newState[k][j] = newState[i][j];
                newState[i][j] = 0;
              }
              if (k > 0 && newState[k - 1][j] === newState[k][j]) {
                moved = true;
                newState[k - 1][j] *= 2;
                newState[k][j] = 0;
              }
            }
          }
        }
        break;
      case this.MOVE_RIGHT:
        for (let i = 0; i < this.BOARD_SIZE; i++) {
          for (let j = this.BOARD_SIZE - 2; j >= 0; j--) {
            if (newState[i][j] !== 0) {
              let k = j;
              while (k < this.BOARD_SIZE - 1 && newState[i][k + 1] === 0) {
                k++;
              }
              if (k !== j) {
                moved = true;
                newState[i][k] = newState[i][j];
                newState[i][j] = 0;
              }
              if (
                k < this.BOARD_SIZE - 1 &&
                newState[i][k + 1] === newState[i][k]
              ) {
                moved = true;
                newState[i][k + 1] *= 2;
                newState[i][k] = 0;
              }
            }
          }
        }
        break;
      case this.MOVE_DOWN:
        for (let j = 0; j < this.BOARD_SIZE; j++) {
          for (let i = this.BOARD_SIZE - 2; i >= 0; i--) {
            if (newState[i][j] !== 0) {
              let k = i;
              while (k < this.BOARD_SIZE - 1 && newState[k + 1][j] === 0) {
                k++;
              }
              if (k !== i) {
                moved = true;
                newState[k][j] = newState[i][j];
                newState[i][j] = 0;
              }
              if (
                k < this.BOARD_SIZE - 1 &&
                newState[k + 1][j] === newState[k][j]
              ) {
                moved = true;
                newState[k + 1][j] *= 2;
                newState[k][j] = 0;
              }
            }
          }
        }
        break;
      case this.MOVE_LEFT:
        for (let i = 0; i < this.BOARD_SIZE; i++) {
          for (let j = 1; j < this.BOARD_SIZE; j++) {
            if (newState[i][j] !== 0) {
              let k = j;
              while (k > 0 && newState[i][k - 1] === 0) {
                k--;
              }
              if (k !== j) {
                moved = true;
                newState[i][k] = newState[i][j];
                newState[i][j] = 0;
              }
              if (k > 0 && newState[i][k - 1] === newState[i][k]) {
                moved = true;
                newState[i][k - 1] *= 2;
                newState[i][k] = 0;
              }
            }
          }
        }
        break;
      default:
        break;
    }
    if (moved) {
      return newState;
    } else {
      return null;
    }
  }

  makeActualMove(move) {
    // Returns a new game state after making the given move, or null if the move is invalid
    let moved = false;
    switch (move) {
      case this.MOVE_UP:
        this.game.slideUp();
        this.game.setTwo();
        moved = true;
        break;

      case this.MOVE_RIGHT:
        this.game.slideRight();
        this.game.setTwo();
        moved = true;
        break;

      case this.MOVE_DOWN:
        this.game.slideDown();
        this.game.setTwo();
        moved = true;
        break;

      case this.MOVE_LEFT:
        this.game.slideLeft();
        this.game.setTwo();
        moved = true;
        break;

      default:
        break;
    }
    if (moved) {
      this.gameState = this.game.board;
      return this.gameState;
    } else {
      return null;
    }
  }
  solve() {
    let maxEval = -Infinity;
    let bestMove = null;
    for (let move of [
      this.MOVE_UP,
      this.MOVE_RIGHT,
      this.MOVE_DOWN,
      this.MOVE_LEFT,
    ]) {
      let newState = this.makeMove(this.gameState, move);
      if (newState !== null) {
        let evaluate = this.minimax(
          newState,
          this.MAX_DEPTH,
          -Infinity,
          Infinity,
          false
        );
        if (evaluate > maxEval) {
          maxEval = evaluate;
          bestMove = move;
        }
      }
    }
    if (bestMove !== null) {
      this.makeActualMove(bestMove);
    }
  }
}
