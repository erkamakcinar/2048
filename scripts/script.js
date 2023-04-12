import Ai from "./ai.js";
let ai = new Ai();

function startSolving() {
  const intervalId = setInterval(() => {
    let isGameOver = false;
    if (isGameOver) {
      clearInterval(intervalId);
    } else {
      isGameOver = ai.solve();
    }
  }, 50); // 1000 milliseconds = 1 second
}

// Event listener for button click
document.getElementById("solveButton").addEventListener("click", startSolving);

document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    ai.solve();
    //console.clear();
    //const initialState = ai.copyBoard(ai.gameState);
    //ai.printGameTree(initialState, ai.MAX_DEPTH);
  }
});
