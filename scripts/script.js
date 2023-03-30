import Aii from "./aii.js";
let ai = new Aii();
document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    ai.solve();
  }
});
//setTimeout(ai.solve, 1000);

//let a = new Game();
/*
let ai = new AI();
ai.solve();
ai.solve();
*/
/*
a.fillTable();
a.moveLeft();
a.fillTable();
a.moveLeft();
a.fillTable();
a.moveLeft();
a.fillTable();
a.moveLeft();

a.fillTable();
a.moveLeft();
a.fillTable();
a.moveLeft();
a.fillTable();
a.moveLeft();
a.fillTable();
a.moveLeft();
a.fillTable();
a.moveLeft();
a.fillTable();
a.moveLeft();
*/
