//constants
const LOOKUP = {
  1: "X",
  "-1": "O",
  null: "",
};

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//state(variables)
let board;
let turn;
let winner;

//cached element references
const messageEl = document.querySelector("h1");
const boardEl = document.getElementById("board");
const playAgainBtn = document.querySelector("button");

//event listeners
boardEl.addEventListener("click", handleMove);
playAgainBtn.addEventListener("click", initialize);

//functions
initialize();
function handleMove(evt) {
  const cellIndex = parseInt(evt.target.id.replace("cellIndex-", ""));

  if (isNaN(cellIndex) || cells[cellIndex] || winner) return;

  // Update state
  board[idx] = turn;
  turn *= -1;
  winner = getWinner();
  // Render updated state
  render();
}

// Initialize all state variables, then call render()
function initialize() {
  board = [null, null, null, null, null, null, null, null, null];

  turn = 1;
  winner = null;
  render();
}

// Update all impacted state, then call render()
function handleMove(evt) {
  // obtain index of square
  const cellIndex = evt.target.id;
  // Guards
  if (
    // Didn't click <div> in grid
    isNaN(cellIndex) ||
    // Square already taken
    board[cellIndex] ||
    // Game over
    winner
  )
    return;
  // Update state
  board[cellIndex] = turn;
  turn *= -1;
  winner = getWinner();
  // Render updated state
  render();
}

function getWinner() {
  for (let i = 0; i < winConditions.length; i++) {
    if (
      Math.abs(
        board[winConditions[i][0]] +
          board[winConditions[i][1]] +
          board[winConditions[i][2]]
      ) === 3
    )
      return board[winConditions[i][0]];
  }

  if (board.includes(null)) return null;
  return "T";
}

// Visualize all state and info in the DOM
function render() {
  renderCells();

  playAgainBtn.disabled = !winner;
}

function renderCells() {
  document.querySelectorAll(".cell").forEach(function (cell, idx) {
    cell.innerText = LOOKUP[board[cell.id]];
  });
}

function renderMessage() {
  if (winner === "T") {
    message.innerHTML = "Draw!";
  } else if (winner) {
    message.innerHTML = `Congrats ${LOOKUP[winner]}">${LOOKUP[
      winner
    ].toUpperCase()}!`;
  } else {
    message.innerHTML = `${LOOKUP[turn]}' >${LOOKUP[
      turn
    ].toUpperCase()}'s Turn`;
  }
}
