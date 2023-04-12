export default class Game {
  constructor() {
    this.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.score = 0;
    this.rows = 4;
    this.columns = 4;
    //this.addKeyboard();
    this.setGame();
  }

  updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; //clear the classList
    tile.classList.add("tile");
    if (num > 0) {
      tile.innerText = num.toString();
      if (num <= 4096) {
        tile.classList.add("x" + num.toString());
      } else {
        tile.classList.add("x8192");
      }
    }
  }

  setGame() {
    // board = [
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]
    // ];

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        let tile = document.createElement("div");
        tile.id = r.toString() + "-" + c.toString();
        let num = this.board[r][c];
        this.updateTile(tile, num);
        document.getElementById("container-2048").append(tile);
      }
    }
    //create 2 to begin the game
    this.setTwo();
    this.setTwo();
  }

  addKeyboard() {
    document.addEventListener("keyup", (e) => {
      if (e.code == "ArrowLeft") {
        this.slideLeft();
        this.setTwo();
      } else if (e.code == "ArrowRight") {
        this.slideRight();
        this.setTwo();
      } else if (e.code == "ArrowUp") {
        this.slideUp();
        this.setTwo();
      } else if (e.code == "ArrowDown") {
        this.slideDown();
        this.setTwo();
      }
      document.getElementById("score").innerText = this.score;
    });
  }

  filterZero(row) {
    return row.filter((num) => num != 0); //create new array of all nums != 0
  }

  slide(row) {
    //[0, 2, 2, 2]
    row = this.filterZero(row); //[2, 2, 2]
    for (let i = 0; i < row.length - 1; i++) {
      if (row[i] == row[i + 1]) {
        row[i] *= 2;
        row[i + 1] = 0;
        this.score += row[i];
      }
    } //[4, 0, 2]
    row = this.filterZero(row); //[4, 2]
    //add zeroes
    while (row.length < this.columns) {
      row.push(0);
    } //[4, 2, 0, 0]
    return row;
  }

  slideLeft() {
    for (let r = 0; r < this.rows; r++) {
      let row = this.board[r];
      row = this.slide(row);
      this.board[r] = row;
      for (let c = 0; c < this.columns; c++) {
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        let num = this.board[r][c];
        this.updateTile(tile, num);
      }
    }
  }

  slideRight() {
    for (let r = 0; r < this.rows; r++) {
      let row = this.board[r]; //[0, 2, 2, 2]
      row.reverse(); //[2, 2, 2, 0]
      row = this.slide(row); //[4, 2, 0, 0]
      this.board[r] = row.reverse(); //[0, 0, 2, 4];
      for (let c = 0; c < this.columns; c++) {
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        let num = this.board[r][c];
        this.updateTile(tile, num);
      }
    }
  }

  slideUp() {
    for (let c = 0; c < this.columns; c++) {
      let row = [
        this.board[0][c],
        this.board[1][c],
        this.board[2][c],
        this.board[3][c],
      ];
      row = this.slide(row);
      // board[0][c] = row[0];
      // board[1][c] = row[1];
      // board[2][c] = row[2];
      // board[3][c] = row[3];
      for (let r = 0; r < this.rows; r++) {
        this.board[r][c] = row[r];
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        let num = this.board[r][c];
        this.updateTile(tile, num);
      }
    }
  }

  slideDown() {
    for (let c = 0; c < this.columns; c++) {
      let row = [
        this.board[0][c],
        this.board[1][c],
        this.board[2][c],
        this.board[3][c],
      ];
      row.reverse();
      row = this.slide(row);
      row.reverse();
      // board[0][c] = row[0];
      // board[1][c] = row[1];
      // board[2][c] = row[2];
      // board[3][c] = row[3];
      for (let r = 0; r < this.rows; r++) {
        this.board[r][c] = row[r];
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        let num = this.board[r][c];
        this.updateTile(tile, num);
      }
    }
  }

  setTwo() {
    if (!this.hasEmptyTile()) {
      return;
    }
    let found = false;
    while (!found) {
      //find random row and column to place a 2 in
      let r = Math.floor(Math.random() * this.rows);
      let c = Math.floor(Math.random() * this.columns);
      if (this.board[r][c] == 0) {
        this.board[r][c] = 2;
        let tile = document.getElementById(r.toString() + "-" + c.toString());
        tile.innerText = "2";
        tile.classList.add("x2");
        found = true;
      }
    }
  }

  hasEmptyTile() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        if (this.board[r][c] == 0) {
          //at least one zero in the board
          return true;
        }
      }
    }
    return false;
  }
  isGameOver() {
    if (this.hasEmptyTile()) {
      return false;
    }
    //check if any tiles can be combined
    for (let r = 0; r < this.row - 1; r++) {
      for (let c = 0; c < this.columns - 1; c++) {
        if (this.board[r][c] == this.board[r][c + 1]) {
          return false;
        }
        if (this.board[r][c] == this.board[r + 1][c]) {
          return false;
        }
      }
    }
    return true;
  }
}
